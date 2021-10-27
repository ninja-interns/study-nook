package emails

import (
	"bytes"
	"fmt"
	"html/template"
	"net/smtp"
)

//Production Email struct that will hold all of the SMTP configs
type Email struct {
	Username string
	Password string
	Server   string
	Port     string
}

//Dev Email struct that only hold the username
type DevEmail struct {
	Username string
}

//this interface defined the necessary methods a struct needs to have in order to satisfy the Emailer type. This means that both Email and DevEmail are of type Emailer as they both have a method of SendEmail() defined (below). This is how we are able to set our emailer in our server/cmd main.go file with the boolean flags. Check out the Send() function below that will take in this variable Emailer and use it to execute different functions.
type Emailer interface {
	SendEmail(emailStr string, subjectStr string, file string, data interface{}) error
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
func (e *Email) SendEmail(emailStr string, subjectStr string, file string, data interface{}) error {
	//calling the parsing function to parse a specific file
	body, err := ParseTemplate(file, data)
	if err != nil {
		fmt.Println("parse", err)
		return err
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
		fmt.Println("smtp", err, address, auth, e.Username, to, message)
		return err
	}
	return nil
}

func (e *DevEmail) SendEmail(emailStr string, subjectStr string, file string, data interface{}) error {
	fmt.Println("App is in development mode. If you would like to actually send an email, restart this server like this: $ go run main.go serve -b true" + "\nto: " + emailStr + "\nfrom: " + e.Username + "\nsubject: " + subjectStr + "\nfile: " + file)
	return nil
}

//This function takes in the emailer that we set in our server/cmd main.go and executes the specified SendEmail function that will either actually send off the emailer or just print it out for dev purposes. Check out server/api reports.go > emails.Send() to see how it will be used
func Send(e Emailer, emailStr string, subjectStr string, file string, data interface{}) error {
	err := e.SendEmail(emailStr, subjectStr, file, data)
	if err != nil {
		fmt.Println("Send email", err)
		return err
	}
	return nil
}
