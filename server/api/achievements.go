package api

import (
	"encoding/json"
	"fmt"
	"net/http"

	"studynook.go"
)

type Response struct {
	Level_medal_1 bool `json:"level_medal_1"`
	Level_medal_2 bool `json:"level_medal_2"`
	Level_medal_3 bool `json:"level_medal_3"`
	Sessions_medal_1 bool `json:"sessions_medal_1"`
	Sessions_medal_2 bool `json:"sessions_medal_2"`
	Sessions_medal_3 bool `json:"sessions_medal_3"`
	Hours_medal_1 bool `json:"hours_medal_1"`
	Hours_medal_2 bool `json:"hours_medal_2"`
	Hours_medal_3 bool `json:"hours_medal_3"`
	Backgrounds_medal_1 bool `json:"background_medal_1"`
	Backgrounds_medal_2 bool `json:"background_medal_2"`
	Backgrounds_medal_3 bool `json:"background_medal_3"`
	Avatar_medal_1 bool `json:"avatar_medal_1"`
	Avatar_medal_2 bool `json:"avatar_medal_2"`
	Avatar_medal_3 bool `json:"avatar_medal_3"`
}

// Achievements check will check wether use has unlocked achievement or not
func (c *Controller) AchievementCheck(w http.ResponseWriter, r *http.Request, u *studynook.User) {

	fmt.Println("Im here")

	level_medal_1, err := c.DB.GetLevelMedal1(u.ID)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Println(err)

		return
	}

	level_medal_2, err := c.DB.GetLevelMedal2(u.ID)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Println(err)
		return
	}

	level_medal_3, err := c.DB.GetLevelMedal3(u.ID)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Println(err)
		return
	}

	session_medal_1, err := c.DB.GetSessionMedal1(u.ID)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Println(err)
		return
	}

	session_medal_2, err := c.DB.GetSessionMedal2(u.ID)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Println(err)
		return
	}

	session_medal_3, err := c.DB.GetSessionMedal3(u.ID)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Println(err)
		return
	}
	
	hours_medal_1, err := c.DB.GetHoursMedal1(u.ID)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Println(err)
		return
	}

	hours_medal_2, err := c.DB.GetHoursMedal2(u.ID)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Println(err)
		return
	}

	hours_medal_3, err := c.DB.GetHoursMedal3(u.ID)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Println(err)
		return
	}

	background_medal_1, err := c.DB.GetBackgroundMedal1(u.ID)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Println(err)
		return
	}

	background_medal_2, err := c.DB.GetBackgroundMedal2(u.ID)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Println(err)
		return
	}

	background_medal_3, err := c.DB.GetBackgroundMedal3(u.ID)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Println(err)
		return
	}

	avatar_medal_1, err := c.DB.GetAvatarsMedal1(u.ID)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Println(err)
		return
	}

	avatar_medal_2, err := c.DB.GetAvatarsMedal2(u.ID)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Println(err)
		return
	}

	avatar_medal_3, err := c.DB.GetAvatarsMedal3(u.ID)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Println(err)
		return
	}

	//if it's all successful, this response will be written back.
	response := Response{
		Level_medal_1: level_medal_1,
		Level_medal_2: level_medal_2,
		Level_medal_3: level_medal_3,
		Sessions_medal_1: session_medal_1,
		Sessions_medal_2: session_medal_2,
		Sessions_medal_3: session_medal_3,
		Hours_medal_1: hours_medal_1,
		Hours_medal_2: hours_medal_2,
		Hours_medal_3: hours_medal_3,
		Backgrounds_medal_1: background_medal_1,
		Backgrounds_medal_2: background_medal_2,
		Backgrounds_medal_3: background_medal_3,
		Avatar_medal_1: avatar_medal_1,
		Avatar_medal_2: avatar_medal_2,
		Avatar_medal_3: avatar_medal_3,
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

