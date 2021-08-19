package auth

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/smtp"

	initializeDB "main.go/initializedb"
)

type Email struct {
	Email string `json: string`
}

const (
	fromAddress       = "guiminhaaus@gmail.com"
	fromEmailPassword = "zxbrieqvrmpesyur"
	smtpServer        = "smtp.gmail.com"
	smptPort          = "587"
)

func SendEmail(toAddress []string) {

	message := "Hey, you are trying to receover your password? Here, I will give you a hand"

	auth := smtp.PlainAuth("", fromAddress, fromEmailPassword, smtpServer)
	err := smtp.SendMail(smtpServer+":"+smptPort, auth, fromAddress, toAddress, []byte(message))

	if err != nil {
		fmt.Println(err)
	}

	fmt.Println("Email sent!")

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
		SendEmail(to)
	}

}
