package api

import (
	"encoding/json"
	"net/http"

	"studynook.go"
)

type Background struct {
	CurrentBackground string `json:"currentBackground"`
}

type Avatar struct {
	CurrentAvatar string `json:"currentAvatar"`
}

func (c *Controller) ChangeBackgroundHandler(w http.ResponseWriter, r *http.Request, u *studynook.User) {
	
	// Creates instance of report struct and decode fatched data to it
	background := &Background{}
	err := json.NewDecoder(r.Body).Decode(background)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	err = c.DB.UpdateCurrentBackground(u.ID, background.CurrentBackground)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
}

func (c *Controller) ChangeAvatarHandler(w http.ResponseWriter, r *http.Request, u *studynook.User) {
	
	// Creates instance of report struct and decode fatched data to it
	avatar := &Avatar{}
	err := json.NewDecoder(r.Body).Decode(avatar)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	err = c.DB.UpdateCurrentAvatar(u.ID, avatar.CurrentAvatar)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
}
