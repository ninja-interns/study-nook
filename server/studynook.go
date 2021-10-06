package studynook

import (
	"time"

	validation "github.com/go-ozzo/ozzo-validation"
	"github.com/go-ozzo/ozzo-validation/is"
)

//run your `go run main.go` in server/cmd
//here will hold the global structs that will need to be used across the application

//User struct
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

/**
* * TODO LIST STRUCT
**/
type Todo struct {
	ID          string `json:"id"`
	UserId      string `json:"userId"`
	Text        string `json:"todoText"`
	IsCompleted bool   `json:"isCompleted"`
}

/**
* * TIMER STRUCT
**/
type Timer struct {
	TimerDuration time.Duration `json:"timerDuration"`
	FinishTime    time.Time     `json:"finishTime"`
	TimeLeft      time.Duration `json:"timeLeft"`
	IsCompleted    bool         `json:"isCompleted"`
}
