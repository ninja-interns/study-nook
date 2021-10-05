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

	r.Post("/api/login_admin", c.AdminLoginHandler)   //POST /api/login_admin
	r.Post("/api/logout_admin", c.AdminLogoutHandler) //POST /api/logout_admin

	// Mount the admin sub-router
	r.Mount("/admin", c.adminRouter())

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

// A completely separate router for administrator routes
func (c *Controller) adminRouter() http.Handler {
	r := chi.NewRouter()
	r.Route("/", func(r chi.Router) {
		r.Use(c.AdminOnly)
		r.Post("/users", c.UserCreateHandler) // POST /admin/users
		r.Get("/users", c.UserGetAllHandler)  // GET /admin/users
		r.Route("/users/{userID}", func(r chi.Router) {
			r.Get("/", c.UserGetHandler)       // GET /admin/users/123
			r.Put("/", c.UserUpdateHandler)    // PUT /admin/users/123
			r.Delete("/", c.UserDeleteHandler) // DELETE /admin/users/123
		})
		r.Put("/user_details_only/{userID}", c.UserUpdateExceptPasswordHandler)
	})
	return r

}
