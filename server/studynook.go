// Main file of study nook

// When creating new files for your React components or pages,
// create a subdirectory on this directory and name it with
// whichever feature you are creating.

package main

import (
	"fmt"
	"net/http"

	//CURRENT IMPORTS
	"os"

	"github.com/go-chi/chi/v5"
	"github.com/joho/godotenv"
	"studynook.go/auth"
	"studynook.go/currentUser"
	"studynook.go/emails"
	initializeDB "studynook.go/initializedb"
	"studynook.go/middleware"
	"studynook.go/timer"
	"studynook.go/todo"
)

// THIS IS THE CURRENT MAIN
func main() {
	initializeDB.InitDB()

	auth.SessionsConfig()
	todo.SessionsConfig()

	err := godotenv.Load(".env.local")
	if err != nil {
		fmt.Println(err)
		return
	}

	//setting my EMailConfigs variable equal to this Emailer struct taking in environmental variables from my ".env.local"
	emails.EmailConfigs, err = emails.NewEmailer(os.Getenv("SMTP_USERNAME"), os.Getenv("SMTP_PASSWORD"), os.Getenv("SMTP_SERVER"), os.Getenv("SMTP_PORT"))
	if err != nil {
		fmt.Println("package main email err", err)
		return
	}

	r := chi.NewRouter()

	//* AUTH
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

	//* TODO LIST
	r.HandleFunc("/api/getTodos", todo.GetTodos)
	r.HandleFunc("/api/createTodo", todo.CreateTodo)
	r.HandleFunc("/api/updateTodo", todo.UpdateTodo)
	r.HandleFunc("/api/deleteTodo", todo.DeleteTodo)

	//* TIMER
	r.HandleFunc("/api/createTimer", timer.CreateTimer)
	r.HandleFunc("/api/getTimeLeft", timer.GetTimeLeft)
	r.HandleFunc("/api/deleteTimer", timer.DeleteTimer)
	r.HandleFunc("/api/setTimerDuration", timer.SetTimerDuration)
	r.HandleFunc("/api/setCompleted", timer.SetCompleted)

	http.ListenAndServe(":8080", auth.SessionManager.LoadAndSave(r))
}
