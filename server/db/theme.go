package db

import (
	"context"

	"studynook.go"
)

/**
* * SET THEME
**/
func (db *DB) SetTheme(userId string, theme bool) error {
	query := `INSERT INTO theme (user_id, dark_theme) VALUES ($1, $2)`
	_, err := db.Conn.Exec(context.Background(), query, userId, theme)
	if err != nil {
		return err
	}

	return nil
}

/**
* * GET THEME
**/
func (db *DB) GetTheme(userId string) (*studynook.Theme, error) {
	theme := &studynook.Theme{}
	query := `SELECT dark_theme FROM theme WHERE user_id=$1`
	err := db.Conn.QueryRow(context.Background(), query, userId).Scan(&theme.DarkTheme)
	if err != nil {
		return theme, err
	}

	return theme, nil
}

/**
* * DELETE THEME
**/
func (db *DB) DeleteTheme(userId string) error {
	sqlStatement := `DELETE FROM theme WHERE user_id=$1`
	_, err := db.Conn.Exec(context.Background(), sqlStatement, userId)
	if err != nil {
		return err
	}

	return nil
}
