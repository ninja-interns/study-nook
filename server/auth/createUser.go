package auth

import (
	"encoding/json"
	"fmt"
	"net/http"

	"golang.org/x/crypto/bcrypt"
	initializeDB "main.go/initializedb"
)

type User struct {
	Username string `json:"username"`
	Password string `json:"password"`
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
	sqlStatement := `
	INSERT INTO users (username, password)
	VALUES ($1, $2)`

	_, err = initializeDB.Db.Exec(sqlStatement, u.Username, hashedPassword)
	if err != nil {
		fmt.Println(err)
	}
}
