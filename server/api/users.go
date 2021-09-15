package api

import (
	"context"
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/gofrs/uuid"
	"studynook.go/db"
	"studynook.go/schema"
	"studynook.go/util"
)

// ErrorResponse is a error message
type ErrorResponse struct {
	Message string `json:"message"`
	IsValid bool   `json:"isValid"`
}

// UserCreateHandler handles: POST /admin/users
func UserCreateHandler(w http.ResponseWriter, r *http.Request) {

	user := &schema.User{}

	err := json.NewDecoder(r.Body).Decode(user)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	id, err := uuid.NewV4()
	user.ID = id.String()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := &ErrorResponse{
			Message: "Internal server error!",
			IsValid: false,
		}
		json.NewEncoder(w).Encode(response)
		return

	}

	token, err := uuid.NewV4()
	user.Token = token.String()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := &ErrorResponse{
			Message: "Internal server error!",
			IsValid: false,
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	user.IsVerified = true

	err = user.Validate()
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := &ErrorResponse{
			Message: err.Error(),
			IsValid: false,
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	user.PasswordHash, err = util.Hash(user.Password)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	if err = db.AddUser(context.Background(), user); err != nil {
		response := &ErrorResponse{
			Message: "Your username or email has already been used!",
			IsValid: false,
		}
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(response)
		return
	}

	// If it reaches here, everything is okay, sends back the created user without the password and hashed password
	user.Password = "" // Password set to empty string so JSON encoder can suppress the output of this field
	json.NewEncoder(w).Encode(user)

}

// UserGetAllHandler handles: GET /admin/users
func UserGetAllHandler(w http.ResponseWriter, r *http.Request) {

	userList, err := db.GetAllUsers(context.Background())
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	// If it reaches here, everything is okay, sends back a list of users as JSON payload
	json.NewEncoder(w).Encode(userList)

}

// UserGetHandler handles: GET /admin/users/123
func UserGetHandler(w http.ResponseWriter, r *http.Request) {
	userID := chi.URLParam(r, "userID")

	user, err := db.GetUserByID(context.Background(), userID)
	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		return
	}

	// If it reaches here, everything is okay, sends back user as JSON payload
	json.NewEncoder(w).Encode(user)

}

// UserUpdateHandler handles: PUT /admin/users/123
func UserUpdateHandler(w http.ResponseWriter, r *http.Request) {
	userID := chi.URLParam(r, "userID")
	userData := &schema.User{}

	err := json.NewDecoder(r.Body).Decode(userData)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	err = userData.Validate()
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := &ErrorResponse{
			Message: err.Error(),
			IsValid: false,
		}
		json.NewEncoder(w).Encode(response)
		return

	}

	hashedPassword, err := util.Hash(userData.Password)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	userData.PasswordHash = hashedPassword

	err = db.UpdateUser(context.Background(), userID, userData)
	if err != nil {
		response := &ErrorResponse{
			Message: "Your username or email has already been used!",
			IsValid: false,
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	// If it reaches here, everything is okay, sends back the created user without the password and hashed password
	userData.Password = "" // Password set to empty string so JSON encoder can suppress the output of this field
	json.NewEncoder(w).Encode(userData)

}

// UserDeleteHandler handles: DELETE /admin/users/123
func UserDeleteHandler(w http.ResponseWriter, r *http.Request) {
	userID := chi.URLParam(r, "userID")

	err := db.DeleteUser(context.Background(), userID)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	// If it reaches here, everything is okay
	w.WriteHeader(http.StatusNoContent)

}
