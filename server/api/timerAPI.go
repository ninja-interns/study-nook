package api

import (
	"encoding/json"
	"errors"
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
func (c *Controller) SetTimerDurationHandler(w http.ResponseWriter, r *http.Request) (int, error) {
	// Decode request (timer duration) from the client
	timer := &studynook.Timer{}
	err := json.NewDecoder(r.Body).Decode(&timer)
	if err != nil {
		return http.StatusBadRequest, errors.New("error decoding create timer request")
		// handleError(w, "Error decoding create timer request: ", err)
	}

	c.DeleteTimerHandler(w, r) // Delete old timer/s from the database

	// Create new empty timer with an ID in database
	userId := c.Sessions.GetString(r.Context(), "id")
	err = c.DB.SetTimerId(userId)
	if err != nil {
		return http.StatusBadRequest, errors.New("error creating new timer in database")
		// handleError(w, "Error creating new timer in database: ", err)
	}

	// Set timer duration to null in database
	err = c.DB.SetTimerDuration(userId, timer.TimerDuration)
	if err != nil {
		return http.StatusBadRequest, errors.New("error inserting timer duration into database")
		// handleError(w, "Error inserting timer duration into database: ", err)
	}

	// Set null finish time to null in database
	err = c.DB.SetNullFinishTime(userId)
	if err != nil {
		return http.StatusBadRequest, errors.New("error inserting null finish time into database")
	}

	// Set is completed to false
	err = c.DB.SetTimerIsCompleted(userId, false)
	if err != nil {
		return http.StatusBadRequest, errors.New("error setting is completed in database")
	}

	return http.StatusOK, nil
}

/**
* * CREATE TIMER FUNCTION
* * This function selects the timer duration from the database and uses it to calculate the timers' finish time.
 */
func (c *Controller) CreateTimerHandler(w http.ResponseWriter, r *http.Request) (int, error) {
	userId := c.Sessions.GetString(r.Context(), "id") // Logged in user ID

	//! Get finish time from the database - do I set the error status here?
	timer, err := c.DB.GetFinishTime(userId)
	if err != nil {
		if err == pgx.ErrNoRows {
			return http.StatusNotFound, errors.New("error getting finish time: no results in database")
		} else {
			return http.StatusBadRequest, errors.New("error getting finish time from database")
		}
	}

	// If the finishtime is zero create a new timer (it is initialised as zero when the duration is added)
	if timer.FinishTime.UTC().IsZero() {
		// Get timer duration from the database
		timer, err := c.DB.GetTimerDuration(userId)
		if err != nil {
			return http.StatusBadRequest, errors.New("error getting timer duration from the database")
		}

		// Calculate the timers' finish time
		currentTime := time.Now().UTC()
		finishTime := currentTime.Add((time.Minute * timer.TimerDuration))

		// Set finish time into the database
		err = c.DB.SetTimerFinishTime(userId, finishTime)
		if err != nil {
			return http.StatusBadRequest, errors.New("error setting finish time in database")
		}

		// Set is_completed into the database
		err = c.DB.SetTimerIsCompleted(userId, false)
		if err != nil {
			return http.StatusBadRequest, errors.New("error setting is completed in database")
		}
	}

	return http.StatusOK, nil
}

/**
* * GET TIME LEFT FUNCTION
* * Calculates the time remaining and sends it to the client
 */
func (c *Controller) GetTimeLeftHandler(w http.ResponseWriter, r *http.Request) (int, error) {
	userId := c.Sessions.GetString(r.Context(), "id") // Logged in user ID

	// Get the finish time from the database
	timer, err := c.DB.GetFinishTime(userId)
	if err != nil {
		return http.StatusBadRequest, errors.New("error retrieving finish time from the database")
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

	return http.StatusOK, nil
}

/**
* * SET COMPLETED FUNCTION
* * Updates the timer in the database to completed
 */
func (c *Controller) SetIsCompletedHandler(w http.ResponseWriter, r *http.Request) (int, error) {
	userId := c.Sessions.GetString(r.Context(), "id") // Logged in user ID

	// Update the completion status of the timer in database
	err := c.DB.SetTimerIsCompleted(userId, true)
	if err != nil {
		return http.StatusBadRequest, errors.New("error updating timer is_completed in database")
		// handleError(w, "Error updating timer is_completed in database: ", err)
	}

	// ! JOHN Handle the completed timer here?

	return http.StatusOK, nil
}

/**
* * DELETE TIMER FUNCTION
* * Deletes all timers with the current users ID
 */
func (c *Controller) DeleteTimerHandler(w http.ResponseWriter, r *http.Request) (int, error) {
	userId := c.Sessions.GetString(r.Context(), "id") // Logged in user ID

	// Delete timer from the database
	err := c.DB.DeleteTimer(userId)
	if err != nil {
		return http.StatusBadRequest, errors.New("error deleting the timer from the database")
		// handleError(w, "Error deleting the timer from the database: ", err)
	}

	return http.StatusOK, nil
}
