package report

import (
	"context"
	"encoding/json"
	"net/http"
	"strconv"

	"studynook.go/auth"
	"studynook.go/emails"
	initializedb "studynook.go/initializedb"
)

// Struct to store report data content
type Report struct {
	Username string `json:"username"`
	Date     string `json:"date"`
	Message  string `json:"message"`
}

//creating a struct for the JSON response message
type JsonResponse struct {
	Message    string `json:"message"`
	IsValid    bool   `json:"isValid"`
	IsVerified bool   `json:"isVerified"`
}

var ErrorMessage = &JsonResponse{
	Message: "There was an error with your submission. Please, try again later.",
	IsValid: false,
}

// Handler to submit reports
func SubmitReports(w http.ResponseWriter, r *http.Request, u *auth.User) {

	// Creates instance of report struct and decode fatched data to it
	report := &Report{}
	err := json.NewDecoder(r.Body).Decode(report)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	// Check if user is allowed to submit report
	// Users are allowed to submit one report per day
	check, error := ValidateReport(report.Username)
	if err != nil {

	}

	// Conditional statement to call functions depending
	// on check response
	if check {
		var submission_id string
		// Insert report into report table
		err := InsertToDB(report)
		if err != nil {

			json.NewEncoder(w).Encode(ErrorMessage)
			return
		}

		// Get serial ID from report
		submission_id, err = GetReportID(report.Username)
		if err != nil {
			json.NewEncoder(w).Encode(ErrorMessage)
			return
		}

		// Send email to Study Nook office gmail with report ID, username, date and report content
		emails.SendEmail("studynookapp@gmail.com", "Submission Report", "emails/emailTemplates/reportSubmission.html", map[string]string{"id": submission_id, "username": report.Username, "message": report.Message, "date": report.Date})
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
func GetReportID(username string) (string, error) {

	// Query to select ID
	sqlQuery := `SELECT submission_id from reports WHERE date_submission > NOW() - INTERVAL '1' day AND username = $1;`

	tempID := 0

	// Execution of query
	err := initializedb.Conn.QueryRow(context.Background(), sqlQuery, username).Scan(&tempID)
	if err != nil {
		return "", err
	}

	return strconv.Itoa(tempID), nil
}

// Func to insert report into table
func InsertToDB(report *Report) error {

	// Query to insert report
	sqlQuery := `INSERT INTO reports (username, message) VALUES ($1, $2);`

	// Execution of query
	_, err := initializedb.Conn.Exec(context.Background(), sqlQuery, report.Username, report.Message)
	if err != nil {
		return err
	}
	return nil
}

// Func to check if user is allowed to submit report
func ValidateReport(username string) (bool, error) {

	// Query to check if any report was sent
	// within 1 day
	sqlQuery := `SELECT username from reports WHERE date_submission > NOW() - INTERVAL '1' day AND username = $1;`

	tempUsername := ""

	err := initializedb.Conn.QueryRow(context.Background(), sqlQuery, username).Scan(&tempUsername)
	if err != nil {
		return tempUsername != username, err
	}

	return tempUsername != username, nil
}
