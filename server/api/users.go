package api

import (
	"context"
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/gofrs/uuid"
	"studynook.go"

	"studynook.go/util"
)

// ErrorResponse is a error message
type ErrorResponse struct {
	Message string `json:"message"`
	IsValid bool   `json:"isValid"`
}

// UserCreateHandler handles: POST /admin/users
func (c *Controller) UserCreateHandler(w http.ResponseWriter, r *http.Request) {

	user := &studynook.User{}

	err := json.NewDecoder(r.Body).Decode(user)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	id, err := uuid.NewV4()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := &ErrorResponse{
			Message: "Internal server error!",
			IsValid: false,
		}
		json.NewEncoder(w).Encode(response)
		return

	}
	user.ID = id.String()

	token, err := uuid.NewV4()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := &ErrorResponse{
			Message: "Internal server error!",
			IsValid: false,
		}
		json.NewEncoder(w).Encode(response)
		return
	}
	user.Token = token.String()

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

	if !user.PasswordConfirmation() {
		w.WriteHeader(http.StatusBadRequest)
		response := &ErrorResponse{
			Message: "Entered passwords are not same.",
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

	if err = c.DB.AddUser(context.Background(), user); err != nil {
		response := &ErrorResponse{
			Message: "Your username or email has already been used!",
			IsValid: false,
		}
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(response)
		return
	}

	// If it reaches here, everything is okay, sends back the created user without the password and hashed password
	user.Password = "" // Set to empty string so JSON encoder can suppress the output of this field
	user.ConfirmPassword = ""
	json.NewEncoder(w).Encode(user)

}

// UserGetAllHandler handles: GET /admin/users
func (c *Controller) UserGetAllHandler(w http.ResponseWriter, r *http.Request) {

	userList, err := c.DB.GetAllUsers(context.Background())
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := &ErrorResponse{
			Message: "Internal server error",
			IsValid: false,
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	// If it reaches here, everything is okay, sends back a list of users as JSON payload
	json.NewEncoder(w).Encode(userList)

}

// UserGetHandler handles: GET /admin/users/123
func (c *Controller) UserGetHandler(w http.ResponseWriter, r *http.Request) {
	userID := chi.URLParam(r, "userID")

	user, err := c.DB.GetUserByID(context.Background(), userID)
	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		response := &ErrorResponse{
			Message: "User not found.",
			IsValid: false,
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	// If it reaches here, everything is okay, sends back user as JSON payload
	json.NewEncoder(w).Encode(user)

}

// UserUpdateHandler handles: PUT /admin/users/123
func (c *Controller) UserUpdateHandler(w http.ResponseWriter, r *http.Request) {
	userID := chi.URLParam(r, "userID")
	userData := &studynook.User{}

	err := json.NewDecoder(r.Body).Decode(userData)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := &ErrorResponse{
			Message: "Bad request!",
			IsValid: false,
		}
		json.NewEncoder(w).Encode(response)
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

	if !userData.PasswordConfirmation() {
		w.WriteHeader(http.StatusBadRequest)
		response := &ErrorResponse{
			Message: "Entered passwords are not same.",
			IsValid: false,
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	hashedPassword, err := util.Hash(userData.Password)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := &ErrorResponse{
			Message: "Internal server error!",
			IsValid: false,
		}
		json.NewEncoder(w).Encode(response)
		return
	}
	userData.PasswordHash = hashedPassword

	err = c.DB.UpdateUser(context.Background(), userID, userData)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := &ErrorResponse{
			Message: "Your username or email has already been used!",
			IsValid: false,
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	// If it reaches here, everything is okay, sends back the created user without the password and hashed password
	userData.Password = "" // Set to empty string so JSON encoder can suppress the output of this field
	userData.ConfirmPassword = ""
	json.NewEncoder(w).Encode(userData)

}

// UserDeleteHandler handles: DELETE /admin/users/123
func (c *Controller) UserDeleteHandler(w http.ResponseWriter, r *http.Request) {
	userID := chi.URLParam(r, "userID")

	err := c.DB.DeleteUser(context.Background(), userID)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := &ErrorResponse{
			Message: "Internal server error!",
			IsValid: false,
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	// If it reaches here, everything is okay
	response := &ErrorResponse{
		Message: "Successful deletion!",
		IsValid: true,
	}
	json.NewEncoder(w).Encode(response)

}

// UserUpdateExceptPasswordHandler updates user details except password
func (c *Controller) UserUpdateExceptPasswordHandler(w http.ResponseWriter, r *http.Request) {
	userID := chi.URLParam(r, "userID")
	userData := &studynook.User{}

	err := json.NewDecoder(r.Body).Decode(userData)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := &ErrorResponse{
			Message: "Bad request!",
			IsValid: false,
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	err = userData.ValidateIgnorePassword()
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := &ErrorResponse{
			Message: err.Error(),
			IsValid: false,
		}
		json.NewEncoder(w).Encode(response)
		return

	}

	err = c.DB.UpdateUserExceptPassword(context.Background(), userID, userData)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := &ErrorResponse{
			Message: "Your username or email has already been used!",
			IsValid: false,
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	// If it reaches here, everything is okay, sends back the created user without the password and hashed password
	userData.Password = "" // Set to empty string so JSON encoder can suppress the output of this field
	userData.ConfirmPassword = ""
	json.NewEncoder(w).Encode(userData)

}
