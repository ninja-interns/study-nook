package api

import (
	"encoding/json"
	"net/http"

	"studynook.go"
)

type Check struct {
	BadgeID string `json:"badgeid"`
}

// Achievements check will check wether use has unlocked achievement or not
func (c *Controller) AchievementCheck(w http.ResponseWriter, r *http.Request, u *studynook.User) {

	check := &Check{}
	err := json.NewDecoder(r.Body).Decode(check)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

}
