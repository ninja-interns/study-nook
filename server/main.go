// Main file of study nook

// When creating new files for your React components or pages,
// create a subdirectory on this directory and name it with
// whichever feature you are creating.

package main

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"main.go/auth"
	initializeDB "main.go/initializedb"
)

func main() {
	initializeDB.InitDB()

	r := chi.NewRouter()

	r.Post("/api/createUser", auth.CreateUser)
	r.Post("/api/loginUser", auth.LoginUser)
	r.Post("/api/checkEmail", auth.CheckEmail)
	r.Post("/api/changePassword", auth.ChangePassword)

	http.ListenAndServe(":8080", r)
}
