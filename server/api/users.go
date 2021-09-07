package api

import (
	"context"
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"
	"studynook.go/db"
	"studynook.go/schema"
	"studynook.go/util"
)

//creating a struct for the JSON response message
type JsonResponse struct {
	Message string `json:"message"`
	IsValid bool   `json:"isValid"`
}

// UserContext middleware extracts the userID URL paramater
// Checks if validity of userID exists and is valid, and goes on to add it to the request context
func UserContext(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		userID := chi.URLParam(r, "userID")
		if userID == "" {
			w.WriteHeader(http.StatusBadRequest)
			return
		}
		id, err := strconv.Atoi(userID)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			return
		}
		ctx := context.WithValue(r.Context(), "userID", id)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

//CreateUser handles: POST /admin/users
func CreateUser(w http.ResponseWriter, r *http.Request) {

	user := &schema.User{}

	//decoding JSON payload
	err := json.NewDecoder(r.Body).Decode(user)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	//validate JSON payload
	err = user.Validate()
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := JsonResponse{
			Message: err.Error(),
			IsValid: false,
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	//hash the password
	hashedPassword, err := util.Hash(user.Password)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	user.Password = hashedPassword

	//database operation to insert the user
	if err = db.AddUser(*user); err != nil {
		response := JsonResponse{
			Message: "Your username or email has already been used!",
			IsValid: false,
		}
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(response)
		return
	}

	//if it reaches here, everything is okay, sends back a success to the front end via a response
	response := JsonResponse{
		Message: "Success!",
		IsValid: true,
	}
	json.NewEncoder(w).Encode(response)

}

//GetAllUsers handles: GET /admin/users
func GetAllUsers(w http.ResponseWriter, r *http.Request) {

	//database operation to get all the users
	userList, err := db.GetAllUsers()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	//if it reaches here, everything is okay, sends back a list of users as JSON payload
	json.NewEncoder(w).Encode(userList)

}

//GetUser handles: GET /admin/users/123
func GetUser(w http.ResponseWriter, r *http.Request) {
	userID := r.Context().Value("userID").(int)

	//database operation to get a user by the ID
	user, err := db.GetUserByID(userID)
	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		return
	}

	//if it reaches here, everything is okay, sends back user as JSON payload
	json.NewEncoder(w).Encode(user)

}

//UpdateUser handles: PUT /admin/users/123
func UpdateUser(w http.ResponseWriter, r *http.Request) {
	userID := r.Context().Value("userID").(int)

	userData := &schema.User{}

	//decoding JSON payload
	err := json.NewDecoder(r.Body).Decode(userData)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	//validate JSON payload
	err = userData.Validate()
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := JsonResponse{
			Message: err.Error(),
			IsValid: false,
		}
		json.NewEncoder(w).Encode(response)
		return

	}

	//hash the password
	hashedPassword, err := util.Hash(userData.Password)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	userData.Password = hashedPassword

	//database operation to update the user with given ID
	err = db.UpdateUser(userID, *userData)
	if err != nil {
		response := JsonResponse{
			Message: "Your username or email has already been used!",
			IsValid: false,
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	//if it reaches here, everything is okay, sends back a success to the front end via a response
	response := JsonResponse{
		Message: "Success!",
		IsValid: true,
	}
	json.NewEncoder(w).Encode(response)

}

//DeleteUser handles: DELETE /admin/users/123
func DeleteUser(w http.ResponseWriter, r *http.Request) {
	userID := r.Context().Value("userID").(int)

	//database delete operation
	err := db.DeleteUser(userID)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	//if it reaches here, everything is okay, sends back a success to the front end via a response
	response := JsonResponse{
		Message: "Success!",
		IsValid: true,
	}
	json.NewEncoder(w).Encode(response)

}
