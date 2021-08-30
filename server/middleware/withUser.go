package middleware

import (
	"fmt"
	"net/http"

	"studynook.go/auth"
)

//defining middleware that checks that a user is logged in
type SecureHandler func(w http.ResponseWriter, r *http.Request, u *auth.User)

func WithUser(next SecureHandler) http.HandlerFunc {
	fn := func(w http.ResponseWriter, r *http.Request) {
		//getting id from the Session
		id := auth.SessionManager.GetInt(r.Context(), "id")
		if id == 0 {
			http.Error(w, "You are not logged in", http.StatusForbidden)
			return
		}
		user, err := auth.GetUserById(id)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			fmt.Println(err)
			return
		}
		next(w, r, user)
	}
	return fn
}
