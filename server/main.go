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
)

const MAX_UPLOAD_SIZE = 1024 * 1024

type dbWrapper struct {
	conn *pgx.Conn
}

func main() {
	initializeDB.InitDB()

	r := chi.NewRouter()

	r.HandleFunc("/api/createUser", auth.CreateUser)
	r.HandleFunc("/api/loginUser", auth.LoginUser)

	fmt.Println("Welcome to study nook! :)")
	conn, err := connectDb()
	db_wr := dbWrapper{conn}
	if err != nil {
		return
	}

	r = chi.NewMux()

	r.Use(middleware.Logger)
	//receives images and handles the data to be stored in the uploads directory
	r.Post("/api/image-upload", db_wr.handleImageUpload)
	r.Get("api/image-get", db_wr.handleImageRetrieve)
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
