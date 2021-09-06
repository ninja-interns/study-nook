package auth

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"

	"golang.org/x/crypto/bcrypt"
	initializeDB "studynook.go/initializedb"
)

type ResetPasswordStruct struct {
	Email        string `json:"email"`
	Token        string `json:"token"`
	Password     string `json:"password"`
	Confirmation string `json:"confirmation"`
}

func ResetPassword(w http.ResponseWriter, r *http.Request) {
	p := &ResetPasswordStruct{}
	var dbToken string

	err := json.NewDecoder(r.Body).Decode(p)
	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	//backend check if passwords match
	if p.Password != p.Confirmation {
		response := JsonResponse{
			Message: "Your passwords do not match.",
			IsValid: false,
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	//checking if the email exists within our database
	sqlStatement := `
	SELECT token FROM users WHERE email = $1`

	err = initializeDB.Conn.QueryRow(context.Background(), sqlStatement, p.Email).Scan(&dbToken)
	if err != nil {
		fmt.Println(err)
		response := JsonResponse{
			Message: "We couldn't find your email.",
			IsValid: false,
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	//checking if the token the user sent matches the token in our database
	if dbToken != p.Token {
		response := JsonResponse{
			Message: "Please double check your code and try again.",
			IsValid: false,
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	//if code reaches here, we can hash the password and enter it into our database
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(p.Password), 8)
	if err != nil {
		fmt.Println(err)
		return
	}

	//creating a token so that the same token cannot be used to reset the password again
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

	sqlStatement = `
	UPDATE users SET password_hash = $2, token = $3 WHERE email = $1`

	_, err = initializeDB.Conn.Exec(context.Background(), sqlStatement, p.Email, hashedPassword, token)
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

	//if it's all successful, this response will be written back.
	response := JsonResponse{
		Message: "Sucess, your password has been changed",
		IsValid: true,
	}
	json.NewEncoder(w).Encode(response)
}
