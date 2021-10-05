package api

import (
	"encoding/json"
	"net/http"

	"studynook.go"
)

type Check struct {
	BadgeID string `json:"id"`
}

func (c *Controller) AchievementCheck(w http.ResponseWriter, r *http.Request, u *studynook.User) {

	// Creates instance of report struct and decode fatched data to it
	check := &Check{}
	err := json.NewDecoder(r.Body).Decode(check)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

}
