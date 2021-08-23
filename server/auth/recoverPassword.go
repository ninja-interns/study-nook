package auth

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/smtp"

	"github.com/gofrs/uuid"
	initializeDB "main.go/initializedb"
)

type Email struct {
	Email string `json: string`
}

const (
	fromAddress       = "studynookapp@gmail.com"
	fromEmailPassword = "nytnatsvdffkrprm"
	smtpServer        = "smtp.gmail.com"
	smptPort          = "587"
)

func SendEmail(toAddress []string, token uuid.UUID) {

	subject := "Subject: Recover password\n"
	mime := "MIME-version: 1.0;\nContent-Type: text/html; charset=\"UTF-8\";\n\n"
	body := "<html><p>Hey user. Wanting to recover password, here is the link.</p><a href='http://localhost:3000/changePassword/" + token.String() + "'> Link.</a></html>"

	message := []byte(subject + mime + body)

	auth := smtp.PlainAuth("", fromAddress, fromEmailPassword, smtpServer)
	err := smtp.SendMail(smtpServer+":"+smptPort, auth, fromAddress, toAddress, message)

	if err != nil {
		fmt.Println(err)
	}

	fmt.Println("Email sent!")

}

func CreateVerificationToken(email string) uuid.UUID {

	token, err := uuid.NewV4()
	if err != nil {
		fmt.Println(err)
	}

	//Querying our database where our email column = the email the user input on the frontend
	sqlStatement := `SELECT email FROM email_token WHERE email = $1`

	row := ""

	//scanning the id, email and password from the DB into the created variables above
	err = initializeDB.Db.QueryRow(sqlStatement, email).Scan(&row)
	if err != nil {
		fmt.Println(err)
	}

	if row == "" {
		fmt.Println("Inserting to database right now!")

		query := `INSERT INTO email_token (email, token) VALUES ($1, $2);`

		initializeDB.Db.QueryRow(query, email, token)

	} else {
		query := `UPDATE email_token SET token = $1 WHERE email = $2;`

		initializeDB.Db.QueryRow(query, token, email)
	}
	return token
}

func CheckEmail(w http.ResponseWriter, r *http.Request) {

	email := &Email{}

	fmt.Println("Checking for email!")

	err := json.NewDecoder(r.Body).Decode(email)
	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	//Querying our database where our email column = the email the user input on the frontend
	sqlStatement := `
	SELECT email FROM users WHERE email = $1`

	row := ""

	//scanning the id, email and password from the DB into the created variables above
	err = initializeDB.Db.QueryRow(sqlStatement, email.Email).Scan(&row)
	if err != nil {
		fmt.Println(err)
	}

	fmt.Println("This is email: " + email.Email)

	var to = []string{
		email.Email,
	}

	if row == "" {
		return
	} else {
		token := CreateVerificationToken(email.Email)
		SendEmail(to, token)
	}

}
