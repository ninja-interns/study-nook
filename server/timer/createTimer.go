package timer

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	initializeDB "main.go/initializedb"
)

type Timer struct {
	TimerId			int				`json:"id"`
	TimerDuration 	time.Duration	`json:"timerDuration"`
	FinishTime 		time.Time 		`json:"finishTime"`
	IsComplete 		bool 			`json:"isComplete"`
}

// struct for the reponse message
// type Response struct {
// 	Message string 	`json:"message"`
// 	IsValid bool 	`json:"isValid`

// }

// import the how long they want the timer to go for (time.duration)
func CreateTimer(w http.ResponseWriter, r *http.Request) {
	
	// Get timer duration
	req := &Timer{}
	err := json.NewDecoder(r.Body).Decode(req)
	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	q := `INSERT INTO timer (timerDuration, finishTime) VALUES ($1, $2);`

	// Inserting the timer into the database
	_, err = initializeDB.Conn.Exec(context.Background(), q, req.TimerDuration, req.FinishTime, req.IsComplete, req.TimerId)
	if err != nil {
		// response := Response {
		// 	Message: "Your timer has already been added",
		// 	IsValid: false,
		// }
		// json.NewEncoder(w).Encode(response)
		return 
	}


	// response := Response {
	// 	Message: "Your timer has been added",
	// 	IsValid: true,
	// }
	// json.NewEncoder(w).Encode(response)




	// get the current date & time
	//currentTime := time.Now()

	// add the minutes to the current date & time
	//futureTime := currentTime.Add((time.Minute * countdownTime)) // adds 120 minutes

	// Calculate time left on the timer
	//calcTimeLeft(futureTime);

	// push futureTime back to the db

}