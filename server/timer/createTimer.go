package timer

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	initializeDB "studynook.go/initializedb"
)

type Timer struct {
	TimerId			int				`json:"id"`
	TimerDuration 	time.Duration	`json:"timerDuration"`
	FinishTime 		time.Time 		`json:"finishTime"`
	IsComplete 		bool 				`json:"isComplete"`
}

// // struct for the reponse message
type Response struct {
	Message string 	`json:"message"`
	IsValid bool 		`json:"isValid"`

}

func CreateTimer(w http.ResponseWriter, r *http.Request) {
	req := &Timer{}
	err := json.NewDecoder(r.Body).Decode(req)
	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	// Create timer ID here


	// Get the future time
	timerFinishTime := getFinishTime(req.TimerDuration)


	q := `INSERT INTO timer (timerDuration, finishTime) VALUES ($1, $2);`

	// Inserting the timer into the database
	_, err = initializeDB.Conn.Exec(context.Background(), q, req.TimerDuration, timerFinishTime, req.IsComplete, req.TimerId)
	if err != nil {
		response := Response {
			Message: "Your timer has already been added",
			IsValid: false,
		}
		json.NewEncoder(w).Encode(response)
		return 
	}

	response := Response {
		Message: "Your timer has been added",
		IsValid: true,
	}
	json.NewEncoder(w).Encode(response)
}

func getFinishTime(timerDuration time.Duration) time.Time {
	// Get the current time
	currentTime := time.Now()

	// add the minutes to the current date & time
	finishTime := currentTime.Add((time.Minute * timerDuration))

	return finishTime

}

