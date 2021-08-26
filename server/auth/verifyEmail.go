package auth

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/go-chi/chi/v5"
	initializeDB "main.go/initializedb"
)

func VerifyEmail(w http.ResponseWriter, r *http.Request) {
	var name string
	qCode := chi.URLParam(r, "code")

	sqlStatement := `
	SELECT name FROM users WHERE token = $1`

	err := initializeDB.Conn.QueryRow(context.Background(), sqlStatement, qCode).Scan(&name)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Println(err)
		response := JsonResponse{
			Message: "Couldn't find your account, please double check your code",
			IsValid: false,
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	sqlStatement = `
	UPDATE users SET is_verified = true WHERE token = $1`

	_, err = initializeDB.Conn.Exec(context.Background(), sqlStatement, qCode)
	if err != nil {
		fmt.Println(err)
	}

	response := JsonResponse{
		Message: "Success, your email is verified.",
		IsValid: true,
	}
	json.NewEncoder(w).Encode(response)
}
