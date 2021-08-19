package auth

import (
	"encoding/json"
	"fmt"
	"net/http"

	"golang.org/x/crypto/bcrypt"
	initializeDB "main.go/initializedb"
)

//will hit when the API from main.go is invoked
func LoginUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	//creating an instance of User struct (defined in createUser.go) to be used to decode our request info into
	u := &User{}

	//initializing variables w/o any value to scan in from our database
	var id int
	var email string
	var name string
	var username string
	var password_hash string

	//decoding the request body into the instanced User(u)
	err := json.NewDecoder(r.Body).Decode(u)
	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	//Querying our database where our email column = the email the user input on the frontend
	sqlStatement := `
	SELECT * FROM users WHERE email = $1 OR username = $2`

	//scanning the id, email and password from the DB into the created variables above
	err = initializeDB.Db.QueryRow(sqlStatement, u.Email, u.Username).Scan(&id, &email, &password_hash, &name, &username)
	if err != nil {
		fmt.Println(err)
	}

	//comparing the password from the DB and from the users input. If theres an error, it writes a response body to send to the front end.
	err = bcrypt.CompareHashAndPassword([]byte(password_hash), []byte(u.Password))
	if err != nil {
		fmt.Println(err)
		response := JsonResponse{
			Message: "Your username or password is incorrect",
			IsValid: false,
		}
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(response)
		return
	}

	//if it reaches this point, the login is suuccessful and writes back a response body to the front end
	login := JsonResponse{
		Message: "Success!",
		IsValid: true,
	}
	json.NewEncoder(w).Encode(login)
	fmt.Println(email, password_hash)
}
