package authentication

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
)

type User struct {
	Username string `json: string`
	Password string `json: string`
	Email    string `json: string`
	Name     string `json: string`
}

func SignupHandler(w http.ResponseWriter, r *http.Request) {

	// Reading all body of POST method and storing to resposeData
	responseData, err := ioutil.ReadAll(r.Body)
	if err != nil {
		log.Fatal(err)
	}

	// Creating instance of User struct
	user := &User{}

	fmt.Println(string(responseData))

	// Unmarshalling JSON strings to user instance
	json.Unmarshal([]byte(responseData), user)

	fmt.Println("This is username: " + user.Username)
	fmt.Println("This is password: " + user.Password)
	fmt.Println("This is username: " + user.Email)
	fmt.Println("This is password: " + user.Password)

	// Checking if user is in database
	/*if UserExists(user.Username, user.Password) {
		fmt.Println("Login was successful!")
		flagCheck.Flag = "true"
	} else {
		fmt.Println("Login was not successful!")
		flagCheck.Flag = "false"
	}

	w.Header().Set("Conent-Type", "application/json")

	json.NewEncoder(w).Encode(flagCheck)*/
}
