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

//Send Email- make it reusable so that both recover password and verify email can use it.

func SendEmail(emailStr string, subjectStr string, file string, data interface{}) {
	parsedFile := ParseTemplate(file, data)
	body := parsedFile
	mime := "MIME-version: 1.0;\nContent-Type: text/html; charset=\"UTF-8\";\n\n"
	address := smtpServer + ":" + smtpPort
	to := []string{emailStr}
	subject := "Subject:" + subjectStr + "\n"
	message := []byte(subject + mime + body)
	auth := smtp.PlainAuth("", fromAddress, fromEmailPassword, smtpServer)

	err := smtp.SendMail(address, auth, fromAddress, to, message)
	if err != nil {
		fmt.Println(err)
	}
}

//I also need to parse my HTML file here so that it can be sent via email

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

//Create token that can be added to users table, both recover password and verify email will use it.

func CreateToken() string {
	token, err := uuid.NewV4()
	if err != nil {
		fmt.Println(err)
	}
	return token.String()
}
