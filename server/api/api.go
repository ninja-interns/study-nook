package api

import (
	"net/http"
	"os"

	"github.com/go-chi/chi/v5"
	"github.com/joho/godotenv"
	"studynook.go/auth"
	"studynook.go/currentUser"
	"studynook.go/db"
	"studynook.go/emails"
	"studynook.go/middleware"
)

func Serve(port, user, password, connection, name string) error {
	err := db.InitDB(user, password, connection, name)
	if err != nil {
		return err
	}

	auth.SessionsConfig()

	err = godotenv.Load(".env.local")
	if err != nil {
		return err
	}

	//setting my EMailConfigs variable equal to this Emailer struct taking in environmental variables from my ".env.local"
	emails.EmailConfigs, err = emails.NewEmailer(os.Getenv("SMTP_USERNAME"), os.Getenv("SMTP_PASSWORD"), os.Getenv("SMTP_SERVER"), os.Getenv("SMTP_PORT"))
	if err != nil {
		return err
	}

	r := Routes()
	err = http.ListenAndServe(":8080", auth.SessionManager.LoadAndSave(r))
	if err != nil {
		return err
	}
	return nil
}

func Routes() chi.Router {
	r := chi.NewRouter()

	r.HandleFunc("/api/create_user", auth.CreateUser)
	r.HandleFunc("/api/login_user", auth.LoginUser)
	r.HandleFunc("/api/verify_email/{code}", auth.VerifyEmail)
	r.HandleFunc("/api/logout_user", auth.LogoutUser)
	r.HandleFunc("/api/forgot_password", auth.ForgotPassword)
	r.HandleFunc("/api/reset_password", auth.ResetPassword)
	r.HandleFunc("/api/state", middleware.WithUser(currentUser.CurrentUserState))
	r.HandleFunc("/api/delete_account", middleware.WithUser(auth.DeleteAccount))
	r.HandleFunc("/api/update_user", middleware.WithUser(auth.UpdateUser))
	r.HandleFunc("/api/update_password", middleware.WithUser(auth.UpdatePassword))

	return r
}
