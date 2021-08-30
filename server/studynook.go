// Main file of study nook

// When creating new files for your React components or pages,
// create a subdirectory on this directory and name it with
// whichever feature you are creating.

package main

import (
	"net/http"

	"studynook.go/auth"
	"studynook.go/currentUser"
	initializeDB "studynook.go/initializedb"
	"studynook.go/middleware"

	"github.com/go-chi/chi/v5"
)

func main() {
	initializeDB.InitDB()

	auth.SessionsConfig()

	r := chi.NewRouter()

	r.HandleFunc("/api/createUser", auth.CreateUser)
	r.HandleFunc("/api/loginUser", auth.LoginUser)
	r.HandleFunc("/api/verifyEmail/{code}", auth.VerifyEmail)
	r.HandleFunc("/api/logoutUser", auth.LogoutUser)
	r.HandleFunc("/api/state", middleware.WithUser(currentUser.CurrentUserState))

	http.ListenAndServe(":8080", auth.SessionManager.LoadAndSave(r))
}
