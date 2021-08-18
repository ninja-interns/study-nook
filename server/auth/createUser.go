package auth

import (
	"encoding/json"
	"fmt"
	"net/http"

	"golang.org/x/crypto/bcrypt"
	initializeDB "main.go/initializedb"
)

type User struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type LoginAttempt struct {
	Message string `json:"message"`
	IsValid bool   `json:"isValid"`
}

func CreateUser(w http.ResponseWriter, r *http.Request) {
	fmt.Println("HIT")
	u := &User{}
	err := json.NewDecoder(r.Body).Decode(u)
	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(u.Password), 8)
	if err != nil {
		fmt.Println(err)
		return
	}

	fmt.Println("created user", hashedPassword)
	sqlStatement := `
	INSERT INTO users (email, password)
	VALUES ($1, $2)`

	_, err = initializeDB.Db.Exec(sqlStatement, u.Email, hashedPassword)
	if err != nil {
		fmt.Println(err)
	}
}
