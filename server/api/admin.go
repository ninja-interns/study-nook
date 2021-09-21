package api

import (
	"context"
	"encoding/json"
	"net/http"

	"golang.org/x/crypto/bcrypt"
	"studynook.go/auth"
	"studynook.go/db"
	"studynook.go/schema"
)

// AdminLoginHandler verifies the admin login details
func AdminLoginHandler(w http.ResponseWriter, r *http.Request) {
	admin := &schema.Admin{}
	err := json.NewDecoder(r.Body).Decode(admin)
	if err != nil {
		w.WriteHeader(http.StatusUnprocessableEntity)
		response := &ErrorResponse{
			Message: "Invalid JSON provided!",
			IsValid: false,
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	err = admin.ValidateExceptID()
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := &ErrorResponse{
			Message: err.Error(),
			IsValid: false,
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	password := admin.Password

	admin, err = db.GetAdminByEmail(context.Background(), admin.Email)

	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := &ErrorResponse{
			Message: "Your email or password is incorrect.",
			IsValid: false,
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	// Verifying the password
	err = bcrypt.CompareHashAndPassword((admin.PasswordHash), []byte(password))
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := ErrorResponse{
			Message: "Your username or password is incorrect.",
			IsValid: false,
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	// Successful login
	// Creating variables in the session
	auth.SessionManager.Put(r.Context(), "id", admin.ID)
	auth.SessionManager.Put(r.Context(), "email", admin.Email)

	w.WriteHeader(http.StatusOK)
	response := ErrorResponse{
		Message: "Success!",
		IsValid: true,
	}
	json.NewEncoder(w).Encode(response)

}
