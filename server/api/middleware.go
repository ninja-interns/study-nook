package api

import (
	"fmt"
	"net/http"

	"github.com/alexedwards/scs/v2"
	"studynook.go"
	"studynook.go/db"
)

//defining middleware that checks that a user is logged in
type SecureHandler func(w http.ResponseWriter, r *http.Request, u *studynook.User)

func WithUser(sessions *scs.SessionManager, database *db.DB, next SecureHandler) http.HandlerFunc {
	fn := func(w http.ResponseWriter, r *http.Request) {
		//getting id from the Session
		id := sessions.GetString(r.Context(), "id")
		if id == "" {
			http.Error(w, "You are not logged in", http.StatusForbidden)
			return
		}
		user, err := database.GetUserById(id)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			fmt.Println(err)
			return
		}
		next(w, r, user)
	}
	return fn
}

type ErrorHandler func(w http.ResponseWriter, r *http.Request) (int, error)

func WithError(next ErrorHandler) http.HandlerFunc {
	fn := func(w http.ResponseWriter, r *http.Request) {
		code, err := next(w, r)
		if err != nil {
			http.Error(w, err.Error(), code)
			fmt.Println(err)
			return
		}
		w.WriteHeader(code)
	}
	return fn
}

// AdminOnly middleware checks that the admin is logged in
func (c *Controller) AdminOnly(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		adminID := c.Sessions.GetString(r.Context(), "id")
		if adminID == "" {
			http.Error(w, http.StatusText(http.StatusForbidden), http.StatusForbidden)
			return
		}
		next.ServeHTTP(w, r)
	})
}

// SuperAdminOnly middleware checks that the admin is logged in as superadmin
func (c *Controller) SuperAdminOnly(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		adminType := c.Sessions.GetString(r.Context(), "adminType")
		if adminType != "superadmin" {
			http.Error(w, http.StatusText(http.StatusForbidden), http.StatusForbidden)
			return
		}
		next.ServeHTTP(w, r)
	})
}
