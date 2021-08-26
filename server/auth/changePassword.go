package auth

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"

	"golang.org/x/crypto/bcrypt"
	initializeDB "main.go/initializedb"
)

// Struct to store data in json format fetched from front-end
type Password struct {
	Password string `json:"password"`
	Token    string `json:"token"`
}

// Function to check if token exists in "email_token" table
func CheckToken(token string) string {

	// Creating query to database to check if token is within table
	sqlStatement := `SELECT email FROM email_token WHERE token = $1;`

	row := ""

	// Making query to database and scanning any results to empty variable
	err := initializeDB.Conn.QueryRow(context.Background(), sqlStatement, token).Scan(&row)
	if err != nil {
		fmt.Println(err)
	}

	// Conditinal statement to check if token actually exists
	// If it doesn't, it will just return an empty string.
	// Else, if it does, it will return its value.
	if row == "" {
		return ""
	} else {
		return row
	}

}

func DeleteTokenRow(token string) {

	// Creating query to delete row after all the process is done.
	sqlStatement := `DELETE FROM email_token WHERE token = $1;`

	// Querying database
	_, err := initializeDB.Conn.Exec(context.Background(), sqlStatement, token)
	if err != nil {
		fmt.Println(err)
	}
}

func ChangePassword(w http.ResponseWriter, r *http.Request) {

	// Creating instance of password struct
	P := &Password{}

	// Decogin JSON data into instance of password
	err := json.NewDecoder(r.Body).Decode(P)
	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	// Spliting Token string because front-end is sending whole pathname
	// "changepassword/dAke21ma-dDma..." instead of just the token.
	// Therefore, a split is nesecessary in order to retrieve only token
	// from URL.
	str := strings.Split(P.Token, "/")
	P.Token = str[2]

	// Cheking if token exists.
	email := CheckToken(P.Token)

	// Hashing password to bytea
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(P.Password), 8)
	if err != nil {
		fmt.Println(err)
		return
	}

	// Creating an update query in database
	sqlStatement := `UPDATE users SET password_hash = $1 WHERE email = $2`

	// Querying database and sending response back to front-end
	// if anything goes wrong
	_, err = initializeDB.Conn.Exec(context.Background(), sqlStatement, hashedPassword, email)
	if err != nil {
		response := JsonResponse{
			Message: "There was an error on the process. Please, try again or request a new password change.",
			IsValid: false,
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	// If it reaches here, everything is okay, sends back a success to the front end via a response
	response := JsonResponse{
		Message: "Success!",
		IsValid: true,
	}

	// Delete token since process is done.
	DeleteTokenRow(P.Token)

	// Send response back with sucessful validation.
	json.NewEncoder(w).Encode(response)

}
