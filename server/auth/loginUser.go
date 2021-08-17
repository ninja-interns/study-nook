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
	var exists bool

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
	sqlStatement := `
	SELECT * FROM users WHERE email = $1 AND password = $2`

	err = initializeDB.Db.QueryRow(sqlStatement, u.Email, hashedPassword).Scan()
	if err != nil {
		fmt.Println(err)
	}
}
