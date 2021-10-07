package api

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/alexedwards/scs/pgxstore"
	"github.com/alexedwards/scs/v2"
	"github.com/go-chi/chi/v5"
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
	r.HandleFunc("/api/state", WithUser(sessionManager, db, CurrentUserState))
	r.HandleFunc("/api/delete_account", WithUser(sessionManager, db, c.DeleteAccount))
	r.HandleFunc("/api/update_user", WithUser(sessionManager, db, c.UpdateUser))
	r.HandleFunc("/api/update_password", WithUser(sessionManager, db, c.UpdatePassword))
	r.HandleFunc("/api/report_submission", WithUser(sessionManager, db, c.SubmitReports))

	//* ADMIN
	r.Route("/admin", func(r chi.Router) {
		r.Post("/login", c.AdminLoginHandler)
		r.Post("/users", c.UserCreateHandler) // POST /admin/users
		r.Get("/users", c.UserGetAllHandler)  // GET /admin/users
		r.Route("/users/{userID}", func(r chi.Router) {
			r.Get("/", c.UserGetHandler)       // GET /admin/users/123
			r.Put("/", c.UserUpdateHandler)    // PUT /admin/users/123
			r.Delete("/", c.UserDeleteHandler) // DELETE /admin/users/123
		})
		r.Put("/user_details_only/{userID}", c.UserUpdateExceptPasswordHandler)
	})

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

	//* THEME
	r.HandleFunc("/api/set_theme", WithError(c.SetThemeHandler))
	r.HandleFunc("/api/get_theme", WithError(c.GetThemeHandler))

	return c, nil
}

//creating a new struct for a more extensible currentUser. Here we can add tasks and other states
type currentUserState struct {
	Name     string `json:"name"`
	Username string `json:"username"`
	Email    string `json:"email"`
}

//will hit when the API from main.go is invoked- can be called from multiple components on frontend using useGetState() from utils folder, custom hook. Backend solution to persisting data through a refresh
func CurrentUserState(w http.ResponseWriter, r *http.Request, u *studynook.User) {
	currentUser := &currentUserState{Email: u.Email,
		Name:     u.Name,
		Username: u.Username}

	err := json.NewEncoder(w).Encode(currentUser)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Println(err)
		return
	}
}
