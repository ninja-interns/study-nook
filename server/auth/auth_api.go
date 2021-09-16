package auth

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/alexedwards/scs/pgxstore"
	"github.com/alexedwards/scs/v2"
	"github.com/go-chi/chi/v5"
	"github.com/gofrs/uuid"
	initializedb "studynook.go/initializedb"

	"golang.org/x/crypto/bcrypt"
	"studynook.go/emails"
)

type User struct {
	ID        string `json:"id"`
	Email     string `json:"email"`
	Name      string `json:"name"`
	Username  string `json:"username"`
	Password  string `json:"password"`
	IsVerfied bool   `json:"isVerified"`
	Token     string `json:"token"`
}

//creating a struct for the JSON response message
type JsonResponse struct {
	Message    string `json:"message"`
	IsValid    bool   `json:"isValid"`
	IsVerified bool   `json:"isVerified"`
}

var SessionManager *scs.SessionManager

func SessionsConfig() {
	SessionManager = scs.New()
	SessionManager.Store = pgxstore.New(initializedb.Conn)
	SessionManager.Lifetime = 1000000 * time.Hour
	SessionManager.Cookie.Persist = true
	SessionManager.Cookie.HttpOnly = false
}

//Create token that can be added to users table, both recover password and verify email will use it.
func CreateToken() (string, error) {
	token, err := uuid.NewV4()
	if err != nil {
		return "", err
	}
	return token.String(), nil
}

func GetUserById(id string) (*User, error) {
	sqlStatement := `SELECT email, name, username FROM users WHERE id = $1`
	result := &User{}
	err := initializedb.Conn.QueryRow(context.Background(), sqlStatement, id).Scan(&result.Email, &result.Name, &result.Username)
	if err != nil {
		return nil, err
	}
	result.ID = id

	return result, nil
}

//will hit when the API from main.go is invoked
func CreateUser(w http.ResponseWriter, r *http.Request) {
	u := &User{}
	id, err := uuid.NewV4()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := JsonResponse{
			Message: "Something went wrong, please try again.",
			IsValid: false,
		}
		json.NewEncoder(w).Encode(response)
		return
	}
	u.ID = id.String()

	err = json.NewDecoder(r.Body).Decode(u)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := JsonResponse{
			Message: "Something went wrong, please try again.",
			IsValid: false,
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	//checking password length at the backend as well as the frontend
	passwordLength := len(u.Password)
	if passwordLength < 6 {
		response := JsonResponse{
			Message: "Your password must be at least 6 character long.",
			IsValid: false,
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	//one way hashing to create password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(u.Password), 8)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := JsonResponse{
			Message: "Something went wrong, please try again.",
			IsValid: false,
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	//creating a token to send to the database- in sendEmail.go. This is the token that will be compared to the user's entered code to verify their email
	token, err := CreateToken()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := JsonResponse{
			Message: "Something went wrong, please try again.",
			IsValid: false,
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	//creating an insert in our database
	sqlStatement := `
	INSERT INTO users (id, email, password_hash, name, username, is_verified, token)
	VALUES ($1, $2, $3, $4, $5, $6, $7)`

	//actually inserting a record into the DB, if we get a duplicate error, it will write to the frontend what error it is
	_, err = initializedb.Conn.Exec(context.Background(), sqlStatement, u.ID, u.Email, hashedPassword, u.Name, u.Username, false, token)
	if err != nil {
		fmt.Println(err)
		response := JsonResponse{
			Message: "Your username or email has already been used!",
			IsValid: false,
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	//if it reaches here, everything is okay, sends back a success to the front end via a response

	//PRODUCTION CODE
	// emails.SendEmail(u.Email, "Verify your email with StudyNook", "emails/emailTemplates/verifyEmail.html", map[string]string{"name": u.Name, "token": token})
	// response := JsonResponse{
	// 	Message: "Success, Please check your email to verify your account!",
	// 	IsValid: true,
	// }
	// json.NewEncoder(w).Encode(response)

	//DEVELOPMENT PRINT EMAIL
	emails.SendEmail(u.Email, "Verify your email with StudyNook", "emails/emailTemplates/verifyEmail.html", map[string]string{"name": u.Name, "token": token})
	response := JsonResponse{
		Message: "Success, Please check your email to verify your account!",
		IsValid: true,
	}
	json.NewEncoder(w).Encode(response)
}

//will hit when the API from main.go is invoked
func LoginUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	//creating an instance of User struct (defined in createUser.go) to be used to decode our request info into
	u := &User{}
	//initializing variables w/o any value to scan in from our database
	var id string
	var email string
	var name string
	var username string
	var password_hash []byte
	var isVerified bool

	//decoding the request body into the instanced User(u)
	err := json.NewDecoder(r.Body).Decode(u)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := JsonResponse{
			Message: "Something went wrong, please try again.",
			IsValid: false,
		}
		json.NewEncoder(w).Encode(response)
		return
	}
	//Querying our database where our email column = the email the user input on the frontend
	sqlStatement := `
	SELECT id, email, password_hash, name, username, is_verified FROM users WHERE email = $1 OR username = $2`

	//scanning the id, email and password from the DB into the created variables above
	err = initializedb.Conn.QueryRow(context.Background(), sqlStatement, u.Email, u.Username).Scan(&id, &email, &password_hash, &name, &username, &isVerified)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := JsonResponse{
			Message: "Your username or password is incorrect.",
			IsValid: false,
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	//comparing the password from the DB and from the users input. If theres an error, it writes a response body to send to the front end.
	err = bcrypt.CompareHashAndPassword([]byte(password_hash), []byte(u.Password))
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := JsonResponse{
			Message:    "Your username or password is incorrect.",
			IsValid:    false,
			IsVerified: isVerified,
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	if !isVerified {
		response := JsonResponse{
			Message:    "Please verify your email first.",
			IsValid:    false,
			IsVerified: isVerified,
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	//if it reaches this point, the login is successful and writes back a response body to the front end
	//creating variables in my session
	SessionManager.Put(r.Context(), "id", id)
	SessionManager.Put(r.Context(), "name", name)
	SessionManager.Put(r.Context(), "username", username)
	SessionManager.Put(r.Context(), "email", email)

	response := JsonResponse{
		Message:    "Success!",
		IsValid:    true,
		IsVerified: isVerified,
	}
	json.NewEncoder(w).Encode(response)
}

func VerifyEmail(w http.ResponseWriter, r *http.Request) {
	var name string

	//getting the URL parameter from the GET request and setting it in qCode
	qCode := chi.URLParam(r, "code")

	//querying my database for the code- if a row doesn't come back, queryRow will throw an error.
	sqlStatement := `
	SELECT name FROM users WHERE token = $1`

	err := initializedb.Conn.QueryRow(context.Background(), sqlStatement, qCode).Scan(&name)
	if err != nil {
		response := JsonResponse{
			Message: "Couldn't find your account, please double check your code.",
			IsValid: false,
		}
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(response)
		return
	}

	//if a row does come back, this query will run that will update the user's is_verified column to true.
	sqlStatement = `
	UPDATE users SET is_verified = true WHERE token = $1`

	_, err = initializedb.Conn.Exec(context.Background(), sqlStatement, qCode)
	if err != nil {
		response := JsonResponse{
			Message: "Something went wrong, please try again.",
			IsValid: false,
		}
		json.NewEncoder(w).Encode(response)
		w.WriteHeader(http.StatusInternalServerError)

		return
	}

	//if it's all successful, this response will be written back.
	response := JsonResponse{
		Message: "Success, your email is verified.",
		IsValid: true,
	}
	json.NewEncoder(w).Encode(response)
}

type CurrentPassword struct {
	CurrentPassword string `json:"currentPassword"`
}

func LogoutUser(w http.ResponseWriter, r *http.Request) {
	err := SessionManager.Destroy(r.Context())
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	response := JsonResponse{
		Message: "Successfully logged out!",
		IsValid: true,
	}
	json.NewEncoder(w).Encode(response)
}

func DeleteAccount(w http.ResponseWriter, r *http.Request, u *User) {
	id := SessionManager.GetString(r.Context(), "id")
	c := &CurrentPassword{}
	var dbPassword []byte

	err := json.NewDecoder(r.Body).Decode(c)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := JsonResponse{
			Message: "Something went wrong, please try again.",
			IsValid: false,
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	//Querying our database where our email column = the email the user input on the frontend
	sqlStatement := `
	SELECT password_hash FROM users WHERE id = $1`

	//scanning the id, email and password from the DB into the created variables above
	err = initializedb.Conn.QueryRow(context.Background(), sqlStatement, u.ID).Scan(&dbPassword)
	if err != nil {
		response := JsonResponse{
			Message:    "Something went wrong, please try again.",
			IsValid:    false,
			IsVerified: u.IsVerfied,
		}
		json.NewEncoder(w).Encode(response)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	//comparing the password from the DB and from the users input. If theres an error, it writes a response body to send to the front end.
	err = bcrypt.CompareHashAndPassword(dbPassword, []byte(c.CurrentPassword))
	if err != nil {
		fmt.Println(err)
		response := JsonResponse{
			Message:    "Your password is incorrect.",
			IsValid:    false,
			IsVerified: u.IsVerfied,
		}
		json.NewEncoder(w).Encode(response)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	sqlStatement = `DELETE FROM users WHERE id = $1`
	_, err = initializedb.Conn.Exec(context.Background(), sqlStatement, id)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := JsonResponse{
			Message: "Something went wrong, please try again.",
			IsValid: false,
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	err = SessionManager.Destroy(r.Context())
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := JsonResponse{
			Message: "Something went wrong, please try again.",
			IsValid: false,
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	response := JsonResponse{
		Message: "Successfully deleted Account",
		IsValid: true,
	}
	json.NewEncoder(w).Encode(response)
}

func UpdateUser(w http.ResponseWriter, r *http.Request, u *User) {
	p := &User{}
	j := &JsonResponse{}
	var dbPassword []byte
	err := json.NewDecoder(r.Body).Decode(p)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		j.IsValid = false
		j.Message = "Something went wrong, please try again"
		json.NewEncoder(w).Encode(j)
		return
	}

	if p.Email == u.Email && p.Name == u.Name && p.Username == u.Username {
		j.IsValid = false
		j.Message = "Oops, you haven't changed anything!"
		json.NewEncoder(w).Encode(j)
		return
	}

	sqlStatement := `SELECT password_hash FROM users WHERE id = $1`

	//scanning the id password from the DB into the created variables above
	err = initializedb.Conn.QueryRow(context.Background(), sqlStatement, u.ID).Scan(&dbPassword)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		j.IsValid = false
		j.Message = "Something went wrong, please try again"
		json.NewEncoder(w).Encode(j)
		return
	}

	//comparing the current password input against our password stored in the database
	err = bcrypt.CompareHashAndPassword(dbPassword, []byte(p.Password))
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		j.IsValid = false
		j.Message = "Your password does not match our records."
		json.NewEncoder(w).Encode(j)
		return
	}

	sqlStatement = `UPDATE users SET username = $2, name = $3 WHERE id = $1`

	//scanning the id password from the DB into the created variables above
	_, err = initializedb.Conn.Exec(context.Background(), sqlStatement, u.ID, p.Username, p.Name)
	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		j.IsValid = false
		j.Message = "The username has already been used."
		json.NewEncoder(w).Encode(j)
		return
	}

	response := JsonResponse{
		Message: "Success!",
		IsValid: true,
	}
	json.NewEncoder(w).Encode(response)
}

//this function will be used in update password and recover password. recover password will need a token check but that will be checked before this function runs
func generalUpdatePassword(id, currentPassword, newPass, newPassConfirmation string) (response JsonResponse, err error) {
	//declaring where our hashed password from the database will be scanned into
	var dbPassword []byte
	passwordLength := len(newPass)

	sqlStatement := `SELECT password_hash FROM users WHERE id = $1`

	//scanning the id password from the DB into the created variables above
	err = initializedb.Conn.QueryRow(context.Background(), sqlStatement, id).Scan(&dbPassword)
	if err != nil {
		response = JsonResponse{
			Message: "Something went wrong, please try again.",
			IsValid: false,
		}
		return response, err
	}

	//some more checking that the passwords match and follow our password requirements
	if newPass != newPassConfirmation || passwordLength < 6 {
		response = JsonResponse{
			Message: "New password and confirmation do not match",
			IsValid: false,
		}
		return response, err
	}

	//comparing the current password input against our password stored in the database
	err = bcrypt.CompareHashAndPassword(dbPassword, []byte(currentPassword))
	if err != nil {
		response := JsonResponse{
			Message: "Your current password does not match our records",
			IsValid: false,
		}
		return response, err
	}

	//generating a new hashed password if all those checks are ok
	newHashedPassword, err := bcrypt.GenerateFromPassword([]byte(newPass), 8)
	if err != nil {
		response := JsonResponse{
			Message: "Something went wrong, please try again.",
			IsValid: false,
		}
		return response, err
	}

	//updating our database to the new hashed password
	sqlStatement = `
	UPDATE users SET password_hash = $1 WHERE id = $2`
	_, err = initializedb.Conn.Exec(context.Background(), sqlStatement, newHashedPassword, id)
	if err != nil {
		response = JsonResponse{
			Message: "Something went wrong, please try again.",
			IsValid: false,
		}
		return response, err
	}

	response = JsonResponse{
		Message: "Success!",
		IsValid: true,
	}

	return response, nil
}

type updatePasswordJSON struct {
	CurrentPassword string `json:"currentPassword"`
	NewPassword     string `json:"newPassword"`
	Confirmation    string `json:"confirmation"`
}

func UpdatePassword(w http.ResponseWriter, r *http.Request, u *User) {
	p := &updatePasswordJSON{}

	err := json.NewDecoder(r.Body).Decode(p)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := JsonResponse{
			Message: "Something went wrong, please try again.",
			IsValid: false,
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	response, err := generalUpdatePassword(u.ID, p.CurrentPassword, p.NewPassword, p.Confirmation)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(response)
		return
	}
	json.NewEncoder(w).Encode(response)
}

func ForgotPassword(w http.ResponseWriter, r *http.Request) {
	u := &User{}
	var name string

	err := json.NewDecoder(r.Body).Decode(u)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := JsonResponse{
			Message: "Something went wrong, please try again.",
			IsValid: false,
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	//checking if the email exists within our database
	sqlStatement := `
	SELECT name FROM users WHERE email = $1`

	err = initializedb.Conn.QueryRow(context.Background(), sqlStatement, u.Email).Scan(&name)
	if err != nil {
		response := JsonResponse{
			Message: "We couldn't find your email.",
			IsValid: false,
		}
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(response)
		return
	}

	//creating a token
	token, err := CreateToken()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := JsonResponse{
			Message: "Something went wrong, please try again.",
			IsValid: false,
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	//if code reaches here, the email exists and we can set the token to the user
	sqlStatement = `
	UPDATE users SET token = $2 WHERE email = $1`

	_, err = initializedb.Conn.Exec(context.Background(), sqlStatement, u.Email, token)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := JsonResponse{
			Message: "Something went wrong, please try again.",
			IsValid: false,
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	//sending the email
	emails.SendEmail(u.Email, "Recover your StudyNook password", "emails/emailTemplates/recoverPassword.html", map[string]string{"name": name, "token": token})

	//if it's all successful, this response will be written back.
	response := JsonResponse{
		Message: "Sucess, please check your email.",
		IsValid: true,
	}
	json.NewEncoder(w).Encode(response)
}

type ResetPasswordStruct struct {
	Email        string `json:"email"`
	Token        string `json:"token"`
	Password     string `json:"password"`
	Confirmation string `json:"confirmation"`
}

func ResetPassword(w http.ResponseWriter, r *http.Request) {
	p := &ResetPasswordStruct{}
	var dbToken string

	err := json.NewDecoder(r.Body).Decode(p)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := JsonResponse{
			Message: "Something went wrong, please try again.",
			IsValid: false,
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	passwordLength := len(p.Password)
	if passwordLength < 6 {
		response := JsonResponse{
			Message: "Your password must be at least 6 character long.",
			IsValid: false,
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	//backend check if passwords match
	if p.Password != p.Confirmation {
		response := JsonResponse{
			Message: "Your passwords do not match.",
			IsValid: false,
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	//checking if the email exists within our database
	sqlStatement := `
	SELECT token FROM users WHERE email = $1`

	err = initializedb.Conn.QueryRow(context.Background(), sqlStatement, p.Email).Scan(&dbToken)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := JsonResponse{
			Message: "We couldn't find your email.",
			IsValid: false,
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	//checking if the token the user sent matches the token in our database
	if dbToken != p.Token {
		response := JsonResponse{
			Message: "Please double check your code and try again.",
			IsValid: false,
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	//if code reaches here, we can hash the password and enter it into our database
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(p.Password), 8)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := JsonResponse{
			Message: "Something went wrong, please try again.",
			IsValid: false,
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	//creating a token so that the same token cannot be used to reset the password again
	token, err := CreateToken()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := JsonResponse{
			Message: "Something went wrong, please try again.",
			IsValid: false,
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	sqlStatement = `
	UPDATE users SET password_hash = $2, token = $3 WHERE email = $1`

	_, err = initializedb.Conn.Exec(context.Background(), sqlStatement, p.Email, hashedPassword, token)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := JsonResponse{
			Message: "Something went wrong, please try again.",
			IsValid: false,
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	//if it's all successful, this response will be written back.
	response := JsonResponse{
		Message: "Sucess, your password has been changed",
		IsValid: true,
	}
	json.NewEncoder(w).Encode(response)
}
