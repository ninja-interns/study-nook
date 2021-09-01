package emails

import (
	"bytes"
	"fmt"
	"html/template"
	"net/smtp"
)

//Emailer struct that will hold the SMTP configs
type Emailer struct {
	FromAddress       string
	FromEmailPassword string
	SmtpServer        string
	SmtpPort          string
}

//declaring the variable that will hold the new constructed Emailer- will be used in main.go to hold the environmental variables
var EmailConfigs *Emailer

//function that will return the Emailer struct with the parameters passed to it
func NewEmailer(fromParam, passwordParam, serverParam, portParam string) (*Emailer, error) {
	var err error

	return &Emailer{
		FromAddress:       fromParam,
		FromEmailPassword: passwordParam,
		SmtpServer:        serverParam,
		SmtpPort:          portParam,
	}, err
}

//Function to parse the html template so it can be sent via the email body- it also will enter the variable data into the file
func ParseTemplate(file string, data interface{}) (string, error) {
	t, err := template.ParseFiles(file)
	if err != nil {
		fmt.Println(err)
		return "", err
	}

	buff := new(bytes.Buffer)
	err = t.Execute(buff, data)
	if err != nil {
		fmt.Println(err)
		return "", err
	}

	return buff.String(), nil
}

//Send Email- made it reusable so that both recover password and verify email can use it.
func SendEmail(emailStr string, subjectStr string, file string, data interface{}) {
	//calling the parsing function to parse a specific file
	body, err := ParseTemplate(file, data)
	if err != nil {
		return
	}

	//necessary when sending HTML in an email
	mime := "MIME-version: 1.0;\nContent-Type: text/html; charset=\"UTF-8\";\n\n"

	//necessary to be able to send the email
	address := EmailConfigs.SmtpServer + ":" + EmailConfigs.SmtpPort
	auth := smtp.PlainAuth("", EmailConfigs.FromAddress, EmailConfigs.FromEmailPassword, EmailConfigs.SmtpServer)
	//Filling our email with variable content
	to := []string{emailStr}
	subject := "Subject:" + subjectStr + "\n"
	message := []byte(subject + mime + body)

	//sending the email
	err = smtp.SendMail(address, auth, EmailConfigs.FromAddress, to, message)
	if err != nil {
		fmt.Println(err)
		return
	}
}

//FOR USE IN DEVELOPMENT ONLY- set our mail to this instead to just print
func DEVSendEmail(emailStr string, subjectStr string, file string, data interface{}) {
	body, err := ParseTemplate(file, data)
	if err != nil {
		fmt.Println(err)
		return
	}

	mime := "MIME-version: 1.0;\nContent-Type: text/html; charset=\"UTF-8\";\n\n"
	address := EmailConfigs.SmtpServer + ":" + EmailConfigs.SmtpPort
	auth := smtp.PlainAuth("", EmailConfigs.FromAddress, EmailConfigs.FromEmailPassword, EmailConfigs.SmtpServer)

	to := []string{emailStr}
	subject := "Subject:" + subjectStr + "\n"
	message := []byte(subject + mime + body)

	//printing
	fmt.Println("address: ", address, "\n auth: ", auth, "\n to: ", to, "\n subject: ", subjectStr, "\n message: ", message)

}
