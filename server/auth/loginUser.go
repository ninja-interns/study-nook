package auth

import (
	"encoding/json"
	"fmt"
	"net/http"

	"golang.org/x/crypto/bcrypt"
	initializeDB "main.go/initializedb"
)

type CurrentUser struct {
	Name     string `json:"name"`
	Username string `json:"username"`
	Email    string `json:"email"`
}

type jsonLoginResponse struct {
	Message     string      `json:"message"`
	IsValid     bool        `json:"isValid"`
	CurrentUser CurrentUser `json:"currentUser"`
}

//will hit when the API from main.go is invoked
func LoginUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	//creating an instance of User struct (defined in createUser.go) to be used to decode our request info into
	u := &User{}
	currentU := &CurrentUser{}
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

	currentU.Name = name
	currentU.Email = email
	currentU.Username = username

	//comparing the password from the DB and from the users input. If theres an error, it writes a response body to send to the front end.
	err = bcrypt.CompareHashAndPassword([]byte(password_hash), []byte(u.Password))
	if err != nil {
		fmt.Println(err)
		response := JsonResponse{
			Message: "Your password is incorrect.",
			IsValid: false,
		}
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(response)
		return
	}

	//if it reaches this point, the login is successful and writes back a response body to the front end
	SessionManager.Put(r.Context(), "id", id)
	SessionManager.Put(r.Context(), "name", name)
	SessionManager.Put(r.Context(), "username", username)
	SessionManager.Put(r.Context(), "email", email)
	login := jsonLoginResponse{
		Message:     "Success!",
		IsValid:     true,
		CurrentUser: *currentU,
	}
	json.NewEncoder(w).Encode(login)
	fmt.Println(email, password_hash)
}
