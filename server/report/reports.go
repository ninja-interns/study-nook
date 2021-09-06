package report

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"studynook.go/auth"
	"studynook.go/emails"
	initializeDB "studynook.go/initializedb"
)

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

func SubmitReports(w http.ResponseWriter, r *http.Request, u *auth.User) {

	report := &Report{}
	err := json.NewDecoder(r.Body).Decode(report)
	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	check := ValidateReport(report.Username)

	fmt.Println(check)

	if check {
		var submission_id string
		InsertToDB(report)
		submission_id = GetReportID(report.Username)
		emails.SendEmail("studynookapp@gmail.com", "Submission Report", "emails/emailTemplates/reportSubmission.html", map[string]string{"id": submission_id, "username": report.Username, "message": report.Message, "date": report.Date})
		response := JsonResponse{
			Message: "Success! Please, wait while the management team review your report. Thanks for your collaboration!",
			IsValid: true,
		}
		json.NewEncoder(w).Encode(response)
	} else {
		fmt.Println(err)
		response := JsonResponse{
			Message: "Error, you cannot send more than one report a day. Please, try again tomorrow.",
			IsValid: false,
		}
		json.NewEncoder(w).Encode(response)
	}
}

func GetReportID(username string) string {

	sqlQuery := `SELECT submission_id from reports WHERE date_submission > NOW() - INTERVAL '1' day AND username = $1;`

	tempID := 0
	err := initializeDB.Conn.QueryRow(context.Background(), sqlQuery, username).Scan(&tempID)
	if err != nil {
		fmt.Println(err)
	}

	fmt.Println("This is username: " + strconv.Itoa(tempID))

	return strconv.Itoa(tempID)
}

func InsertToDB(report *Report) {

	sqlQuery := `INSERT INTO reports (username, message) VALUES ($1, $2);`

	_, err := initializeDB.Conn.Exec(context.Background(), sqlQuery, report.Username, report.Message)
	if err != nil {
		fmt.Println(err)
	}
}

func ValidateReport(username string) bool {

	sqlQuery := `SELECT username from reports WHERE date_submission > NOW() - INTERVAL '1' day AND username = $1;`

	tempUsername := ""
	fmt.Println(username)
	err := initializeDB.Conn.QueryRow(context.Background(), sqlQuery, username).Scan(&tempUsername)
	if err != nil {
		fmt.Println(err)
	}

	fmt.Println("This is username: " + tempUsername)

	if tempUsername == username {
		return false
	} else {
		return true
	}

}

func insertToDB(report *Report) {

	sqlQuery := `INSERT INTO reports (username, message) VALUES ($1, $2);`

	_, err := initializeDB.Conn.Exec(context.Background(), sqlQuery, report.Username, report.Message)
	if err != nil {
		fmt.Println(err)
	}
}
