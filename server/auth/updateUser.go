package auth

import (
	"encoding/json"
	"fmt"
	"net/http"
)

func UpdateUser(w http.ResponseWriter, r *http.Request, u *User) {
	err := json.NewDecoder(r.Body).Decode(u)
	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
}
