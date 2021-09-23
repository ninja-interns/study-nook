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
	OwnerId       string        `json:"owner_id"`
	TimerDuration time.Duration `json:"timer_duration"`
	FinishTime    time.Time     `json:"finish_time"`
	TimeLeft      string        `json:"time_left"`
	IsComplete    bool          `json:"is_completed"`
	TotalDuration time.Duration `json:"total_duration"`
}

// struct for the reponse message
type JSONResponse struct {
	Message string `json:"message"`
	IsValid bool   `json:"isValid"`
}

var SessionManager *scs.SessionManager

func SessionsConfig() {
	SessionManager = scs.New()
	SessionManager.Store = pgxstore.New(initializeDB.Conn)
	SessionManager.Lifetime = 1000000 * time.Hour
	SessionManager.Cookie.Persist = true
	SessionManager.Cookie.HttpOnly = false
}

func CreateTimer(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// Getting the logged in userId
	ownerId := auth.SessionManager.GetString(r.Context(), "id")

	// Get timer duration from the database and read into the timer
	timer := Timer{}
	sqlStatement := `SELECT timer_duration FROM timer WHERE owner_id=$1`
	err := initializeDB.Conn.QueryRow(context.Background(), sqlStatement, ownerId).Scan(&timer.TimerDuration)
	if err != nil {
		fmt.Println(err)
		return
	}

	// Find the time now and the time that the timer will finish
	currentTime := time.Now().UTC()
	finishTime := currentTime.Add((time.Minute * timer.TimerDuration)) // Adding minutes to the timer

	timer.OwnerId = ownerId
	timer.FinishTime = finishTime

	// Creating an insert in our database
	sqlStatement = `
	UPDATE timer 
	SET finish_time=$1, is_completed=$2
	WHERE owner_id=$3`

	// Intserting into Database
	_, err = initializeDB.Conn.Exec(context.Background(), sqlStatement, timer.FinishTime, timer.IsComplete, timer.OwnerId)
	if err != nil {
		fmt.Println(err)
		return
	}
}

// import the timer finish time from the user
func GetTimeLeft(w http.ResponseWriter, r *http.Request) {
	// Getting the logged in userId
	ownerId := auth.SessionManager.GetString(r.Context(), "id")

	// Create instance of timer
	timer := Timer{}

	// Get timer duration from the database and read into the timer
	sqlStatement := `SELECT finish_time FROM timer WHERE owner_id=$1`
	err := initializeDB.Conn.QueryRow(context.Background(), sqlStatement, ownerId).Scan(&timer.FinishTime)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := JSONResponse{
			Message: "Something went wrong, please try again.",
			IsValid: false,
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	// Calculate the time until the finish time
	finishTime := timer.FinishTime
	timeUntilFinish := time.Until(finishTime)
	timer.TimeLeft = timeUntilFinish.Round(time.Second).String()

	// send the timer back to the front end
	json.NewEncoder(w).Encode(timer)
}

// save the timer on a cookie so if the page refreshes the user can still access it

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

func CreateTimerDuration(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// Decoding the request from user into the timer
	timer := Timer{}
	err := json.NewDecoder(r.Body).Decode(&timer)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := JSONResponse{
			Message: "Something went wrong, please try again.",
			IsValid: false,
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	// Set the Owner
	ownerId := auth.SessionManager.GetString(r.Context(), "id")
	timer.OwnerId = ownerId

	// Delete the old timer
	DeleteTimer(w, r)

	// Intserting into Database
	sqlStatement := `INSERT INTO timer (owner_id, timer_duration) VALUES ($1, $2)`
	_, err = initializeDB.Conn.Exec(context.Background(), sqlStatement, &timer.OwnerId, &timer.TimerDuration)
	if err != nil {
		fmt.Println(err)
		return
	}
}

func SetCompleted(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// Get the user id
	ownerId := auth.SessionManager.GetString(r.Context(), "id")

	// Updating the completed status of the timer to true
	timer := Timer{}
	timer.IsComplete = true
	sqlStatement := `UPDATE timer SET is_completed=$1 WHERE owner_id=$2`
	_, err := initializeDB.Conn.Exec(context.Background(), sqlStatement, timer.IsComplete, ownerId)
	if err != nil {
		fmt.Println(err)
		return
	}

	// ! Handle the completed timer here
}
