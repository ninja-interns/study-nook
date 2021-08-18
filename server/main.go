// Main file of study nook

// When creating new files for your React components or pages,
// create a subdirectory on this directory and name it with
// whichever feature you are creating.

package main

import (
	"context"
	"fmt"
	"net/http"
	"os"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/jackc/pgx/v4"
	"localmodel.com/authentication"
)

func main() {

	fmt.Println("Welcome to study nook! :)")

	conn, err := initDB()

	if err != nil {
		fmt.Println(err)
	}

	// Initializes Mux object that implements router interface
	r := chi.NewMux()

	// Display logs of communications on terminal
	r.Use(middleware.Logger)

	// Function handler to when a HTTP method is received
	// This function will only called if the specified URL
	// is request in the method.
	r.HandleFunc("/api/signup", func(output http.ResponseWriter, request *http.Request) {
		authentication.SignupHandler(conn, output, request)
	})

	fmt.Println("Starting server at port 8080!")

	// Opening local server at port :8080
	http.ListenAndServe(":8080", r)

}

// Connecting to database
func initDB() (*pgx.Conn, error) {

	// Creating connection string
	connection_string := "postgres://dev:dev@localhost:5432/studynook_db?sslmode=disable"

	conn, err := pgx.Connect(context.Background(), connection_string)

	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
		return nil, err
	}

	fmt.Println("Successfully connected to database")

	return conn, nil
}
