package auth

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"

	"golang.org/x/crypto/bcrypt"
	initializeDB "studynook.go/initializedb"
)

func UpdateUser(w http.ResponseWriter, r *http.Request, u *User) {
	p := &User{}
	j := &JsonResponse{}
	var dbPassword []byte
	err := json.NewDecoder(r.Body).Decode(p)
	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		j.IsValid = false
		j.Message = "Something went wrong, please try again"
		json.NewEncoder(w).Encode(j)
		return
	}

	if p.Email == u.Email && p.Name == u.Name && p.Username == u.Username {
		j.IsValid = false
		j.Message = "Oops, you haven't changed anything!"
		json.NewEncoder(w).Encode(j)
		return
	}

	sqlStatement := `SELECT password_hash FROM users WHERE id = $1`

	//scanning the id password from the DB into the created variables above
	err = initializeDB.Conn.QueryRow(context.Background(), sqlStatement, u.ID).Scan(&dbPassword)
	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		j.IsValid = false
		j.Message = "Something went wrong, please try again"
		json.NewEncoder(w).Encode(j)
		return
	}

	//comparing the current password input against our password stored in the database
	err = bcrypt.CompareHashAndPassword(dbPassword, []byte(p.Password))
	if err != nil {
		fmt.Println("HASHPASSWORD ERROR", err)
		j.IsValid = false
		j.Message = "Your password does not match our records."
		json.NewEncoder(w).Encode(j)
		return
	}

	sqlStatement = `UPDATE users SET username = $2, name = $3 WHERE id = $1`

	//scanning the id password from the DB into the created variables above
	_, err = initializeDB.Conn.Exec(context.Background(), sqlStatement, u.ID, p.Username, p.Name)
	if err != nil {
		fmt.Println("Update Error", err)
		w.WriteHeader(http.StatusBadRequest)
		j.IsValid = false
		j.Message = "Something went wrong, please try again"
		json.NewEncoder(w).Encode(j)
		return
	}

	response := JsonResponse{
		Message: "Success!",
		IsValid: true,
	}
	json.NewEncoder(w).Encode(response)
}
