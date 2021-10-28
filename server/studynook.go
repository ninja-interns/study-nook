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

// Validate function validates the User struct unmarshalled from the request payload
func (u User) Validate() error {
	return validation.Errors{
		"Name":             validation.Validate(u.Name, validation.Required),
		"Username":         validation.Validate(u.Username, validation.Required),
		"Email":            validation.Validate(u.Email, validation.Required, is.Email),
		"Password":         validation.Validate(u.Password, validation.Required),
		"Confirm password": validation.Validate(u.ConfirmPassword, validation.Required),
	}.Filter()
}

// ValidateIgnorePassword validates the JSON payload, ignores the password validation
func (u User) ValidateIgnorePassword() error {
	return validation.Errors{
		"Name":     validation.Validate(u.Name, validation.Required),
		"Username": validation.Validate(u.Username, validation.Required),
		"Email":    validation.Validate(u.Email, validation.Required, is.Email),
	}.Filter()
}

// Admin struct
type Admin struct {
	ID              string `json:"id"`
	Name            string `json:"name"`
	Email           string `json:"email"`
	AdminType       string `json:"adminType"` // "admin" or "superadmin"
	Password        string `json:"password,omitempty"`
	ConfirmPassword string `json:"confirmPassword,omitempty"`
	PasswordHash    []byte `json:"-"`
}

// Validate function validates the Admin JSON payload
func (a Admin) Validate() error {
	return validation.Errors{
		"Name":             validation.Validate(a.Name, validation.Required),
		"Email":            validation.Validate(a.Email, validation.Required, is.Email),
		"Admin Type":       validation.Validate(a.AdminType, validation.Required),
		"Password":         validation.Validate(a.Password, validation.Required),
		"Confirm password": validation.Validate(a.ConfirmPassword, validation.Required),
	}.Filter()
}

// ValidateIgnorePassword validates Admin struct ignoring the passwords field
func (a Admin) ValidateIgnorePassword() error {
	return validation.Errors{
		"Name":       validation.Validate(a.Name, validation.Required),
		"Email":      validation.Validate(a.Email, validation.Required, is.Email),
		"Admin Type": validation.Validate(a.AdminType, validation.Required),
	}.Filter()
}

// ValidateIgnoreNameAndType validates admin struct ignoring the name and type field
func (a Admin) ValidateIgnoreNameAndType() error {
	return validation.Errors{
		"Email":    validation.Validate(a.Email, validation.Required, is.Email),
		"Password": validation.Validate(a.Password, validation.Required),
	}.Filter()
}

/**
* * TODO LIST STRUCT
**/
type Todo struct {
	ID          string `json:"id"`
	UserId      string `json:"userId"`
	Text        string `json:"todoText"`
	IsCompleted bool   `json:"isCompleted"`
	Title       string `json:"todoTitle"`
}

/**
* * TIMER STRUCT
**/
type Timer struct {
	TimerDuration time.Duration `json:"timerDuration"`
	FinishTime    time.Time     `json:"finishTime"`
	TimeLeft      time.Duration `json:"timeLeft"`
	IsCompleted   bool          `json:"isCompleted"`
}
