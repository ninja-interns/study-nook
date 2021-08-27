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

	//getting the URL parameter from the GET request and setting it in qCode
	qCode := chi.URLParam(r, "code")

	//querying my database for the code- if a row doesn't come back, queryRow will throw an error.
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

	//if a row does come back, this query will run that will update the user's is_verified column to true.
	sqlStatement = `
	UPDATE users SET is_verified = true WHERE token = $1`

	_, err = initializeDB.Conn.Exec(context.Background(), sqlStatement, qCode)
	if err != nil {
		fmt.Println(err)
		response := JsonResponse{
			Message: "Oops, something went wrong. Please try again.",
			IsValid: false,
		}
		json.NewEncoder(w).Encode(response)
		http.Error(w, err.Error(), http.StatusInternalServerError)

		return
	}

	//if it's all successful, this response will be written back.
	response := JsonResponse{
		Message: "Success, your email is verified.",
		IsValid: true,
	}
	json.NewEncoder(w).Encode(response)
}
