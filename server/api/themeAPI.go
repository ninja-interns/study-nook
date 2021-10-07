package api

import (
	"encoding/json"
	"errors"
	"net/http"

	"github.com/jackc/pgx/v4"
	"studynook.go"
)

/**
* * SET THEME HANDLER -
**/
func (c *Controller) SetThemeHandler(w http.ResponseWriter, r *http.Request) (int, error) {
	userId := c.Sessions.GetString(r.Context(), "id") // Logged in user ID

	// Decode the request (theme) from the client
	theme := &studynook.Theme{}
	err := json.NewDecoder(r.Body).Decode(theme)
	if err != nil {
		return http.StatusBadRequest, errors.New("error decoding set theme request")
	}

	// Delete any old themes
	err = c.DB.DeleteTheme(userId)
	if err != nil {
		return http.StatusBadRequest, errors.New("error deleting the theme from the database")
	}

	// Insert theme into the Database
	err = c.DB.SetTheme( userId, theme.DarkTheme)
	if err != nil {
		return http.StatusBadRequest, errors.New("error interting theme into the database")
	}

	return http.StatusOK, nil
}

/**
* * GET THEME HANDLER -
**/
func (c *Controller) GetThemeHandler(w http.ResponseWriter, r *http.Request) (int, error) {
	userId := c.Sessions.GetString(r.Context(), "id") // Logged in user ID

	// Get the finish time from the database
	theme, err := c.DB.GetTheme(userId)
	if err != nil {
		if err == pgx.ErrNoRows {
			return http.StatusNotFound, errors.New("error getting theme from the database: no results in database")
		}
		return http.StatusBadRequest, errors.New("error getting theme from the database")
	}

	// Theme response
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(theme)

	return http.StatusOK, nil
}
