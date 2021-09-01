package auth

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"

	initializeDB "main.go/initializedb"
)

func DeleteAccount(w http.ResponseWriter, r *http.Request, u *User) {
	id := SessionManager.GetInt(r.Context(), "id")

	sqlStatement := `DELETE FROM users WHERE id = $1`
	_, err := initializeDB.Conn.Exec(context.Background(), sqlStatement, id)
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
