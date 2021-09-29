package db

import (
	"context"
	"time"

	"studynook.go"
)

/**
* * DELETE TIMER -
**/
func (db *DB) DeleteTimer(userId string) error {
	sqlStatement := `DELETE FROM timer WHERE user_id=$1`
	_, err := db.Conn.Exec(context.Background(), sqlStatement, userId)
	if err != nil {
		return err
	}

	return nil
}

//* SETTERS -------------------------------------------------------------------------

/**
* * SET TIMER ID - Set the timers' ID in the database
**/
func (db *DB) SetTimerId(userId string) error {
	query := `INSERT INTO timer (user_id) VALUES ($1)`
	_, err := db.Conn.Exec(context.Background(), query, userId)
	if err != nil {
		return err
	}

	return nil
}

/**
* * SET TIMER DURATION - Set the timers' duration in the database
**/
func (db *DB) SetTimerDuration(userId string, timerDuration time.Duration) error {
	query := `UPDATE timer SET timer_duration=$1 WHERE user_id=$2`
	_, err := db.Conn.Exec(context.Background(), query, timerDuration, userId)
	if err != nil {
		return err
	}

	return nil
}

/**
* * SET NULL FINISH TIME - Set the timers' finish time to all zeros (null)
**/
func (db *DB) SetNullFinishTime(userId string) error {
	var nullFinishTime time.Time
	query := `UPDATE timer SET finish_time=$1 WHERE user_id=$2`
	_, err := db.Conn.Exec(context.Background(), query, nullFinishTime, userId)
	if err != nil {
		return err
	}

	return nil
}

/**
* * SET TIMER FINISH TIME -
**/
func (db *DB) SetTimerFinishTime(userId string, finishTime time.Time) error {
	query := `UPDATE timer SET finish_time=$1 WHERE user_id=$3`
		_, err := db.Conn.Exec(context.Background(), query, finishTime, userId)
	if err != nil {
		return err
	}

	return nil
}

/**
* * SET IS COMPLETED -
**/
func (db *DB) SetTimerIsCompleted(userId string, isCompleted bool) error {
	query := `UPDATE timer SET is_completed=$1 WHERE user_id=$2`
	_, err := db.Conn.Exec(context.Background(), query, isCompleted, userId)
	if err != nil {
		return err
	}

	return nil
}

//* GETTERS -------------------------------------------------------------------------

/**
* * GET FINISH TIME -
**/
func (db *DB) GetFinishTime(userId string) (*studynook.Timer, error) {
	timer := &studynook.Timer{}
	query := `SELECT finish_time FROM timer WHERE user_id=$1`
	err := db.Conn.QueryRow(context.Background(), query, userId).Scan(timer.FinishTime)
	if err != nil {
		return timer, err
	}

	return timer, nil
}

/**
* * GET TIMER DURATION -
**/
func (db *DB) GetTimerDuration(userId string) (*studynook.Timer, error) {
	timer := &studynook.Timer{}
	query := `SELECT timer_duration FROM timer WHERE user_id=$1`
	err := db.Conn.QueryRow(context.Background(), query, userId).Scan(timer.TimerDuration)
	if err != nil {
		return timer, err
	}

	return timer, nil
}

/**
* * GET IS COMPLETED -
**/
func (db *DB) GetIsCompleted(userId string) (*studynook.Timer, error) {
	timer := &studynook.Timer{}
	query := `SELECT is_completed FROM timer WHERE user_id=$1`
	err := db.Conn.QueryRow(context.Background(), query, userId).Scan(timer.IsCompleted)
	if err != nil {
		return timer, err
	}

	return timer, nil
}
