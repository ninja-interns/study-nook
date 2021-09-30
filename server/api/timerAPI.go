package api

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/jackc/pgx/v4"
	"studynook.go"
)

/**
* ! CREATING A NEW TIMER WILL NULL COMPONENTS AND USER ID - should rename
* * SET TIMER DURATION FUNCTION
* * Recieves a timer duration from the client and inserts a null finish time and duration to the database
 */
func (c *Controller) SetTimerDurationHandler(w http.ResponseWriter, r *http.Request) {
	// Decode request (timer duration) from the client
	timer := &studynook.Timer{}
	err := json.NewDecoder(r.Body).Decode(&timer)
	if err != nil {
		handleError(w, "Error decoding create timer request: ", err) //! Handle with middleware
		return
	}

	c.DeleteTimerHandler(w, r) // Delete old timer/s from the database

	// Create new empty timer with an ID in database
	userId := c.Sessions.GetString(r.Context(), "id")
	err = c.DB.SetTimerId(userId)
	if err != nil {
		handleError(w, "Error creating new timer in database: ", err) //! Handle with middleware
		return
	}

	// Set timer duration to null in database
	err = c.DB.SetTimerDuration(userId, timer.TimerDuration)
	if err != nil {
		handleError(w, "Error inserting timer duration into database: ", err) //! Handle with middleware
		return
	}

	// Set null finish time to null in database
	err = c.DB.SetNullFinishTime(userId)
	if err != nil {
		handleError(w, "Error inserting null finish time into database: ", err) //! Handle with middleware
		return
	}

	// Set is completed to false
	err = c.DB.SetTimerIsCompleted(userId, false)
	if err != nil {
		handleError(w, "Error inserting null finish time into database: ", err) //! Handle with middleware
		return
	}
}

/**
* * CREATE TIMER FUNCTION
* * This function selects the timer duration from the database and uses it to calculate the timers' finish time.
 */
func (c *Controller) CreateTimerHandler(w http.ResponseWriter, r *http.Request) {
	userId := c.Sessions.GetString(r.Context(), "id") // Logged in user ID

	//! Get finish time from the database
	timer, err := c.DB.GetFinishTime(userId)
	if err != nil {
		handleError(w, "Error getting finish time from database: ", err) //! Handle with middleware
		return
	}

	// If the finishtime is zero create a new timer (it is initialised as zero when the duration is added)
	if timer.FinishTime.UTC().IsZero() {
		// Get timer duration from the database
		timer, err := c.DB.GetTimerDuration(userId)
		if err != nil {
			handleError(w, "Error getting timer duration from the database: ", err) //! Handle with middleware
			return
		}

		// Calculate the timers' finish time
		currentTime := time.Now().UTC()
		finishTime := currentTime.Add((time.Minute * timer.TimerDuration))

		// Set finish time into the database
		err = c.DB.SetTimerFinishTime(userId, finishTime)
		if err != nil {
			handleError(w, "Error setting finish time in database: ", err) //! Handle with middleware
			return
		}

		// Set is_completed into the database
		err = c.DB.SetTimerIsCompleted(userId, false)
		if err != nil {
			handleError(w, "Error setting is completed in database: ", err) //! Handle with middleware
			return
		}
	}
}

/**
* * GET TIME LEFT FUNCTION
* * Calculates the time remaining and sends it to the client
 */
func (c *Controller) GetTimeLeftHandler(w http.ResponseWriter, r *http.Request) {
	userId := c.Sessions.GetString(r.Context(), "id") // Logged in user ID

	// Get the finish time from the database
	timer, err := c.DB.GetFinishTime(userId)
	if err != nil {
		handleError(w, "Error retrieving finish time from the database: ", err) //! Handle with middleware
		return
	}

	// Add 1 second to the finish time - otherwise the timer is deleted before it has finished
	validFinishTime := timer.FinishTime.Add(time.Second * 1)

	// If the finish time is valid (in the future) calculate the time left
	if validFinishTime.After(time.Now()) {
		finishTime := timer.FinishTime
		timeUntilFinish := time.Until(finishTime)
		timer.TimeLeft = timeUntilFinish.Round(time.Second).String()
	} else if validFinishTime.Before(time.Now()) { // If the timer is finished
		timer.IsCompleted = true
		c.SetIsCompletedHandler(w, r) //! Set to complete in database -DB Call?
	} else {
		c.DeleteTimerHandler(w, r) //! DB call?
	}

	// Timer response
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(timer)
}

/**
* * SET COMPLETED FUNCTION
* * Updates the timer in the database to completed
 */
func (c *Controller) SetIsCompletedHandler(w http.ResponseWriter, r *http.Request) {
	userId := c.Sessions.GetString(r.Context(), "id") // Logged in user ID

	// Update the completion status of the timer in database
	err := c.DB.SetTimerIsCompleted(userId, true)
	if err != nil {
		handleError(w, "Error updating timer is_completed in database: ", err) //! Handle with middleware
		return
	}

	// ! JOHN Handle the completed timer here?
}

/**
* * DELETE TIMER FUNCTION
* * Deletes all timers with the current users ID
 */
func (c *Controller) DeleteTimerHandler(w http.ResponseWriter, r *http.Request) {
	userId := c.Sessions.GetString(r.Context(), "id") // Logged in user ID

	// Delete timer from the database
	err := c.DB.DeleteTimer(userId)
	if err != nil {
		handleError(w, "Error deleting the timer from the database: ", err) //! Handle with middleware
		return
	}
}

/**
* * HANDLE ERROR FUNCTION
* * Returns two types of errors: No rows in database & all other errors
* ? Could add more types of errors?
* ! This will be handled with a middleware instead of API
 */
func handleError(w http.ResponseWriter, text string, err error) {
	// If the database returns no rows
	if err == pgx.ErrNoRows {
		http.Error(w, "Error, no rows in result: "+err.Error(), http.StatusNotFound)
		return
	}
	// All other errors
	http.Error(w, text+err.Error(), http.StatusBadRequest)
}
