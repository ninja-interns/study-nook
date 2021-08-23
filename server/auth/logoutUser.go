package auth

import (
	"encoding/json"
	"fmt"
	"net/http"
)

func LogoutUser(w http.ResponseWriter, r *http.Request) {
	err := SessionManager.Destroy(r.Context())
	if err != nil {
		fmt.Println(err)
	}

	logout := JsonResponse{
		Message: "Successfully logged out!",
		IsValid: true,
	}
	json.NewEncoder(w).Encode(logout)
}