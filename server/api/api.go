package api

import (
	"fmt"
	"net/http"
	"os"

	"github.com/go-chi/chi/v5"
	"github.com/joho/godotenv"
	"studynook.go/auth"
	"studynook.go/currentUser"
	"studynook.go/emails"
	initializeDB "studynook.go/initializedb"
	"studynook.go/middleware"
)

func Serve(port, user, password, connection, name string) error {
	err := initializeDB.InitDB(user, password, connection, name)
	if err != nil {
		fmt.Println(err)
		return err
	}

	auth.SessionsConfig()

	err = godotenv.Load(".env.local")
	if err != nil {
		fmt.Println(err)
		return err
	}

	//setting my EMailConfigs variable equal to this Emailer struct taking in environmental variables from my ".env.local"
	emails.EmailConfigs, err = emails.NewEmailer(os.Getenv("SMTP_USERNAME"), os.Getenv("SMTP_PASSWORD"), os.Getenv("SMTP_SERVER"), os.Getenv("SMTP_PORT"))
	if err != nil {
		fmt.Println("package main email err", err)
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

	r.HandleFunc("/api/createUser", auth.CreateUser)
	r.HandleFunc("/api/loginUser", auth.LoginUser)
	r.HandleFunc("/api/verifyEmail/{code}", auth.VerifyEmail)
	r.HandleFunc("/api/logoutUser", auth.LogoutUser)
	r.HandleFunc("/api/forgotPassword", auth.ForgotPassword)
	r.HandleFunc("/api/resetPassword", auth.ResetPassword)
	r.HandleFunc("/api/state", middleware.WithUser(currentUser.CurrentUserState))
	r.HandleFunc("/api/deleteAccount", middleware.WithUser(auth.DeleteAccount))
	r.HandleFunc("/api/updateUser", middleware.WithUser(auth.UpdateUser))
	r.HandleFunc("/api/updatePassword", middleware.WithUser(auth.UpdatePassword))

	return r
}
