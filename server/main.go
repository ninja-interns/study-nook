// Main file of study nook

// When creating new files for your React components or pages,
// create a subdirectory on this directory and name it with
// whichever feature you are creating.

package main

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"main.go/auth"
	"main.go/currentUser"
	initializeDB "main.go/initializedb"
	"main.go/middleware"
)

func main() {
	initializeDB.InitDB()

	auth.SessionsConfig()

	r := chi.NewRouter()

	r.HandleFunc("/api/createUser", auth.CreateUser)
	r.HandleFunc("/api/loginUser", auth.LoginUser)
	r.HandleFunc("/api/logoutUser", auth.LogoutUser)
	r.HandleFunc("/api/state", middleware.WithUser(currentUser.CurrentUserState))
	r.HandleFunc("/api/updateUser", middleware.WithUser(auth.UpdateUser))
	r.HandleFunc("/api/updatePassword", middleware.WithUser(auth.UpdatePassword))

	http.ListenAndServe(":8080", auth.SessionManager.LoadAndSave(r))
}
