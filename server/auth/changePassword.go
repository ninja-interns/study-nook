package auth

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"

	"golang.org/x/crypto/bcrypt"
	initializeDB "main.go/initializedb"
)

type Password struct {
	Password string `json: string`
	Token    string `json: string`
}

func CheckToken(token string) string {
	//Querying our database where our email column = the email the user input on the frontend
	sqlStatement := `SELECT email FROM email_token WHERE token = $1`

	row := ""

	//scanning the id, email and password from the DB into the created variables above
	err := initializeDB.Db.QueryRow(sqlStatement, token).Scan(&row)
	if err != nil {
		fmt.Println(err)
	}

	fmt.Println("This is email: " + row)

	if row == "" {
		return ""
	} else {
		return row
	}

}

func DeleteTokenRow(token string) {

	//creating an update query in our database
	sqlStatement := `DELETE FROM email_token WHERE token = $1;`

	_, err := initializeDB.Db.Exec(sqlStatement, token)
	if err != nil {
		fmt.Println(err)
	}
}

func ChangePassword(w http.ResponseWriter, r *http.Request) {

	fmt.Println("You are changing passwords!")
	P := &Password{}
	err := json.NewDecoder(r.Body).Decode(P)
	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	str := strings.Split(P.Token, "/")
	P.Token = str[2]

	fmt.Println("This is password: " + P.Password)
	fmt.Println("This is token: " + str[2])

	email := CheckToken(P.Token)

	//one way hashing to create password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(P.Password), 8)
	if err != nil {
		fmt.Println(err)
		return
	}

	//creating an update query in our database
	sqlStatement := `UPDATE users SET password_hash = $1 WHERE email = $2`

	//actually inserting a record into the DB, if we get a duplicate error, it will write to the frontend what error it is
	_, err = initializeDB.Db.Exec(sqlStatement, hashedPassword, email)
	if err != nil {
		fmt.Println("Change password ", err)
		response := JsonResponse{
			Message: "There was an error on the process. Please, try again or request a new password change.",
			IsValid: false,
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	//if it reaches here, everything is okay, sends back a success to the front end via a response
	response := JsonResponse{
		Message: "Success!",
		IsValid: true,
	}
	DeleteTokenRow(P.Token)
	json.NewEncoder(w).Encode(response)

}
