package auth

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"golang.org/x/crypto/bcrypt"
	"studynook.go/emails"
	initializeDB "studynook.go/initializedb"

	"github.com/alexedwards/scs/pgxstore"
	"github.com/alexedwards/scs/v2"
	"github.com/go-chi/chi/v5"
	"github.com/gofrs/uuid"
)

/***********************************************************/
/* Creating token function
/***********************************************************/

//Create token that can be added to users table, both recover password and verify email will use it.
func CreateToken() (string, error) {
	token, err := uuid.NewV4()
	if err != nil {
		return "", err
	}
	return token.String(), nil
}

/***********************************************************/
/* Creating user functions
/***********************************************************/

type User struct {
	Email     string `json:"email"`
	Name      string `json:"name"`
	Username  string `json:"username"`
	Password  string `json:"password"`
	IsVerfied string `json:"isVerified"`
	Token     string `json:"token"`
}

//creating a struct for the JSON response message
type JsonResponse struct {
	Message    string `json:"message"`
	IsValid    bool   `json:"isValid"`
	IsVerified bool   `json:"isVerified"`
}

//will hit when the API from main.go is invoked
func CreateUser(w http.ResponseWriter, r *http.Request) {
	u := &User{}
	err := json.NewDecoder(r.Body).Decode(u)
	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	//checking password length at the backend as well as the frontend
	passwordLength := len(u.Password)
	if passwordLength < 6 {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	//one way hashing to create password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(u.Password), 8)
	if err != nil {
		fmt.Println(err)
		return
	}

	//creating a token to send to the database- in sendEmail.go. This is the token that will be compared to the user's entered code to verify their email
	token, err := CreateToken()
	if err != nil {
		fmt.Println(err)
		return
	}

	//creating an insert in our database
	sqlStatement := `
	INSERT INTO users (email, password_hash, name, username, is_verified, token)
	VALUES ($1, $2, $3, $4, $5, $6)`

	//actually inserting a record into the DB, if we get a duplicate error, it will write to the frontend what error it is
	_, err = initializeDB.Conn.Exec(context.Background(), sqlStatement, u.Email, hashedPassword, u.Name, u.Username, false, token)
	if err != nil {
		response := JsonResponse{
			Message: "Your username or email has already been used!",
			IsValid: false,
		}
		fmt.Println(err)
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

/***********************************************************/
/* Fuinction to get user data based in ID
/***********************************************************/

func GetUserById(id int) (*User, error) {
	sqlStatement := `SELECT email, name, username FROM users WHERE id = $1`
	result := &User{}
	err := initializeDB.Conn.QueryRow(context.Background(), sqlStatement, id).Scan(&result.Email, &result.Name, &result.Username)
	if err != nil {
		return nil, err
	}
	return result, nil
}

/***********************************************************/
/* Login user
/***********************************************************/

//will hit when the API from main.go is invoked
func LoginUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	//creating an instance of User struct (defined in createUser.go) to be used to decode our request info into
	u := &User{}
	//initializing variables w/o any value to scan in from our database
	var id int
	var email string
	var name string
	var username string
	var password_hash []byte
	var isVerified bool

	//decoding the request body into the instanced User(u)
	err := json.NewDecoder(r.Body).Decode(u)
	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	//Querying our database where our email column = the email the user input on the frontend
	sqlStatement := `
	SELECT id, email, password_hash, name, username, is_verified FROM users WHERE email = $1 OR username = $2`

	//scanning the id, email and password from the DB into the created variables above
	err = initializeDB.Conn.QueryRow(context.Background(), sqlStatement, u.Email, u.Username).Scan(&id, &email, &password_hash, &name, &username, &isVerified)
	if err != nil {
		response := JsonResponse{
			Message:    "Your username or password is incorrect.",
			IsValid:    false,
			IsVerified: isVerified,
		}
		json.NewEncoder(w).Encode(response)
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Println(err)
		return
	}

	//comparing the password from the DB and from the users input. If theres an error, it writes a response body to send to the front end.
	err = bcrypt.CompareHashAndPassword([]byte(password_hash), []byte(u.Password))
	if err != nil {
		fmt.Println(err)
		response := JsonResponse{
			Message:    "Your username or password is incorrect.",
			IsValid:    false,
			IsVerified: isVerified,
		}
		w.WriteHeader(http.StatusBadRequest)
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

	login := JsonResponse{
		Message:    "Success!",
		IsValid:    true,
		IsVerified: isVerified,
	}
	json.NewEncoder(w).Encode(login)
	fmt.Println("FINISHED", email, password_hash)
}

/***********************************************************/
/* Logout user
/***********************************************************/

func LogoutUser(w http.ResponseWriter, r *http.Request) {
	err := SessionManager.Destroy(r.Context())
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	logout := JsonResponse{
		Message: "Successfully logged out!",
		IsValid: true,
	}
	json.NewEncoder(w).Encode(logout)
}

/***********************************************************/
/* Session Management functions
/***********************************************************/

var SessionManager *scs.SessionManager

func SessionsConfig() {
	SessionManager = scs.New()
	SessionManager.Store = pgxstore.New(initializeDB.Conn)
	SessionManager.Lifetime = 1000000 * time.Hour
	SessionManager.Cookie.Persist = true
	SessionManager.Cookie.HttpOnly = false
}

/***********************************************************/
/* Email verification for registration
/***********************************************************/

func VerifyEmail(w http.ResponseWriter, r *http.Request) {
	var name string

	//getting the URL parameter from the GET request and setting it in qCode
	qCode := chi.URLParam(r, "code")

	//querying my database for the code- if a row doesn't come back, queryRow will throw an error.
	sqlStatement := `
	SELECT name FROM users WHERE token = $1`

	err := initializeDB.Conn.QueryRow(context.Background(), sqlStatement, qCode).Scan(&name)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Println(err)
		response := JsonResponse{
			Message: "Couldn't find your account, please double check your code",
			IsValid: false,
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	//if a row does come back, this query will run that will update the user's is_verified column to true.
	sqlStatement = `
	UPDATE users SET is_verified = true WHERE token = $1`

	_, err = initializeDB.Conn.Exec(context.Background(), sqlStatement, qCode)
	if err != nil {
		fmt.Println(err)
		response := JsonResponse{
			Message: "Oops, something went wrong. Please try again.",
			IsValid: false,
		}
		json.NewEncoder(w).Encode(response)
		http.Error(w, err.Error(), http.StatusInternalServerError)

		return
	}

	//if it's all successful, this response will be written back.
	response := JsonResponse{
		Message: "Success, your email is verified.",
		IsValid: true,
	}
	json.NewEncoder(w).Encode(response)
}
