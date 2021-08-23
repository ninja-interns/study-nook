package auth

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/smtp"

	"github.com/gofrs/uuid"
	initializeDB "main.go/initializedb"
)

// Struct to store data in json format fetched from front-end
type Email struct {
	Email string `json: string`
}

// Variables needed to make a SMTP request
const (
	fromAddress       = "studynookapp@gmail.com"
	fromEmailPassword = "nytnatsvdffkrprm"
	smtpServer        = "smtp.gmail.com"
	smptPort          = "587"
)

// Funcion where email sent from address to user
func SendEmail(toAddress []string, token uuid.UUID) {

	// Subject, mime and body are components of a SMTP message
	subject := "Subject: Recover password\n"
	mime := "MIME-version: 1.0;\nContent-Type: text/html; charset=\"UTF-8\";\n\n"
	body := "<html><p>Hey user. Wanting to recover password, here is the link.</p><a href='http://localhost:3000/changePassword/" + token.String() + "'> Link.</a></html>"

	message := []byte(subject + mime + body)

	// Sending email to user
	auth := smtp.PlainAuth("", fromAddress, fromEmailPassword, smtpServer)
	err := smtp.SendMail(smtpServer+":"+smptPort, auth, fromAddress, toAddress, message)

	// Checking if email was sent
	if err != nil {
		fmt.Println(err)
		return
	}

	fmt.Println("Email sent!")
}

// Function that creates token and stores it along with email and timestamp on the database
func CreateVerificationToken(email string) uuid.UUID {

	// Generating token using UUID function
	token, err := uuid.NewV4()
	if err != nil {
		fmt.Println(err)
	}

	// Creatiung query to database to check if email already exists in
	// "email_token" table
	sqlStatement := `SELECT email FROM email_token WHERE email = $1`

	row := ""

	// Querying database and storing any resultant rows in variable
	err = initializeDB.Db.QueryRow(sqlStatement, email).Scan(&row)
	if err != nil {
		fmt.Println(err)
	}

	// Conditional statement to check if email actually exists or not
	// If it doesn't exist, a new row will be created inserting email and token
	// Else, if it does exist, then it means that the user is requesting a new
	// recovery token, therefore, only the token will updated making the old
	// token invalid.
	if row == "" {
		query := `INSERT INTO email_token (email, token) VALUES ($1, $2);`
		initializeDB.Db.QueryRow(query, email, token)
	} else {
		query := `UPDATE email_token SET token = $1 WHERE email = $2;`
		initializeDB.Db.QueryRow(query, token, email)
	}

	return token
}

// Function to check if email is
func CheckEmail(w http.ResponseWriter, r *http.Request) {

	// Creating instance of struct
	email := &Email{}

	// Decoding json data sent from front-end into instance of password struct
	err := json.NewDecoder(r.Body).Decode(email)
	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	// Creating query to database to check if email exists in table "users"
	sqlStatement := `SELECT email FROM users WHERE email = $1`

	row := ""

	// Querying to database
	err = initializeDB.Db.QueryRow(sqlStatement, email.Email).Scan(&row)
	if err != nil {
		fmt.Println(err)
	}

	var to = []string{
		email.Email,
	}

	// Condinitional statement to check if email actually is in table
	// If it is not, it will just return back.
	// Else, if it is, then it will call function to send email and
	// generate token and email.
	if row == "" {
		return
	} else {
		token := CreateVerificationToken(email.Email)
		SendEmail(to, token)
	}

}
