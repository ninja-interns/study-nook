// Main file of study nook

// When creating new files for your React components or pages,
// create a subdirectory on this directory and name it with
// whichever feature you are creating.

package main

import (
	"database/sql"
	"fmt"
	"net/http"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"localmodel.com/authentication"
)

var db *sql.DB

func main() {

	fmt.Println("Welcome to study nook! :)")

	// Initializes Mux object that implements router interface
	r := chi.NewMux()

	// Display logs of communications on terminal
	r.Use(middleware.Logger)

	// Function handler to when a HTTP method is received
	// This function will only called if the specified URL
	// is request in the method.
	r.HandleFunc("/api/signup", authentication.SignupHandler)

	fmt.Println("Starting server at port 8080!")

	// Opening local server at port :8080
	http.ListenAndServe(":8080", r)

}

func initDB() {
	// Creating connection string
	conn := "user=postgres dbname=postgres password=12345 host=localhost sslmode=disable"

	var err error

	// Opening connection with database
	db, err = sql.Open("postgres", conn)
	if err != nil {
		panic(err)
	}

	// Pinging to check if connection is up
	err = db.Ping()
	if err != nil {
		fmt.Println("Cannot ping!")
		panic(err)
	}

	fmt.Println("Successfully connected to database!")
}

type Controller struct {
	*sql.DB
}
