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
	"main.go/auth"
	initializeDB "main.go/initializedb"
	"main.go/middleware"
)

type UserData struct {
	userId     string
	userCookie string
}

type dbWrapper struct {
	conn *pgx.Conn
}

func main() {
	initializeDB.InitDB()

	auth.SessionsConfig()

	r := chi.NewRouter()

	r.HandleFunc("/api/createUser", auth.CreateUser)
	r.HandleFunc("/api/loginUser", auth.LoginUser)
	r.HandleFunc("/api/logoutUser", auth.LogoutUser)

	fmt.Println("Welcome to study nook! :)")

	conn, err := connectDb()
	if err != nil {
		return
	}
	defer conn.Close(context.Background())

	r = chi.NewMux()

	r.Use(middleware.Logger)
	http.ListenAndServe(":3000", r)
}

//Returns a pgx database connector to the studynook db
func connectDb() (*pgx.Conn, error) {
	conn_arg := "postgres://studynook:studynook@localhost:5432/studynook?sslmode=disable"
	conn, err := pgx.Connect(context.Background(), conn_arg)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
		return nil, err
	}

	return conn, nil
}
