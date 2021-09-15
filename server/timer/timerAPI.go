package timer

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	initializeDB "studynook.go/initializedb"

	"github.com/alexedwards/scs/pgxstore"
	"github.com/alexedwards/scs/v2"
	"studynook.go/auth"
)

type Timer struct {
	OwnerId			string			`json:"owner_id"`
	TimerDuration 	time.Duration	`json:"timer_duration"`
	FinishTime 		time.Time 		`json:"finish_time"`
	TimeLeft 		string			`json:"time_left"`
	IsComplete 		bool 			`json:"is_completed"`
}

// struct for the reponse message
type Response struct {
	Message string 	`json:"message"`
	IsValid bool 	`json:"isValid"`
	
}

var SessionManager *scs.SessionManager

func SessionsConfig() {
	SessionManager = scs.New()
	SessionManager.Store = pgxstore.New(initializeDB.Conn)
	SessionManager.Lifetime = 1000000 * time.Hour
	SessionManager.Cookie.Persist = true
	SessionManager.Cookie.HttpOnly = false
}

// import the timer finish time from the user
func GetTimeLeft(w http.ResponseWriter, r *http.Request) {
	// Getting the logged in userId
	ownerId := auth.SessionManager.GetString(r.Context(), "id")
	
	// Create instance of timer
	timer := &Timer{}

	sqlStatement := `SELECT finish_time FROM timer WHERE owner_id=$1`

	// Get timer from the database and read into the timer
	err := initializeDB.Conn.QueryRow(context.Background(), sqlStatement, ownerId).Scan(&timer.FinishTime)
	if err != nil {
		return
	}
	
	// Find the time left until the finish time
	// This needs to be converted into my timezone
	fmt.Println(timer.FinishTime)


	finishTime := timer.FinishTime
	fmt.Println(finishTime)
	timeUntilFinish := time.Until(finishTime)
	fmt.Println(timeUntilFinish)

	
	timer.TimeLeft = timeUntilFinish.Round(timeUntilFinish).String()
	

	fmt.Println(timer.TimeLeft)
	
	json.NewEncoder(w).Encode(timer)
}
// save the timer on a cookie so if the page refreshes the user can still access it

func CreateTimer(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// Create instance of timer
	timer := &Timer{}

	// Get the user id and set it to the timer id
	ownerId := auth.SessionManager.GetString(r.Context(), "id")

	// Decoding the request from user into the timer
	err := json.NewDecoder(r.Body).Decode(&timer)
	if err != nil {
		fmt.Println(err)
		return
	}

	// Find the time now and the time that the timer will finish
	currentTime := time.Now().UTC()
	finishTime := currentTime.Add((time.Minute * timer.TimerDuration)) // Adding minutes to the timer
	
	timer.OwnerId = ownerId
	timer.FinishTime = finishTime

	// TODO if there is already a timer with the same id delete the old one

	// Creating an insert in our database
	sqlStatement := `
	INSERT INTO timer (owner_id, finish_time, is_completed)
	VALUES ($1, $2, $3)`

	// Intserting into Database
	_, err = initializeDB.Conn.Exec(context.Background(), sqlStatement, timer.OwnerId, timer.FinishTime, timer.IsComplete)
	if err != nil {
		fmt.Println(err)
		return
	}

}

func DeleteTimer(w http.ResponseWriter, r *http.Request) {
	// Getting the logged in userId
	ownerId := auth.SessionManager.GetString(r.Context(), "id")

	sqlStatement := `DELETE FROM timer WHERE owner_id=$1`

	_, err := initializeDB.Conn.Exec(context.Background(), sqlStatement, ownerId)
	if err != nil {
		fmt.Println(err)
		return
	}
}