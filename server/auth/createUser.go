package auth

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gofrs/uuid"
	"golang.org/x/crypto/bcrypt"
	initializeDB "main.go/initializedb"
)

type User struct {
	ID       string `json:"id"`
	Email    string `json:"email"`
	Name     string `json:"name"`
	Username string `json:"username"`
	Password string `json:"password"`
}

//creating a struct for the JSON response message
type JsonResponse struct {
	Message string `json:"message"`
	IsValid bool   `json:"isValid"`
}

//will hit when the API from main.go is invoked
func CreateUser(w http.ResponseWriter, r *http.Request) {
	u := &User{}
	id, err := uuid.NewV4()
	if err != nil {
		fmt.Println(err)
		return
	}
	u.ID = id.String()

	err = json.NewDecoder(r.Body).Decode(u)
	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

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

	//creating an insert in our database
	sqlStatement := `
	INSERT INTO users (id, email, password_hash, name, username)
	VALUES ($1, $2, $3, $4, $5)`

	//actually inserting a record into the DB, if we get a duplicate error, it will write to the frontend what error it is
	_, err = initializeDB.Conn.Exec(context.Background(), sqlStatement, u.ID, u.Email, hashedPassword, u.Name, u.Username)
	if err != nil {
		fmt.Println(err)
		response := JsonResponse{
			Message: "Your username or email has already been used!",
			IsValid: false,
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	//if it reaches here, everything is okay, sends back a success to the front end via a response

	fmt.Println("FINISHED", u.ID)
	response := JsonResponse{
		Message: "Success!",
		IsValid: true,
	}
	json.NewEncoder(w).Encode(response)
}
