package api

import (
	"context"
	"encoding/json"
	"errors"
	"log"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/gofrs/uuid"
	"github.com/jackc/pgx/v4"
	"golang.org/x/crypto/bcrypt"
	"studynook.go"
)

// UserCreateHandler handles: POST /admin/users
func (c *Controller) UserCreateHandler(w http.ResponseWriter, r *http.Request) {

	u := &studynook.User{}

	err := decodeJSONBody(w, r, u)
	if err != nil {
		var mr *malformedRequest
		if errors.As(err, &mr) {
			http.Error(w, mr.msg, mr.status)
			return
		}
		log.Println(err.Error())
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}

	err = u.Validate()
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if u.Password != u.ConfirmPassword {
		http.Error(w, "Entered passwords are not same", http.StatusBadRequest)
		return
	}

	hashPass, err := bcrypt.GenerateFromPassword([]byte(u.Password), 14)
	if err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}
	u.PasswordHash = hashPass

	id, err := uuid.NewV4()
	if err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}
	u.ID = id.String()

	token, err := uuid.NewV4()
	if err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}
	u.Token = token.String()

	u.IsVerified = true

	if err = c.DB.AddUser(context.Background(), u); err != nil {
		http.Error(w, "Your email has already been used", http.StatusBadRequest)
		return
	}

	u.Password = ""
	u.ConfirmPassword = ""

	j, err := json.Marshal(u)
	if err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	w.Write(j)
	return

}

// UserGetAllHandler handles: GET /admin/users
func (c *Controller) UserGetAllHandler(w http.ResponseWriter, r *http.Request) {

	users, err := c.DB.GetAllUsers(context.Background())
	if err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}
	j, err := json.Marshal(users)
	if err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(j)
	return

}

// UserGetHandler handles: GET /admin/users/123
func (c *Controller) UserGetHandler(w http.ResponseWriter, r *http.Request) {

	id := chi.URLParam(r, "id")
	user, err := c.DB.GetUserByID(context.Background(), id)
	if err != nil {
		if err == pgx.ErrNoRows {
			http.Error(w, http.StatusText(http.StatusNotFound), http.StatusNotFound)
			return
		}
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}
	j, err := json.Marshal(user)
	if err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(j)
	return

}

// UserUpdateHandler handles: PUT /admin/users/123
func (c *Controller) UserUpdateHandler(w http.ResponseWriter, r *http.Request) {

	id := chi.URLParam(r, "id")
	u := &studynook.User{}

	err := decodeJSONBody(w, r, u)
	if err != nil {
		var mr *malformedRequest
		if errors.As(err, &mr) {
			http.Error(w, mr.msg, mr.status)
			return
		}
		log.Println(err.Error())
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}

	err = u.Validate()
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if u.Password != u.ConfirmPassword {
		http.Error(w, "Entered passwords are not same", http.StatusBadRequest)
		return
	}

	hashPass, err := bcrypt.GenerateFromPassword([]byte(u.Password), 14)
	if err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}
	u.PasswordHash = hashPass

	err = c.DB.UpdateUser(context.Background(), id, u)
	if err != nil {
		if err.Error() == http.StatusText(http.StatusNotFound) {
			http.Error(w, http.StatusText(http.StatusNotFound), http.StatusNotFound)
			return
		}
		http.Error(w, "Your email has already been used", http.StatusBadRequest)
		return
	}

	u.Password = ""
	u.ConfirmPassword = ""

	j, err := json.Marshal(u)
	if err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(j)
	return

}

// UserDeleteHandler handles: DELETE /admin/users/123
func (c *Controller) UserDeleteHandler(w http.ResponseWriter, r *http.Request) {

	id := chi.URLParam(r, "id")

	err := c.DB.DeleteUserByID(context.Background(), id)
	if err != nil {
		if err.Error() == http.StatusText(http.StatusNotFound) {
			http.Error(w, http.StatusText(http.StatusNotFound), http.StatusNotFound)
			return
		}
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}
	w.Write([]byte("Successful delete"))
	return

}

// UserUpdateExceptPasswordHandler updates user details except password
// Handles: PUT /admin/user_details_only/123"
func (c *Controller) UserUpdateExceptPasswordHandler(w http.ResponseWriter, r *http.Request) {

	id := chi.URLParam(r, "id")
	u := &studynook.User{}

	err := decodeJSONBody(w, r, &u)
	if err != nil {
		var mr *malformedRequest
		if errors.As(err, &mr) {
			http.Error(w, mr.msg, mr.status)
			return
		}
		log.Println(err.Error())
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}

	err = u.ValidateIgnorePassword()
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	err = c.DB.UpdateUserExceptPassword(context.Background(), id, u)
	if err != nil {
		if err.Error() == http.StatusText(http.StatusNotFound) {
			http.Error(w, http.StatusText(http.StatusNotFound), http.StatusNotFound)
			return
		}
		http.Error(w, "Your email has already been used", http.StatusBadRequest)
		return
	}

	u.Password = ""
	u.ConfirmPassword = ""

	j, err := json.Marshal(u)
	if err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(j)
	return

}
