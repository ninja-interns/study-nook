package auth

import (
	"encoding/json"
	"net/http"
)

func LogoutUser(w http.ResponseWriter, r *http.Request) {
	err := SessionManager.Destroy(r.Context())
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	logout := JsonResponse{
		Message: "Successfully logged out!",
		IsValid: true,
	}
	json.NewEncoder(w).Encode(logout)
}
