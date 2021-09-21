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
