package auth

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"

	"studynook.go/emails"
	initializeDB "studynook.go/initializedb"
)

func ForgotPassword(w http.ResponseWriter, r *http.Request) {
	u := &User{}
	var name string

	err := json.NewDecoder(r.Body).Decode(u)
	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	//checking if the email exists within our database
	sqlStatement := `
	SELECT name FROM users WHERE email = $1`

	err = initializeDB.Conn.QueryRow(context.Background(), sqlStatement, u.Email).Scan(&name)
	if err != nil {
		fmt.Println(err)
		response := JsonResponse{
			Message: "We couldn't find your email.",
			IsValid: false,
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	//creating a token
	token, err := CreateToken()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := JsonResponse{
			Message: "Something went wrong, please try again.",
			IsValid: false,
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	//if code reaches here, the email exists and we can set the token to the user
	sqlStatement = `
	UPDATE users SET token = $2 WHERE email = $1`

	_, err = initializeDB.Conn.Exec(context.Background(), sqlStatement, u.Email, token)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Println(err)
		response := JsonResponse{
			Message: "Something went wrong, please try again.",
			IsValid: false,
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	//sending the email
	emails.SendEmail(u.Email, "Recover your StudyNook password", "emails/emailTemplates/recoverPassword.html", map[string]string{"name": name, "token": token})

	//if it's all successful, this response will be written back.
	response := JsonResponse{
		Message: "Sucess, please check your email.",
		IsValid: true,
	}
	json.NewEncoder(w).Encode(response)
}
