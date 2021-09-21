package schema

import (
	validation "github.com/go-ozzo/ozzo-validation"
	"github.com/go-ozzo/ozzo-validation/is"
)

// Admin model
type Admin struct {
	ID           string `json:"id"`
	Email        string `json:"email"`
	Password     string `json:"password"`
	PasswordHash []byte `json:"-"` // Skip PasswordHash JSON encode
}

// Validate function validates the Admin JSON payload
func (a Admin) Validate() error {
	return validation.ValidateStruct(&a,
		// ID cannot be empity.
		validation.Field(&a.ID, validation.Required),
		// Email cannot be empty and should be in a valid email format.
		validation.Field(&a.Email, validation.Required, is.Email),
		// Password cannot be empty.
		validation.Field(&a.Password, validation.Required),
	)
}

// ValidateExceptID validates the Admin JSON payload except ID
func (a Admin) ValidateExceptID() error {
	return validation.ValidateStruct(&a,
		// Email cannot be empty and should be in a valid email format.
		validation.Field(&a.Email, validation.Required, is.Email),
		// Password cannot be empty.
		validation.Field(&a.Password, validation.Required),
	)
}
