package auth

import (
	"bytes"
	"fmt"
	"html/template"
	"net/smtp"

	"github.com/gofrs/uuid"
)

// Variables needed to make a SMTP request
const (
	fromAddress       = "studynookapp@gmail.com"
	fromEmailPassword = "nytnatsvdffkrprm"
	smtpServer        = "smtp.gmail.com"
	smtpPort          = "587"
)

//Create token that can be added to users table, both recover password and verify email will use it.
func CreateToken() string {
	token, err := uuid.NewV4()
	if err != nil {
		fmt.Println(err)
	}
	return token.String()
}

//Function to parse the html template so it can be sent via the email body- it also will enter the variable data into the file
func ParseTemplate(file string, data interface{}) string {
	t, err := template.ParseFiles(file)
	if err != nil {
		fmt.Println(err)
	}

	buff := new(bytes.Buffer)
	err = t.Execute(buff, data)
	if err != nil {
		fmt.Println(err)
	}

	return buff.String()
}

//Send Email- made it reusable so that both recover password and verify email can use it.
func SendEmail(emailStr string, subjectStr string, file string, data interface{}) {
	//calling the parsing function to parse a specific file
	body := ParseTemplate(file, data)
	//necessary when sending HTML in an email
	mime := "MIME-version: 1.0;\nContent-Type: text/html; charset=\"UTF-8\";\n\n"

	//necessary to be able to send the email
	address := smtpServer + ":" + smtpPort
	auth := smtp.PlainAuth("", fromAddress, fromEmailPassword, smtpServer)

	//Filling our email with variable content
	to := []string{emailStr}
	subject := "Subject:" + subjectStr + "\n"
	message := []byte(subject + mime + body)

	//sending the email
	err := smtp.SendMail(address, auth, fromAddress, to, message)
	if err != nil {
		fmt.Println(err)
	}
}
