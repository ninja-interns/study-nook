package api

import (
	"context"
	"encoding/json"
	"net/http"

	"golang.org/x/crypto/bcrypt"
	"studynook.go"
)

// AdminLoginHandler verifies the admin login details
func (c *Controller) AdminLoginHandler(w http.ResponseWriter, r *http.Request) {
	admin := &studynook.Admin{}
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

	admin, err = c.DB.GetAdminByEmail(context.Background(), admin.Email)

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

	// Renew the token to avoid session fixation attacks
	if err = c.Sessions.RenewToken(r.Context()); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Creating variables in the session
	c.Sessions.Put(r.Context(), "id", admin.ID)
	c.Sessions.Put(r.Context(), "email", admin.Email)

	w.WriteHeader(http.StatusOK)
	response := ErrorResponse{
		Message: "Success!",
		IsValid: true,
	}
	json.NewEncoder(w).Encode(response)

}

// AdminLogoutHandler logouts the admin
func (c *Controller) AdminLogoutHandler(w http.ResponseWriter, r *http.Request) {
	err := c.Sessions.Destroy(r.Context())
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	response := &ErrorResponse{
		Message: "Successfully logged out!",
		IsValid: true,
	}
	json.NewEncoder(w).Encode(response)
}
