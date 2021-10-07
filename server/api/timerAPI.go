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
* * INITIALISE TIMER HANDLER
* * Recieves a timer duration from the client and inserts a null finish time and duration to the database
**/
func (c *Controller) InitTimerHandler(w http.ResponseWriter, r *http.Request) (int, error) {
	// Decode request (timer duration) from the client
	timer := &studynook.Timer{}
	err := json.NewDecoder(r.Body).Decode(&timer)
	if err != nil {
		return http.StatusBadRequest, errors.New("error decoding create timer request")
	}

	c.DeleteTimerHandler(w, r) // Delete old timer/s from the database

	// Create new empty timer with an ID in database
	userId := c.Sessions.GetString(r.Context(), "id")
	err = c.DB.SetTimerId(userId)
	if err != nil {
		return http.StatusBadRequest, errors.New("error creating new timer in database")
	}

	// Set timer duration in database
	err = c.DB.SetTimerDuration(userId, timer.TimerDuration)
	if err != nil {
		return http.StatusBadRequest, errors.New("error inserting timer duration into database")
	}

	// Set finish time to null in database
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
**/
func (c *Controller) CreateTimerHandler(w http.ResponseWriter, r *http.Request) (int, error) {
	userId := c.Sessions.GetString(r.Context(), "id") // Logged in user ID

	// Get finish time from the database
	timer, err := c.DB.GetFinishTime(userId)
	if err != nil {
		if err == pgx.ErrNoRows {
			return http.StatusNotFound, errors.New("error getting finish time: no results in database")
		}
		return http.StatusBadRequest, errors.New("error getting finish time from database")
	}

	// If the finishtime is zero set the timers' finish time (it is initialised as zero when the duration is added)
	if timer.FinishTime.UTC().IsZero() {
		// Get timer duration from the database
		timer, err := c.DB.GetTimerDuration(userId)
		if err != nil {
			if err == pgx.ErrNoRows {
				return http.StatusNotFound, errors.New("error getting timer duration from the database: no results in database")
			}
			return http.StatusBadRequest, errors.New("error getting timer duration from the database")
		}

		// Calculate the timers' finish time
		currentTime := time.Now().UTC()
		finishTime := currentTime.Add((time.Minute * timer.TimerDuration))

		// Set finish time in the database
		err = c.DB.SetTimerFinishTime(userId, finishTime)
		if err != nil {
			return http.StatusBadRequest, errors.New("error setting finish time in database")
		}

		// Set is_completed to false in the database
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
**/
func (c *Controller) GetTimeLeftHandler(w http.ResponseWriter, r *http.Request) (int, error) {
	userId := c.Sessions.GetString(r.Context(), "id") // Logged in user ID

	// Get the finish time from the database
	timer, err := c.DB.GetFinishTime(userId)
	if err != nil {
		if err == pgx.ErrNoRows {
			return http.StatusNotFound, errors.New("error getting finish time from the database: no results in database")
		}
		return http.StatusBadRequest, errors.New("error getting finish time from the database")
	}

	// Add 1 second to the finish time - otherwise the timer is deleted before it has finished
	validFinishTime := timer.FinishTime.Add(time.Second * 1)

	// If the finish time is valid (in the future) calculate the time left
	if validFinishTime.After(time.Now()) {
		finishTime := timer.FinishTime
		timeUntilFinish := time.Until(finishTime)
		timer.TimeLeft = timeUntilFinish.Round(time.Second).String()
	} else if validFinishTime.Before(time.Now()) { // If the timer is finished
		// Update the completion status of the timer in database
		timer.IsCompleted = true
		err := c.DB.SetTimerIsCompleted(userId, timer.IsCompleted)
		if err != nil {
			return http.StatusBadRequest, errors.New("error updating timer is_completed in database")
		}
	} else {
		// Delete timer from the database
		err := c.DB.DeleteTimer(userId)
		if err != nil {
			return http.StatusBadRequest, errors.New("error deleting the timer from the database")
		}
	}

	// Timer response
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(timer)

	return http.StatusOK, nil
}

/**
* * SET COMPLETED FUNCTION
* * Updates the timer in the database to completed
**/
func (c *Controller) SetIsCompletedHandler(w http.ResponseWriter, r *http.Request) (int, error) {
	userId := c.Sessions.GetString(r.Context(), "id") // Logged in user ID

	// Update the completion status of the timer in database to true
	err := c.DB.SetTimerIsCompleted(userId, true)
	if err != nil {
		return http.StatusBadRequest, errors.New("error updating timer is_completed in database")
	}

	// ! JOHN Handle the completed timer here?

	return http.StatusOK, nil
}

/**
* * DELETE TIMER FUNCTION
* * Deletes all timers with the current users ID
**/
func (c *Controller) DeleteTimerHandler(w http.ResponseWriter, r *http.Request) (int, error) {
	userId := c.Sessions.GetString(r.Context(), "id") // Logged in user ID

	// Delete timer from the database
	err := c.DB.DeleteTimer(userId)
	if err != nil {
		return http.StatusBadRequest, errors.New("error deleting the timer from the database")
	}

	return http.StatusOK, nil
}
