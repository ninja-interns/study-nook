package main

// imports
import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/alexedwards/scs/v2"

	"net/http"

	"github.com/go-chi/chi/v5"

	"github.com/go-chi/chi"

	"github.com/go-chi/chi/middleware"
	"github.com/jackc/pgx/v4"
)



type response struct {
	timerDuration 	time.Duration 
	timeLeft 		time.Time
}

var sessionManager *scs.SessionManager

func main() {
	sessionManager = scs.New()
	sessionManager.Lifetime = 24 * time.Hour
	connect()

	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Post("/api/timer/createTimer", CreateTimer)
	r.Post("/api/timer/getTimeLeft", GetTimeLeft)


	http.ListenAndServe(":8080", sessionManager.LoadAndSave(r))

}

var conn *pgx.Conn

// connect to the database
func connect() (*pgx.Conn, error) {
	connection_string := "postgres://dev:dev@localhost:5432/task_management?sslmode=disable"
	var err error
	conn, err = pgx.Connect(context.Background(), connection_string)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
		return nil, err
	}

	return conn, nil
}

type Timer struct {
	isComplete 		bool 		`json:"isComplete"`
	timerDuration 	int 		`json:"timerDuration"`
	finishTime 		time.Time 	`json:"finishTIme"`
}

// import the how long they want the timer to go for (time.duration)
func CreateTimer(w http.ResponseWriter, r *http.Request) {
	// Pull timer duration
	req := &Timer{}
	err := json.NewDecoder(r.Body).Decode(req)
	


	// get the current date & time
	//currentTime := time.Now()

	// add the minutes to the current date & time
	//futureTime := currentTime.Add((time.Minute * countdownTime)) // adds 120 minutes

	// Calculate time left on the timer
	//calcTimeLeft(futureTime);

	// push futureTime back to the db

}

// import the timer finish time from the user
func GetTimeLeft(w http.ResponseWriter, r *http.Request) {
	// Push the timer left until the future time back to the user
	//time.Until(futureTime)

}
// save the timer on a cookie so if the page refreshes the user can still access it