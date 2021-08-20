// Main file of study nook

// When creating new files for your React components or pages,
// create a subdirectory on this directory and name it with
// whichever feature you are creating.

package main

import (
	"net/http"

	"github.com/alexedwards/scs/postgresstore"
	"github.com/alexedwards/scs/v2"
	"github.com/go-chi/chi/v5"
	"main.go/auth"
	initializeDB "main.go/initializedb"
)

func main() {
	initializeDB.InitDB()

	auth.SessionManager = scs.New()
	auth.SessionManager.Store = postgresstore.New(initializeDB.Db)

	r := chi.NewRouter()

	r.HandleFunc("/api/createUser", auth.CreateUser)
	r.HandleFunc("/api/loginUser", auth.LoginUser)

	http.ListenAndServe(":8080", auth.SessionManager.LoadAndSave(r))
}
