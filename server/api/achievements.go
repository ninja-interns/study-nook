package api

import (
	"encoding/json"
	"net/http"

	"studynook.go"
)

type BadgeID struct {
	BadgeID string `json:"badgeID"`
}

type Response struct {
	IsUnlocked bool `json:"isUnlocked"`
}

// Achievements check will check wether use has unlocked achievement or not
func (c *Controller) AchievementCheck(w http.ResponseWriter, r *http.Request, u *studynook.User) {

	check := &BadgeID{}
	err := json.NewDecoder(r.Body).Decode(&check)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	isUnlocked, err := c.CheckAchievement(check.BadgeID, u.ID)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	//if it's all successful, this response will be written back.
	response := Response{
		IsUnlocked: isUnlocked,
	}
	json.NewEncoder(w).Encode(response)
}

func (c *Controller) CheckAchievement(badgeId string, id string) (bool, error) {
	
	switch badgeId {
	case "level_medal_1":
		return c.DB.GetLevelMedal1(id)
	case "level_medal_2":
		return c.DB.GetLevelMedal2(id)
	case "level_medal_3":
		return c.DB.GetLevelMedal3(id)
	case "sessions_medal_1":
		return c.DB.GetSessionMedal1(id)
	case "sessions_medal_2":
		return c.DB.GetSessionMedal2(id)
	case "sessions_medal_3":
		return c.DB.GetSessionMedal3(id)
	case "hours_medal_1":
		return c.DB.GetSessionMedal1(id)
	case "hours_medal_2":
		return c.DB.GetSessionMedal2(id)
	case "hours_medal_3":
		return c.DB.GetSessionMedal3(id)
	case "backgrounds_medal_1":
		return c.DB.GetBackgroundMedal1(id)
	case "backgrounds_medal_2":
		return c.DB.GetBackgroundMedal2(id)
	case "backgrounds_medal_3":
		return c.DB.GetBackgroundMedal3(id)
	case "avatar_medal_1":
		return c.DB.GetAvatarsMedal1(id)
	case "avatar_medal_2":
		return c.DB.GetAvatarsMedal2(id)
	case "avatar_medal_3":
		return c.DB.GetAvatarsMedal3(id)
	default:
		return false, nil

	}
}

