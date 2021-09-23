package api

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"studynook.go"
	"studynook.go/emails"
<<<<<<< HEAD
=======
	"studynook.go/initializedb"
>>>>>>> c1ceaeff4e35582d7e05412fa1f111191be573cd
)

// Struct to store report data content
type Report struct {
	Username string `json:"username"`
	Date     string `json:"date"`
	Message  string `json:"message"`
}

func ErrorMessage(w http.ResponseWriter) {

	response := JsonResponse{
		Message: "There was an error with your submission. Please, try again later.",
		IsValid: false,
	}
	// Send response back
	json.NewEncoder(w).Encode(response)
}

// Handler to submit reports
func (c *Controller) SubmitReports(w http.ResponseWriter, r *http.Request, u *studynook.User) {

	// Creates instance of report struct and decode fatched data to it
	report := &Report{}
	err := json.NewDecoder(r.Body).Decode(report)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	// Check if user is allowed to submit report
	// Users are allowed to submit one report per day
	check := c.ValidateReport(report.Username)

	// Conditional statement to call functions depending
	// on check response
	if check {
		var submission_id string
		// Insert report into report table
		err := c.InsertToDB(report)
		if err != nil {
			ErrorMessage(w)
			return
		}

		// Get serial ID from report
		submission_id, err = c.GetReportID(report.Username)
		if err != nil {
			ErrorMessage(w)
			return
		}

		// Send email to Study Nook office gmail with report ID, username, date and report content
		// because we initialize the Emailer into our API Controller struct in our server/cmd, we have access to it via `c.Emailer`. this Emailer can either of struct type production Emails or DevEmails and will use the specified structs Send method to execute the function.
		err = emails.Send(*c.Emailer, "studynookapp@gmail.com", "Submission Report", "../emails/emailTemplates/reportSubmission.html", map[string]string{"id": submission_id, "username": report.Username, "message": report.Message, "date": report.Date})
		if err != nil {
			fmt.Println(err)
			return
		}
		response := JsonResponse{
			Message: "Success! Please, wait while the management team review your report. Thanks for your collaboration!",
			IsValid: true,
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	response := JsonResponse{
		Message: "Error, you cannot send more than one report a day. Please, try again tomorrow.",
		IsValid: false,
	}
	// Send response back
	json.NewEncoder(w).Encode(response)

}

// Func to get report ID based on latest submission ( 1 day interval)
// and username
func (c *Controller) GetReportID(username string) (string, error) {

	// Query to select ID
	sqlQuery := `SELECT submission_id from reports WHERE date_submission > NOW() - INTERVAL '1' day AND username = $1;`

	tempID := 0

	// Execution of query
<<<<<<< HEAD
	err := c.DB.Conn.QueryRow(context.Background(), sqlQuery, username).Scan(&tempID)
=======
	err := initializedb.Conn.QueryRow(context.Background(), sqlQuery, username).Scan(&tempID)
>>>>>>> c1ceaeff4e35582d7e05412fa1f111191be573cd
	if err != nil {
		return "", err
	}

	return strconv.Itoa(tempID), nil
}

// Func to insert report into table
func (c *Controller) InsertToDB(report *Report) error {

	// Query to insert report
	sqlQuery := `INSERT INTO reports (username, message) VALUES ($1, $2);`

	// Execution of query
<<<<<<< HEAD
	_, err := c.DB.Conn.Exec(context.Background(), sqlQuery, report.Username, report.Message)
=======
	_, err := initializedb.Conn.Exec(context.Background(), sqlQuery, report.Username, report.Message)
>>>>>>> c1ceaeff4e35582d7e05412fa1f111191be573cd
	if err != nil {
		return err
	}
	return nil
}

// Func to check if user is allowed to submit report
func (c *Controller) ValidateReport(username string) bool {

	// Query to check if any report was sent
	// within 1 day
	sqlQuery := `SELECT username from reports WHERE date_submission > NOW() - INTERVAL '1' day AND username = $1;`

	tempUsername := ""

<<<<<<< HEAD
	c.DB.Conn.QueryRow(context.Background(), sqlQuery, username).Scan(&tempUsername)
=======
	initializedb.Conn.QueryRow(context.Background(), sqlQuery, username).Scan(&tempUsername)
>>>>>>> c1ceaeff4e35582d7e05412fa1f111191be573cd

	return tempUsername != username
}
