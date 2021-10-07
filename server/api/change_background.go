package api

import (
	"encoding/json"
	"net/http"

	"studynook.go"
)

type Background struct {
	Background string `json:"currentBackground"`
}

func (c *Controller) ChangeBackgroundHandler(w http.ResponseWriter, r *http.Request, u *studynook.User) {
	
	// Creates instance of report struct and decode fatched data to it
	background := &Background{}
	err := json.NewDecoder(r.Body).Decode(background)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	err = c.DB.UpdateCurrentBackground(u.ID, background.Background)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
}