package auth

import (
	"encoding/json"
	"fmt"
	"net/http"

	"golang.org/x/crypto/bcrypt"
	initializeDB "main.go/initializedb"
)

func LoginUser(w http.ResponseWriter, r *http.Request) {
	fmt.Println("HIT LOGIN")
	w.Header().Set("Content-Type", "application/json")

	u := &User{}

	var id int
	var email string
	var password string

	err := json.NewDecoder(r.Body).Decode(u)
	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	fmt.Println("login user")
	sqlStatement := `
	SELECT * FROM users WHERE email = $1`

	err = initializeDB.Db.QueryRow(sqlStatement, u.Email).Scan(&id, &email, &password)
	if err != nil {
		fmt.Println(err)
	}

	err = bcrypt.CompareHashAndPassword([]byte(password), []byte(u.Password))
	if err != nil {
		fmt.Println(err)
		login := LoginAttempt{
			Message: "Your username or password is incorrect",
			IsValid: false,
		}
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(login)
		return
	}
	login := LoginAttempt{
		Message: "Success!",
		IsValid: true,
	}
	json.NewEncoder(w).Encode(login)
	fmt.Println(email, password)
}
