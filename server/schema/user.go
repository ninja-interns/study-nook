package schema

import (
	validation "github.com/go-ozzo/ozzo-validation"
	"github.com/go-ozzo/ozzo-validation/is"
)

// User model
type User struct {
	ID              string `json:"id"`
	Email           string `json:"email"`
	Password        string `json:"password,omitempty"` // To tell the JSON encoder to suppress the output of this field when the field is set to the zero value
	Name            string `json:"name"`
	Username        string `json:"username"`
	IsVerified      bool   `json:"isVerified"`
	Token           string `json:"token"`
	PasswordHash    []byte `json:"-"`                         // Skip PasswordHash JSON encode
	ConfirmPassword string `json:"confirmPassword,omitempty"` // To tell the JSON encoder to suppress the output of this field when the field is set to the zero value
}

// Validate function validates the JSON payload
func (u User) Validate() error {
	return validation.ValidateStruct(&u,
		// ID cannot be empity.
		validation.Field(&u.ID, validation.Required),
		// Email cannot be empty and should be in a valid email format.
		validation.Field(&u.Email, validation.Required, is.Email),
		// Password cannot be empty.
		validation.Field(&u.Password, validation.Required),
		// Name cannot be empty.
		validation.Field(&u.Name, validation.Required),
		// Username cannot be empty.
		validation.Field(&u.Username, validation.Required),
		// IsVerified cannot be empty.
		validation.Field(&u.IsVerified, validation.Required),
		// ConfirmPassword cannot be empty.
		validation.Field(&u.ConfirmPassword, validation.Required),
	)
}

// ValidateIgnorePassword validates the JSON payload, ignores the password validation
func (u User) ValidateIgnorePassword() error {

	return validation.ValidateStruct(&u,
		// ID cannot be empity.
		validation.Field(&u.ID, validation.Required),
		// Email cannot be empty and should be in a valid email format.
		validation.Field(&u.Email, validation.Required, is.Email),
		// Name cannot be empty.
		validation.Field(&u.Name, validation.Required),
		// Username cannot be empty.
		validation.Field(&u.Username, validation.Required),
		// IsVerified cannot be empty.
		validation.Field(&u.IsVerified, validation.Required),
	)

}

// PasswordConfirmation confirms the password is same
func (u User) PasswordConfirmation() bool {
	if u.Password == u.ConfirmPassword {
		return true
	}
	return false
}
