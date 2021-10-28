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

// AdminLoginHandler hnadles admin login
func (c *Controller) AdminLoginHandler(w http.ResponseWriter, r *http.Request) {
	a := &studynook.Admin{}
	err := decodeJSONBody(w, r, a)
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

	err = a.ValidateIgnoreNameAndType()
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	password := a.Password
	a, err = c.DB.GetAdminByEmail(context.Background(), a.Email)

	if err != nil {
		http.Error(w, "Your email or password is incorrect", http.StatusUnauthorized)
		return
	}

	err = bcrypt.CompareHashAndPassword((a.PasswordHash), []byte(password))
	if err != nil {
		http.Error(w, "Your email or password is incorrect", http.StatusUnauthorized)
		return
	}

	// Successful login

	// Renew the token to avoid session fixation attacks
	if err = c.Sessions.RenewToken(r.Context()); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	c.Sessions.Put(r.Context(), "id", a.ID)
	c.Sessions.Put(r.Context(), "email", a.Email)
	c.Sessions.Put(r.Context(), "type", a.AdminType)

	w.Write([]byte("Successful login"))
	return

}

// AdminLogoutHandler handles admin logout
func (c *Controller) AdminLogoutHandler(w http.ResponseWriter, r *http.Request) {
	err := c.Sessions.Destroy(r.Context())
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.Write([]byte("Successful logout"))
	return
}

// AdminCreateHandler handles: POST /a/admins
func (c *Controller) AdminCreateHandler(w http.ResponseWriter, r *http.Request) {

	a := &studynook.Admin{}

	err := decodeJSONBody(w, r, a)
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

	err = a.Validate()
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if a.Password != a.ConfirmPassword {
		http.Error(w, "Entered passwords are not same", http.StatusBadRequest)
		return
	}

	hashPass, err := bcrypt.GenerateFromPassword([]byte(a.Password), 14)
	if err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}
	a.PasswordHash = hashPass

	id, err := uuid.NewV4()
	if err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}
	a.ID = id.String()

	if err = c.DB.AddAdmin(context.Background(), a); err != nil {
		http.Error(w, "Your email has already been used", http.StatusBadRequest)
		return
	}

	a.Password = ""
	a.ConfirmPassword = ""

	j, err := json.Marshal(a)
	if err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	w.Write(j)
	return

}

// AdminGetAllHandler handles: GET /a/admins
func (c *Controller) AdminGetAllHandler(w http.ResponseWriter, r *http.Request) {

	admins, err := c.DB.GetAllAdmins(context.Background())
	if err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}
	j, err := json.Marshal(admins)
	if err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(j)
	return

}

// AdminGetHandler handles: GET /a/admins/123
func (c *Controller) AdminGetHandler(w http.ResponseWriter, r *http.Request) {

	id := chi.URLParam(r, "id")
	a, err := c.DB.GetAdminByID(context.Background(), id)
	if err != nil {
		if err == pgx.ErrNoRows {
			http.Error(w, http.StatusText(http.StatusNotFound), http.StatusNotFound)
			return
		}
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}
	j, err := json.Marshal(a)
	if err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(j)
	return

}

// AdminUpdateHandler handles: PUT /a/admins/123
func (c *Controller) AdminUpdateHandler(w http.ResponseWriter, r *http.Request) {

	id := chi.URLParam(r, "id")
	a := &studynook.Admin{}

	err := decodeJSONBody(w, r, a)
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

	err = a.Validate()
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if a.Password != a.ConfirmPassword {
		http.Error(w, "Entered passwords are not same", http.StatusBadRequest)
		return
	}

	hashPass, err := bcrypt.GenerateFromPassword([]byte(a.Password), 14)
	if err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}
	a.PasswordHash = hashPass

	err = c.DB.UpdateAdmin(context.Background(), id, a)
	if err != nil {
		if err.Error() == http.StatusText(http.StatusNotFound) {
			http.Error(w, http.StatusText(http.StatusNotFound), http.StatusNotFound)
			return
		}
		http.Error(w, "Your email has already been used", http.StatusBadRequest)
		return
	}

	a.Password = ""
	a.ConfirmPassword = ""

	j, err := json.Marshal(a)
	if err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(j)
	return

}

// AdminDeleteHandler handles: DELETE /a/admins/123
func (c *Controller) AdminDeleteHandler(w http.ResponseWriter, r *http.Request) {

	id := chi.URLParam(r, "id")

	err := c.DB.DeleteAdminByID(context.Background(), id)
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

// AdminUpdateExceptPasswordHandler updates a details except password
// Handles: PUT /a/admin_details_only/123"
func (c *Controller) AdminUpdateExceptPasswordHandler(w http.ResponseWriter, r *http.Request) {

	id := chi.URLParam(r, "id")
	a := &studynook.Admin{}

	err := decodeJSONBody(w, r, &a)
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

	err = a.ValidateIgnorePassword()
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	err = c.DB.UpdateAdminExceptPassword(context.Background(), id, a)
	if err != nil {
		if err.Error() == http.StatusText(http.StatusNotFound) {
			http.Error(w, http.StatusText(http.StatusNotFound), http.StatusNotFound)
			return
		}
		http.Error(w, "Your email has already been used", http.StatusBadRequest)
		return
	}

	a.Password = ""
	a.ConfirmPassword = ""

	j, err := json.Marshal(a)
	if err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(j)
	return

}
