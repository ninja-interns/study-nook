package auth

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"

	"golang.org/x/crypto/bcrypt"
	initializeDB "studynook.go/initializedb"
)

//this function will be used in update password and recover password. recover password will need a token check but that will be checked before this function runs
func generalUpdatePassword(id, currentPassword, newPass, newPassConfirmation string) (response JsonResponse, err error) {
	//declaring where our hashed password from the database will be scanned into
	var dbPassword []byte
	passwordLength := len(newPass)

	sqlStatement := `SELECT password_hash FROM users WHERE id = $1`

	//scanning the id password from the DB into the created variables above
	err = initializeDB.Conn.QueryRow(context.Background(), sqlStatement, id).Scan(&dbPassword)
	if err != nil {
		response = JsonResponse{
			Message: "Bad request, please try again",
			IsValid: false,
		}
		return response, err
	}

	//some more checking that the passwords match and follow our password requirements
	if newPass != newPassConfirmation || passwordLength < 6 {
		response = JsonResponse{
			Message: "New password and confirmation do not match",
			IsValid: false,
		}
		return response, err
	}

	//comparing the current password input against our password stored in the database
	err = bcrypt.CompareHashAndPassword(dbPassword, []byte(currentPassword))
	if err != nil {
		response := JsonResponse{
			Message: "Your current password does not match our records",
			IsValid: false,
		}
		return response, err
	}

	//generating a new hashed password if all those checks are ok
	newHashedPassword, err := bcrypt.GenerateFromPassword([]byte(newPass), 8)
	if err != nil {
		response := JsonResponse{
			Message: "Bad request, please try again",
			IsValid: false,
		}
		return response, err
	}

	//updating our database to the new hashed password
	sqlStatement = `
	UPDATE users SET password_hash = $1 WHERE id = $2`
	_, err = initializeDB.Conn.Exec(context.Background(), sqlStatement, newHashedPassword, id)
	if err != nil {
		response = JsonResponse{
			Message: "Bad request, please try again",
			IsValid: false,
		}
		return response, err
	}

	response = JsonResponse{
		Message: "Success!",
		IsValid: true,
	}

	return response, nil
}

type updatePasswordJSON struct {
	CurrentPassword string `json:"currentPassword"`
	NewPassword     string `json:"newPassword"`
	Confirmation    string `json:"confirmation"`
}

func UpdatePassword(w http.ResponseWriter, r *http.Request, u *User) {
	p := &updatePasswordJSON{}

	err := json.NewDecoder(r.Body).Decode(p)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	response, err := generalUpdatePassword(u.ID, p.CurrentPassword, p.NewPassword, p.Confirmation)
	if err != nil {
		fmt.Println(response, err)
		json.NewEncoder(w).Encode(response)
		return
	}
	json.NewEncoder(w).Encode(response)
}