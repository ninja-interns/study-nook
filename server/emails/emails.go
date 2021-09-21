package emails

import (
	"bytes"
	"fmt"
	"html/template"
	"net/smtp"
)

//Emailer struct that will hold the SMTP configs
type Emailer struct {
	Username string
	Password string
	Server   string
	Port     string
}

//function that will return the Emailer struct with the parameters passed to it
func New(username, password, server, port string) (*Emailer, error) {

	return &Emailer{
		Username: username,
		Password: password,
		Server:   server,
		Port:     port,
	}, nil
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
func (e *Emailer) SendEmail(emailStr string, subjectStr string, file string, data interface{}) {
	//calling the parsing function to parse a specific file
	body, err := ParseTemplate(file, data)
	if err != nil {
		return
	}

	//necessary when sending HTML in an email
	mime := "MIME-version: 1.0;\nContent-Type: text/html; charset=\"UTF-8\";\n\n"

	//necessary to be able to send the email
	address := e.Server + ":" + e.Port
	auth := smtp.PlainAuth("", e.Username, e.Password, e.Server)
	//Filling our email with variable content
	to := []string{emailStr}
	subject := "Subject:" + subjectStr + "\n"
	message := []byte(subject + mime + body)

	//sending the email
	err = smtp.SendMail(address, auth, e.Username, to, message)
	if err != nil {
		return
	}
}
