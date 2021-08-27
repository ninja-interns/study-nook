package auth

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"

	"golang.org/x/crypto/bcrypt"
	"main.go/emails"
	initializeDB "main.go/initializedb"
)

type User struct {
	Email     string `json:"email"`
	Name      string `json:"name"`
	Username  string `json:"username"`
	Password  string `json:"password"`
	IsVerfied string `json:"isVerified"`
	Token     string `json:"token"`
}

//creating a struct for the JSON response message
type JsonResponse struct {
	Message    string `json:"message"`
	IsValid    bool   `json:"isValid"`
	IsVerified bool   `json:"isVerified"`
}

//will hit when the API from main.go is invoked
func CreateUser(w http.ResponseWriter, r *http.Request) {
	u := &User{}
	err := json.NewDecoder(r.Body).Decode(u)
	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	//checking password length at the backend as well as the frontend
	passwordLength := len(u.Password)
	if passwordLength < 6 {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	//one way hashing to create password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(u.Password), 8)
	if err != nil {
		fmt.Println(err)
		return
	}

	//creating a token to send to the database- in sendEmail.go. This is the token that will be compared to the user's entered code to verify their email
	token, err := CreateToken()
	if err != nil {
		fmt.Println(err)
		return
	}

	//creating an insert in our database
	sqlStatement := `
	INSERT INTO users (email, password_hash, name, username, is_verified, token)
	VALUES ($1, $2, $3, $4, $5, $6)`

	//actually inserting a record into the DB, if we get a duplicate error, it will write to the frontend what error it is
	_, err = initializeDB.Conn.Exec(context.Background(), sqlStatement, u.Email, hashedPassword, u.Name, u.Username, false, token)
	if err != nil {
		response := JsonResponse{
			Message: "Your username or email has already been used!",
			IsValid: false,
		}
		fmt.Println(err)
		json.NewEncoder(w).Encode(response)
		return
	}

	//if it reaches here, everything is okay, sends back a success to the front end via a response
	emails.SendEmail(u.Email, "Verify your email with StudyNook", "emails/emailTemplates/verifyEmail.html", map[string]string{"name": u.Name, "token": token})
	response := JsonResponse{
		Message: "Success, Please check your email to verify your account!",
		IsValid: true,
	}
	json.NewEncoder(w).Encode(response)
}
