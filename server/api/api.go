package api

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/alexedwards/scs/pgxstore"
	"github.com/alexedwards/scs/v2"
	"github.com/go-chi/chi/v5"
	"studynook.go/auth"
	"studynook.go/db"
)

// func Serve(port, user, password, connection, name string) error {
// err := db.InitDB(user, password, connection, name)
// if err != nil {
// 	return err
// }

// auth.SessionsConfig()

// err = godotenv.Load(".env.local")
// if err != nil {
// 	return err
// }

//setting my EMailConfigs variable equal to this Emailer struct taking in environmental variables from my ".env.local"
// emails.EmailConfigs, err = emails.NewEmailer(os.Getenv("SMTP_USERNAME"), os.Getenv("SMTP_PASSWORD"), os.Getenv("SMTP_SERVER"), os.Getenv("SMTP_PORT"))
// if err != nil {
// 	return err
// }

// r := routes()

// return nil
// }

type Controller struct {
	DB       *db.DB
	Sessions *scs.SessionManager
	Router   chi.Router
}

func New(db *db.DB) (*Controller, error) {
	sessionManager := scs.New()
	sessionManager.Store = pgxstore.New(db.Conn)
	sessionManager.Lifetime = 1000000 * time.Hour
	sessionManager.Cookie.Persist = true
	sessionManager.Cookie.HttpOnly = false

	r := chi.NewRouter()

	r.HandleFunc("/api/create_user", auth.CreateUser)
	r.HandleFunc("/api/login_user", auth.LoginUser)
	r.HandleFunc("/api/verify_email/{code}", auth.VerifyEmail)
	r.HandleFunc("/api/logout_user", auth.LogoutUser)
	r.HandleFunc("/api/forgot_password", auth.ForgotPassword)
	r.HandleFunc("/api/reset_password", auth.ResetPassword)
	r.HandleFunc("/api/state", WithUser(sessionManager, CurrentUserState))
	r.HandleFunc("/api/delete_account", WithUser(sessionManager, auth.DeleteAccount))
	r.HandleFunc("/api/update_user", WithUser(sessionManager, auth.UpdateUser))
	r.HandleFunc("/api/update_password", WithUser(sessionManager, auth.UpdatePassword))

	c := &Controller{db, sessionManager, r}
	return c, nil
}

//creating a new struct for a more extensible currentUser. Here we can add tasks and other states
type currentUserState struct {
	Name     string `json:"name"`
	Username string `json:"username"`
	Email    string `json:"email"`
}

//will hit when the API from main.go is invoked- can be called from multiple components on frontend using useGetState() from utils folder, custom hook. Backend solution to persisting data through a refresh
func CurrentUserState(w http.ResponseWriter, r *http.Request, u *auth.User) {
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
