package auth

import (
	"encoding/json"
	"fmt"
	"net/http"

	"golang.org/x/crypto/bcrypt"
	initializeDB "main.go/initializedb"
)

type User struct {
	Email     string `json:"email"`
	Name      string `json:"name"`
	Username  string `json:"username"`
	Password  string `json:"password"`
	IsVerfied string `json:"isVerified"`
}

//creating a struct for the JSON response message
type JsonResponse struct {
	Message string `json:"message"`
	IsValid bool   `json:"isValid"`
}

//will hit when the API from main.go is invoked
func CreateUser(w http.ResponseWriter, r *http.Request) {
	fmt.Println("HIT")
	u := &User{}
	err := json.NewDecoder(r.Body).Decode(u)
	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	//one way hashing to create password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(u.Password), 8)
	if err != nil {
		fmt.Println(err)
		return
	}

	//creating an insert in our database
	sqlStatement := `
	INSERT INTO users (email, password_hash, name, username, isVerfied)
	VALUES ($1, $2, $3, $4, $5)`

	//actually inserting a record into the DB, if we get a duplicate error, it will write to the frontend what error it is
	_, err = initializeDB.Db.Exec(sqlStatement, u.Email, hashedPassword, u.Name, u.Username, false)
	if err != nil {
		fmt.Println("create user", err)
		response := JsonResponse{
			Message: "Your username or email has already been used!",
			IsValid: false,
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	//if it reaches here, everything is okay, sends back a success to the front end via a response
	SendEmail(u.Email, "Verify your email with StudyNook")
	response := JsonResponse{
		Message: "Success, Please check your email to verify your account!",
		IsValid: true,
	}
	json.NewEncoder(w).Encode(response)
}
