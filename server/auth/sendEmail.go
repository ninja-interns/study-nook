package auth

import (
	"bytes"
	"fmt"
	"html/template"
	"net/smtp"
)

// Variables needed to make a SMTP request
const (
	fromAddress       = "studynookapp@gmail.com"
	fromEmailPassword = "nytnatsvdffkrprm"
	smtpServer        = "smtp.gmail.com"
	smtpPort          = "587"
)

type templateVariables struct {
	Email string `json: "email"`
	Name  string `json: "name"`
	Token string `json: "token"`
}

//Send Email- make it reusable so that both recover password and verify email can use it.

func SendEmail(emailStr string, subjectStr string, bodyStr string) {
	mime := "MIME-version: 1.0;\nContent-Type: text/html; charset=\"UTF-8\";\n\n"
	toEmail := emailStr
	address := smtpServer + ":" + smtpPort
	to := []string{toEmail}
	subject := "Subject:" + subjectStr + "\n"
	body := bodyStr
	message := []byte(subject + mime + body)
	auth := smtp.PlainAuth("", fromAddress, fromEmailPassword, smtpServer)

	err := smtp.SendMail(address, auth, fromAddress, to, message)
	if err != nil {
		fmt.Println(err)
	}
}

//I also need to parse my HTML file here so that it can be sent via email

func ParseTemplate(file string) {

	t, err := template.ParseFiles(file)
	if err != nil {
		fmt.Println(err)
	}

	buff := new(bytes.Buffer)

	t.Execute(buff)
}

//Create token that can be added to users table, both recover password and verify email will use it.
