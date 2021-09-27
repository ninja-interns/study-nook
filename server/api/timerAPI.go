package api

import (
	"context"
	"encoding/json"
	"net/http"
	"time"

	"github.com/jackc/pgx/v4"
)

type Timer struct {
	TimerDuration time.Duration `json:"timer_duration"`
	FinishTime    time.Time     `json:"finish_time"`
	TimeLeft      string        `json:"time_left"`
	IsComplete    bool          `json:"is_completed"`
}

/**
* * SET TIMER DURATION FUNCTION
* * Recieves a timer duration from the client and inserts a null finish time and duration to the database
 */
func (c *Controller) SetTimerDuration(w http.ResponseWriter, r *http.Request) {
	// Decode request (timer duration) from the client
	timer := Timer{}
	err := json.NewDecoder(r.Body).Decode(&timer)
	if err != nil {
		handleError(w, "Error decoding create timer request: ", err)
	}

	c.DeleteTimer(w, r) // Deletes old timers' from the database

	// Initialise values and intsert into Database
	var nullFinishTime time.Time
	userId := c.Sessions.GetString(r.Context(), "id")
	sqlStatement := `INSERT INTO timer (user_id, timer_duration, finish_time) VALUES ($1, $2, $3)`
	_, err = c.DB.Conn.Exec(context.Background(), sqlStatement, userId, &timer.TimerDuration, nullFinishTime)
	if err != nil {
		handleError(w, "Error inserting timer duration into database: ", err)
	}
}

/**
* * CREATE TIMER FUNCTION
* * This function selects the timer duration from the database and uses it to calculate the timers' finish time.
 */
func (c *Controller) CreateTimer(w http.ResponseWriter, r *http.Request) {
	userId := c.Sessions.GetString(r.Context(), "id") // Logged in user ID

	// Retrieve finish time from the database
	timer := &Timer{}
	sqlStatement := `SELECT finish_time FROM timer WHERE user_id=$1`
	err := c.DB.Conn.QueryRow(context.Background(), sqlStatement, userId).Scan(&timer.FinishTime)
	if err != nil {
		handleError(w, "Error retrieving finish time from database: ", err)
	}

	// If the finishtime is zero create a new timer (it is initialised as zero when the duration is added)
	if timer.FinishTime.UTC().IsZero() {
		// Get timer duration from the database
		sqlStatement = `SELECT timer_duration FROM timer WHERE user_id=$1`
		err = c.DB.Conn.QueryRow(context.Background(), sqlStatement, userId).Scan(&timer.TimerDuration)
		if err != nil {
			handleError(w, "Error retrieving timer duration from the database: ", err)
		}

		// Calculate the timers' finish time
		currentTime := time.Now().UTC()
		finishTime := currentTime.Add((time.Minute * timer.TimerDuration))

		// Insert finish time into the database
		sqlStatement = `UPDATE timer SET finish_time=$1, is_completed=$2 WHERE user_id=$3`
		_, err = c.DB.Conn.Exec(context.Background(), sqlStatement, finishTime, timer.IsComplete, userId)
		if err != nil {
			handleError(w, "Error creating new timer in database: ", err)
		}
	}
}

/**
* * GET TIME LEFT FUNCTION
* * Calculates the time remaining and sends it to the client
 */
func (c *Controller) GetTimeLeft(w http.ResponseWriter, r *http.Request) {
	userId := c.Sessions.GetString(r.Context(), "id") // Logged in user ID

	// Get the finish time from the database
	timer := Timer{}
	sqlStatement := `SELECT finish_time FROM timer WHERE user_id=$1`
	err := c.DB.Conn.QueryRow(context.Background(), sqlStatement, userId).Scan(&timer.FinishTime)
	if err != nil {
		handleError(w, "Error retrieving finish time from the database: ", err)
	}

	// Add 1 second to the finish time - otherwise the timer is deleted before it has finished
	validFinishTime := timer.FinishTime.Add(time.Second * 1)

	// If the finish time is valid (in the future) calculate time left
	if validFinishTime.After(time.Now()) {
		finishTime := timer.FinishTime
		timeUntilFinish := time.Until(finishTime)
		timer.TimeLeft = timeUntilFinish.Round(time.Second).String()
	} else if validFinishTime.Before(time.Now()) { // If the timer is finished
		timer.IsComplete = true
		c.SetCompleted(w, r) // Set to complete in database
	} else {
		c.DeleteTimer(w, r)
	}

	// Timer response
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(timer)
}

/**
* * SET COMPLETED FUNCTION
* * Updates the timer in the database to completed
 */
func (c *Controller) SetCompleted(w http.ResponseWriter, r *http.Request) {
	userId := c.Sessions.GetString(r.Context(), "id") // Logged in user ID

	// Update the completion status of the timer in database
	isComplete := true
	sqlStatement := `UPDATE timer SET is_completed=$1 WHERE user_id=$2`
	_, err := c.DB.Conn.Exec(context.Background(), sqlStatement, isComplete, userId)
	if err != nil {
		handleError(w, "Error updating timer is_completed in database: ", err)
	}

	// ! JOHN Handle the completed timer here?
}

/**
* * DELETE TIMER FUNCTION
* * Deletes all timers with the current users ID
 */
func (c *Controller) DeleteTimer(w http.ResponseWriter, r *http.Request) {
	userId := c.Sessions.GetString(r.Context(), "id") // Logged in user ID

	// Delete timer from the database
	sqlStatement := `DELETE FROM timer WHERE user_id=$1`
	_, err := c.DB.Conn.Exec(context.Background(), sqlStatement, userId)
	if err != nil {
		handleError(w, "Error deleting the timer from the database: ", err)
	}
}

/**
* * HANDLE ERROR FUNCTION
* * Returns two types of errors: No rows in database & all other errors
* ? Could add more types of errors?
* ? Move this function to an error API?
 */
func handleError(w http.ResponseWriter, text string, err error) {
	if err == pgx.ErrNoRows { // If the database returns no rows
		http.Error(w, "Error, no rows in result: "+err.Error(), http.StatusNotFound)
	} else {
		http.Error(w, text+err.Error(), http.StatusBadRequest)
	}
	return
}
