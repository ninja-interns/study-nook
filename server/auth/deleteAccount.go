package auth

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"

	"golang.org/x/crypto/bcrypt"
	initializeDB "studynook.go/initializedb"
)

type CurrentPassword struct {
	CurrentPassword string `json:"currentPassword"`
}

func DeleteAccount(w http.ResponseWriter, r *http.Request, u *User) {
	id := SessionManager.GetString(r.Context(), "id")
	c := &CurrentPassword{}
	var dbPassword []byte

	err := json.NewDecoder(r.Body).Decode(c)
	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	//Querying our database where our email column = the email the user input on the frontend
	sqlStatement := `
	SELECT password_hash FROM users WHERE id = $1`

	//scanning the id, email and password from the DB into the created variables above
	err = initializeDB.Conn.QueryRow(context.Background(), sqlStatement, u.ID).Scan(&dbPassword)
	if err != nil {
		response := JsonResponse{
			Message:    "Please try again.",
			IsValid:    false,
			IsVerified: u.IsVerfied,
		}
		json.NewEncoder(w).Encode(response)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	//comparing the password from the DB and from the users input. If theres an error, it writes a response body to send to the front end.
	err = bcrypt.CompareHashAndPassword(dbPassword, []byte(c.CurrentPassword))
	if err != nil {
		fmt.Println(err)
		response := JsonResponse{
			Message:    "Your password is incorrect.",
			IsValid:    false,
			IsVerified: u.IsVerfied,
		}
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(response)
		return
	}

	sqlStatement = `DELETE FROM users WHERE id = $1`
	_, err = initializeDB.Conn.Exec(context.Background(), sqlStatement, id)
	if err != nil {
		fmt.Println(err)
		return
	}

	err = SessionManager.Destroy(r.Context())
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	response := JsonResponse{
		Message: "Successfully deleted Account",
		IsValid: true,
	}
	json.NewEncoder(w).Encode(response)
}
