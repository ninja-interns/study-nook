package api

import (
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/alexedwards/scs/pgxstore"
	"github.com/alexedwards/scs/v2"
	"github.com/go-chi/chi/v5"
	"github.com/golang/gddo/httputil/header"
	"studynook.go"
	"studynook.go/db"
	"studynook.go/emails"
)

type Controller struct {
	DB       *db.DB
	Sessions *scs.SessionManager
	Router   chi.Router
	Emailer  *emails.Emailer
}

//initializes our Controller, this is called in the server/cmd main.go file and makes the db, sessions, router and emailer available to all Controller methods in the API package
func New(db *db.DB, emailer *emails.Emailer) (*Controller, error) {
	sessionManager := scs.New()
	sessionManager.Store = pgxstore.New(db.Conn)
	sessionManager.Lifetime = 1000000 * time.Hour
	sessionManager.Cookie.Persist = true
	sessionManager.Cookie.HttpOnly = false

	r := chi.NewRouter()

	c := &Controller{db, sessionManager, r, emailer}

	//* AUTH
	r.HandleFunc("/api/create_user", c.CreateUser)
	r.HandleFunc("/api/login_user", c.LoginUser)
	r.HandleFunc("/api/verify_email/{code}", c.VerifyEmail)
	r.HandleFunc("/api/logout_user", c.LogoutUser)
	r.HandleFunc("/api/forgot_password", c.ForgotPassword)
	r.HandleFunc("/api/reset_password", c.ResetPassword)
	r.HandleFunc("/api/state", WithUser(sessionManager, db, c.CurrentUserState))
	r.HandleFunc("/api/delete_account", WithUser(sessionManager, db, c.DeleteAccount))
	r.HandleFunc("/api/update_user", WithUser(sessionManager, db, c.UpdateUser))
	r.HandleFunc("/api/update_password", WithUser(sessionManager, db, c.UpdatePassword))

	//* GAME INTERFACE
	r.HandleFunc("/api/change_background", WithUser(sessionManager, db, c.ChangeBackgroundHandler))
	r.HandleFunc("/api/change_avatar", WithUser(sessionManager, db, c.ChangeAvatarHandler))

	//* ACHIVEMENTS
	r.HandleFunc("/api/achievement_check", WithUser(sessionManager, db, c.AchievementCheck))

	//* REPORT
	r.HandleFunc("/api/report_submission", WithUser(sessionManager, db, c.SubmitReports))

	// Mount the admin sub-router
	r.Mount("/admin", c.adminRouter())

	//* TODO LIST
	r.HandleFunc("/api/get_todos", WithError(c.GetTodosHandler))
	r.HandleFunc("/api/create_todo", WithError(c.CreateTodoHandler))
	r.HandleFunc("/api/update_todo", WithError(c.UpdateTodoHandler))
	r.HandleFunc("/api/delete_todo", WithError(c.DeleteTodoHandler))

	//* TIMER
	r.HandleFunc("/api/init_timer", WithError(c.InitTimerHandler))
	r.HandleFunc("/api/create_timer", WithError(c.CreateTimerHandler))
	r.HandleFunc("/api/get_time_left", WithError(c.GetTimeLeftHandler))
	r.HandleFunc("/api/delete_timer", WithError(c.DeleteTimerHandler))
	r.HandleFunc("/api/set_completed", WithError(c.SetIsCompletedHandler))

	return c, nil

}

//creating a new struct for a more extensible currentUser. Here we can add tasks and other states
type currentUserState struct {
	Name     string `json:"name"`
	Username string `json:"username"`
	Email    string `json:"email"`
	Coins    string `json:"coins"`
	Level    string `json:"level"`
	EXP      string `json:"experience"`
	Zone     string `json:"currentBackground"`
	Avatar   string `json:"currentAvatar"`
}

//will hit when the API from main.go is invoked- can be called from multiple components on frontend using useGetState() from utils folder, custom hook. Backend solution to persisting data through a refresh
func (c *Controller) CurrentUserState(w http.ResponseWriter, r *http.Request, u *studynook.User) {

	coins, err := c.DB.GetCoins(u.ID)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	exp, err := c.DB.GetEXPAmount(u.ID)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	userLevel, userExp := CalculateLevelEXP(exp)

	currentBackground, err := c.DB.GetCurrentBackground(u.ID)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	currentAvatar, err := c.DB.GetCurrentAvatar(u.ID)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	currentUser := &currentUserState{Email: u.Email,
		Name:     u.Name,
		Username: u.Username,
		Coins:    strconv.Itoa(coins),
		Level:    strconv.Itoa(userLevel),
		EXP:      strconv.Itoa(userExp),
		Zone:     currentBackground,
		Avatar:   currentAvatar,
	}

	err = json.NewEncoder(w).Encode(currentUser)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Println(err)
		return
	}
}

// A completely separate router for administrator routes
func (c *Controller) adminRouter() http.Handler {
	r := chi.NewRouter()

	r.Post("/login", c.AdminLoginHandler)   // POST /admin/login
	r.Post("/logout", c.AdminLogoutHandler) // POST /admin/logout

	r.Route("/users", func(r chi.Router) {
		r.Use(c.AdminOnly)
		r.Post("/", c.UserCreateHandler) // POST /admin/users
		r.Get("/", c.UserGetAllHandler)  // GET /admin/users
		r.Route("/{id}", func(r chi.Router) {
			r.Get("/", c.UserGetHandler)       // GET /admin/users/123
			r.Put("/", c.UserUpdateHandler)    // PUT /admin/users/123
			r.Delete("/", c.UserDeleteHandler) // DELETE /admin/users/123
		})
		r.Put("/details_only/{id}", c.UserUpdateExceptPasswordHandler) // PUT /admin/users/details_only/123
	})

	r.Route("/admins", func(r chi.Router) {
		r.Use(c.SuperAdminOnly)
		r.Post("/", c.AdminCreateHandler) // POST /admin/admins
		r.Get("/", c.AdminGetAllHandler)  // GET /admin/admins
		r.Route("/{id}", func(r chi.Router) {
			r.Get("/", c.AdminGetHandler)       // GET /admin/admins/123
			r.Put("/", c.AdminUpdateHandler)    // PUT /admin/admins/123
			r.Delete("/", c.AdminDeleteHandler) // DELETE /admin/admins/123
		})
		r.Put("/details_only/{id}", c.AdminUpdateExceptPasswordHandler) // PUT /admin/admins/details_only/123

	})

	return r
}

// Validation and error handling of the incoming JSON payload
type malformedRequest struct {
	status int
	msg    string
}

func (mr *malformedRequest) Error() string {
	return mr.msg
}

func decodeJSONBody(w http.ResponseWriter, r *http.Request, dst interface{}) error {
	if r.Header.Get("Content-Type") != "" {
		value, _ := header.ParseValueAndParams(r.Header, "Content-Type")
		if value != "application/json" {
			msg := "Content-Type header is not application/json"
			http.Error(w, msg, http.StatusUnsupportedMediaType)
			return &malformedRequest{status: http.StatusUnsupportedMediaType, msg: msg}
		}
	}
	r.Body = http.MaxBytesReader(w, r.Body, 1048576) // 1MB

	dec := json.NewDecoder(r.Body)
	dec.DisallowUnknownFields()

	err := dec.Decode(&dst)
	if err != nil {
		var syntaxError *json.SyntaxError
		var unmarshalTypeError *json.UnmarshalTypeError

		switch {
		case errors.As(err, &syntaxError):
			msg := fmt.Sprintf("Request body contains badly-formed JSON (at postion %d)", syntaxError.Offset)
			return &malformedRequest{status: http.StatusBadRequest, msg: msg}

		case errors.Is(err, io.ErrUnexpectedEOF):
			msg := fmt.Sprintf("Request body contains badly-formed JSON")
			return &malformedRequest{status: http.StatusBadRequest, msg: msg}

		case errors.As(err, &unmarshalTypeError):
			msg := fmt.Sprintf("Request body cotains an invalid value for the %q field (at position %d)", unmarshalTypeError.Field, unmarshalTypeError.Offset)
			return &malformedRequest{status: http.StatusBadRequest, msg: msg}

		case strings.HasPrefix(err.Error(), "json: unknown filed "):
			filedName := strings.TrimPrefix(err.Error(), "json: unknown field ")
			msg := fmt.Sprintf("Request body contains unknown filed %s", filedName)
			return &malformedRequest{status: http.StatusBadRequest, msg: msg}

		case errors.Is(err, io.EOF):
			msg := "Request body must not be empty"
			return &malformedRequest{status: http.StatusBadRequest, msg: msg}

		case err.Error() == "http: request body too large":
			msg := "Request body must not be larger than 1MB"
			return &malformedRequest{status: http.StatusRequestEntityTooLarge, msg: msg}

		default:
			return err

		}
	}
	err = dec.Decode(&struct{}{})
	if err != io.EOF {
		msg := "Request body must only contain a single JSON object"
		return &malformedRequest{status: http.StatusBadRequest, msg: msg}

	}
	return nil
}
