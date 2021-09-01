package schema

import (
	validation "github.com/go-ozzo/ozzo-validation"
	"github.com/go-ozzo/ozzo-validation/is"
)

type User struct {
	ID       int    `json:"id"`
	Email    string `json:"email"`
	Name     string `json:"name"`
	Username string `json:"username"`
	Password string `json:"password"`
}

//JSON payload validation logic
func (u User) Validate() error {
	return validation.ValidateStruct(&u,
		// Email cannot be empty and should be in a valid email format.
		validation.Field(&u.Email, validation.Required, is.Email),
		// Name cannot be empty, and the length must be between 5 and 20.
		validation.Field(&u.Name, validation.Required, validation.Length(5, 20)),
		// Username cannot be empty, and should be either "Female" or "Male".
		validation.Field(&u.Username, validation.Required),
		// Validate Address using its own validation rules
		validation.Field(&u.Password, validation.Required),
	)
}



