// Main file of study nook

// When creating new files for your React components or pages,
// create a subdirectory on this directory and name it with
// whichever feature you are creating.

package main

import (
	"fmt"
	"net/http"
	"os"

	"studynook.go/auth"
	"studynook.go/currentUser"
	"studynook.go/emails"
	initializedb "studynook.go/initializedb"
	"studynook.go/levelExperience"
	"studynook.go/middleware"
	"studynook.go/report"

	"github.com/go-chi/chi/v5"
	"github.com/joho/godotenv"
)

func main() {
	initializedb.InitDB()

	auth.SessionsConfig()

	err := godotenv.Load(".env.local")
	if err != nil {
		fmt.Println(err)
		return
	}

	//setting my EMailConfigs variable equal to this Emailer struct taking in environmental variables from my ".env.local"
	emails.EmailConfigs, err = emails.NewEmailer(os.Getenv("SMTP_USERNAME"), os.Getenv("SMTP_PASSWORD"), os.Getenv("SMTP_SERVER"), os.Getenv("SMTP_PORT"))
	if err != nil {
		fmt.Println("package main email err", err)
		return
	}

	r := chi.NewRouter()

	r.HandleFunc("/api/create_user", auth.CreateUser)
	r.HandleFunc("/api/login_user", auth.LoginUser)
	r.HandleFunc("/api/verify_email/{code}", auth.VerifyEmail)
	r.HandleFunc("/api/logout_user", auth.LogoutUser)
	r.HandleFunc("/api/forgot_password", auth.ForgotPassword)
	r.HandleFunc("/api/reset_password", auth.ResetPassword)

	r.HandleFunc("/api/report_submission", middleware.WithUser(report.SubmitReports))
	r.HandleFunc("/api/state", middleware.WithUser(currentUser.CurrentUserState))
	r.HandleFunc("/api/delete_account", middleware.WithUser(auth.DeleteAccount))
	r.HandleFunc("/api/update_user", middleware.WithUser(auth.UpdateUser))
	r.HandleFunc("/api/update_password", middleware.WithUser(auth.UpdatePassword))
	r.HandleFunc("/api/get_level", middleware.WithUser(levelExperience.GetLevelHandler))
	r.HandleFunc("/api/calculate_exp", middleware.WithUser(levelExperience.CalculateSessionRewards))

	http.ListenAndServe(":8080", auth.SessionManager.LoadAndSave(r))
}
