// Main file of study nook

// When creating new files for your React components or pages,
// create a subdirectory on this directory and name it with
// whichever feature you are creating.

package main

import (
	"fmt"
	"net/http"

	"studynook.go/api"
	"studynook.go/auth"
	"studynook.go/currentUser"
	"studynook.go/db"
	"studynook.go/middleware"

	"github.com/go-chi/chi/v5"
	"github.com/joho/godotenv"
)

func main() {
	db.Initialize()

	auth.SessionsConfig()

	err := godotenv.Load(".env.local")
	if err != nil {
		fmt.Println(err)
		return
	}

	//setting my EMailConfigs variable equal to this Emailer struct taking in environmental variables from my ".env.local"
	//emails.EmailConfigs, err = emails.NewEmailer(os.Getenv("SMTP_USERNAME"), os.Getenv("SMTP_PASSWORD"), os.Getenv("SMTP_SERVER"), os.Getenv("SMTP_PORT"))
	if err != nil {
		fmt.Println("package main email err", err)
		return
	}

	r := chi.NewRouter()

	r.HandleFunc("/api/createUser", auth.CreateUser)
	r.HandleFunc("/api/loginUser", auth.LoginUser)
	r.HandleFunc("/api/verifyEmail/{code}", auth.VerifyEmail)
	r.HandleFunc("/api/logoutUser", auth.LogoutUser)
	r.HandleFunc("/api/state", middleware.WithUser(currentUser.CurrentUserState))

	r.Route("/api/users", func(r chi.Router) {
		r.Post("/", api.CreateUser) // POST /users
		r.Get("/", api.GetAllUsers) // GET /users

		r.Route("/{userID}", func(r chi.Router) {
			r.Use(api.UserContext)        // Load the *User on the request context
			r.Get("/", api.GetUser)       // GET /users/123
			r.Put("/", api.UpdateUser)    // PUT /users/123
			r.Delete("/", api.DeleteUser) // DELETE /users/123
		})
	})

	http.ListenAndServe(":8080", auth.SessionManager.LoadAndSave(r))
}
