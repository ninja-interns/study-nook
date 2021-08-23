package auth

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type Password struct {
	Password string `json: string`
	Token    string `json: string`
}

func ChangePassword(w http.ResponseWriter, r *http.Request) {

	fmt.Println("You are changin passwords!")
	P := &Password{}
	err := json.NewDecoder(r.Body).Decode(P)
	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	fmt.Println("This is password: " + P.Password)
	fmt.Println("This is token: " + P.Token)

	//one way hashing to create password
	/*hashedPassword, err := bcrypt.GenerateFromPassword([]byte(P.Password), 8)
	if err != nil {
		fmt.Println(err)
		return
	}*/

	/*//creating an update query in our database
	sqlStatement := `
	UPDATE email_token SET password_hash = $1 WHERE email = $2`

	//actually inserting a record into the DB, if we get a duplicate error, it will write to the frontend what error it is
	_, err = initializeDB.Db.Exec(sqlStatement, hashedPassword)
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
	response := JsonResponse{
		Message: "Success!",
		IsValid: true,
	}
	json.NewEncoder(w).Encode(response)*/

}
