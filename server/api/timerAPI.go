package api

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/jackc/pgx/v4"
)

type Timer struct {
	userId        string        `json:"user_id"`
	TimerDuration time.Duration `json:"timer_duration"`
	FinishTime    time.Time     `json:"finish_time"`
	TimeLeft      string        `json:"time_left"`
	IsComplete    bool          `json:"is_completed"`
	TotalDuration time.Duration `json:"total_duration"`
}

//! Explanation of function
func (c *Controller) CreateTimer(w http.ResponseWriter, r *http.Request) {
	// Getting the logged in userId
	id := c.Sessions.GetString(r.Context(), "id")

	// Retrieving finish time from the database
	timer := &Timer{}
	sqlStatement := `SELECT finish_time FROM timer WHERE user_id=$1`
	err := c.DB.Conn.QueryRow(context.Background(), sqlStatement, id).Scan(&timer.FinishTime)
	if err != nil {
		if err == pgx.ErrNoRows {
			http.Error(w, "Error, no rows in result: "+err.Error(), http.StatusNotFound)
		} else {
			http.Error(w, "Error retrieving finish time from database: "+err.Error(), http.StatusBadRequest)
		}
		return
	}

	// If the finishtime is zero create a new timer
	if timer.FinishTime.UTC().IsZero() {
		// Get timer duration from the database and read into the timer
		sqlStatement = `SELECT timer_duration FROM timer WHERE user_id=$1`
		err = c.DB.Conn.QueryRow(context.Background(), sqlStatement, id).Scan(&timer.TimerDuration)
		if err != nil {
			http.Error(w, "Error retrieving timer duration from the database: "+err.Error(), http.StatusBadRequest)
			return

		}

		// Calculate the timers finish time
		currentTime := time.Now().UTC()
		// finishTime := currentTime.Add((time.Minute * timer.TimerDuration))
		finishTime := currentTime.Add((time.Minute * 1)) //!!!!

		// Intserting into Database
		sqlStatement = `UPDATE timer SET finish_time=$1, is_completed=$2 WHERE user_id=$3`
		_, err = c.DB.Conn.Exec(context.Background(), sqlStatement, finishTime, timer.IsComplete, id)
		if err != nil {
			http.Error(w, "Error creating new timer in database: "+err.Error(), http.StatusBadRequest)
			return
		}
	}

}

//! Explanation of function
func (c *Controller) GetTimeLeft(w http.ResponseWriter, r *http.Request) {

	// Getting the logged in userId
	id := c.Sessions.GetString(r.Context(), "id")

	// Get timer duration from the database and read into the timer
	timer := Timer{}
	sqlStatement := `SELECT finish_time FROM timer WHERE user_id=$1`
	err := c.DB.Conn.QueryRow(context.Background(), sqlStatement, id).Scan(&timer.FinishTime)
	if err != nil {
		http.Error(w, "Error retrieving finish time from the database: "+err.Error(), http.StatusBadRequest)
		return
	}

	// Calculate the time until the finish time
	finishTime := timer.FinishTime
	timeUntilFinish := time.Until(finishTime)
	timer.TimeLeft = timeUntilFinish.Round(time.Second).String()

	// Send the timer back to the front end
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(timer)
}

// save the timer on a cookie so if the page refreshes the user can still access it
//! Explanation of function
func (c *Controller) DeleteTimer(w http.ResponseWriter, r *http.Request) {
	// Getting the logged in userId
	id := c.Sessions.GetString(r.Context(), "id")

	// Deleting the timer from the database
	sqlStatement := `DELETE FROM timer WHERE user_id=$1`
	_, err := c.DB.Conn.Exec(context.Background(), sqlStatement, id)
	if err != nil {
		http.Error(w, "Error deleting the timer from the database: "+err.Error(), http.StatusBadRequest)
		return
	}
}

//! Explanation of function
func (c *Controller) SetTimerDuration(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// Decoding the request from user into the timer
	timer := Timer{}
	err := json.NewDecoder(r.Body).Decode(&timer)
	if err != nil {
		http.Error(w, "Error decoding create timer request: "+err.Error(), http.StatusBadRequest)
		return
	}

	// Set the user Id and finish time to null
	id := c.Sessions.GetString(r.Context(), "id")
	var nullFinishTime time.Time

	// Delete the old timer
	c.DeleteTimer(w, r)

	// Intserting into Database
	sqlStatement := `INSERT INTO timer (user_id, timer_duration, finish_time) VALUES ($1, $2, $3)`
	_, err = c.DB.Conn.Exec(context.Background(), sqlStatement, id, &timer.TimerDuration, nullFinishTime)
	if err != nil {
		http.Error(w, "Error inserting timer duration into database: "+err.Error(), http.StatusBadRequest)
		return
	}
}

//! Explanation of function
func (c *Controller) SetCompleted(w http.ResponseWriter, r *http.Request) {
	fmt.Println("setting completed")
	// Get the user id
	id := c.Sessions.GetString(r.Context(), "id")

	// Updating the completed status of the timer to true
	timer := Timer{}
	timer.IsComplete = true
	sqlStatement := `UPDATE timer SET is_completed=$1 WHERE user_id=$2`
	_, err := c.DB.Conn.Exec(context.Background(), sqlStatement, timer.IsComplete, id)
	if err != nil {
		http.Error(w, "Error updating timer is_completed in database: "+err.Error(), http.StatusBadRequest)
		return
	}

	c.DeleteTimer(w, r)

	// ! JOHN Handle the completed timer here
}

func HandleError(w http.ResponseWriter, text string, err error) {
	if err == pgx.ErrNoRows {
		http.Error(w, text+err.Error(), http.StatusNotFound)
	} else {
		http.Error(w, text+err.Error(), http.StatusBadRequest)
	}
	return
}
