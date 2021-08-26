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

	// Auth
	r.HandleFunc("/api/createUser", auth.CreateUser)
	r.HandleFunc("/api/loginUser", auth.LoginUser)
	r.HandleFunc("/api/logoutUser", auth.LogoutUser)
	r.HandleFunc("/api/state", middleware.WithUser(currentUser.CurrentUserState))


	// Task Management
	r.HandleFunc("/api/getTasks", todo.getAllTasksHandler)
	r.HandleFunc("/api/createTask", todo.createTaskHandler)
	r.HandleFunc("/api/taskComplete", todo.taskCompleteHandler)
	r.HandleFunc("/api/deleteTask", todo.deleteTaskHandler)

	http.ListenAndServe(":8080", r)
}