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
	Level int `json:"level"`
	Sessions int `json:"sessions_completed"`
	Hours_focused int `json:"hours_focused"`
	Backgrounds int `json:"backgrounds"`
	Avatars int `json:"avatars"`
}

// Achievements check will check wether use has unlocked achievement or not
func (c *Controller) AchievementCheck(w http.ResponseWriter, r *http.Request, u *studynook.User) {

	level_medal_1, err := c.DB.GetLevelMedal1(u.ID)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	level_medal_2, err := c.DB.GetLevelMedal2(u.ID)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	level_medal_3, err := c.DB.GetLevelMedal3(u.ID)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	session_medal_1, err := c.DB.GetSessionMedal1(u.ID)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	session_medal_2, err := c.DB.GetSessionMedal2(u.ID)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	session_medal_3, err := c.DB.GetSessionMedal3(u.ID)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	
	hours_medal_1, err := c.DB.GetHoursMedal1(u.ID)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	hours_medal_2, err := c.DB.GetHoursMedal2(u.ID)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	hours_medal_3, err := c.DB.GetHoursMedal3(u.ID)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	background_medal_1, err := c.DB.GetBackgroundMedal1(u.ID)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	background_medal_2, err := c.DB.GetBackgroundMedal2(u.ID)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	background_medal_3, err := c.DB.GetBackgroundMedal3(u.ID)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	avatar_medal_1, err := c.DB.GetAvatarsMedal1(u.ID)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	avatar_medal_2, err := c.DB.GetAvatarsMedal2(u.ID)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	avatar_medal_3, err := c.DB.GetAvatarsMedal3(u.ID)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	level, err := c.GetLevel(u.ID)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	sessions_complete, err := c.DB.GetSessions(u.ID)
	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	hours_focused, err := c.DB.GetHoursNooked(u.ID)
	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	hours_focused /= 60

	backgrounds, err := c.DB.GetBackgroundsUnlocked(u.ID)
	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	avatars, err := c.DB.GetAvatarUnlocked(u.ID) 
	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusBadRequest)
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
		Level: level,
		Sessions: sessions_complete,
		Hours_focused: hours_focused,
		Backgrounds: backgrounds,
		Avatars: avatars,
	}

	json.NewEncoder(w).Encode(response)
}

func CheckObtained(current int, goal int) bool {
	return current >= goal
}

func (c* Controller) CheckLevelMedals(id string) error{
	
	// Level var
	level, err := c.GetLevel(id) 
	if err != nil {
		return err
	}
	
	// Level medal 1
	check := CheckObtained(level, 1)
	checkDb, err := c.DB.GetLevelMedal1(id)
	if err != nil {
		return err
	}

	if(check != checkDb) {
		c.DB.UpdateLevelMedal1(id)
	}
	
	
	// Level medal 2
	check = CheckObtained(level, 10)
	checkDb, err = c.DB.GetLevelMedal2(id)
	if err != nil {
		return err
	}


	if(check != checkDb) {
		c.DB.UpdateLevelMedal2(id)
	}

	// Level medal 3
	check = CheckObtained(level, 20)
	checkDb, err = c.DB.GetLevelMedal3(id)
	if err != nil {
		return err
	}

	if(check != checkDb) {
		c.DB.UpdateLevelMedal3(id)
	}

	return nil
}

func (c* Controller) CheckHoursMedal(id string) error{
	
	// Hours focused var 
	hours, err := c.DB.GetHoursNooked(id)
	if err != nil {
		return err
	}
	hours /= 60

	// Hours medal 1
	hoursDb, err := c.DB.GetHoursMedal1(id)
	if err != nil {
		return err
	}

	hoursCheck := CheckObtained(hours, 1)

	if(hoursCheck != hoursDb) {
		c.DB.UpdateHoursMedal1(id)
	}

	// Hours medal 2
	hoursDb, err = c.DB.GetHoursMedal2(id)
	if err != nil {
		return err
	}

	hoursCheck = CheckObtained(hours, 5)

	if(hoursCheck != hoursDb) {
		c.DB.UpdateHoursMedal2(id)
	}

	// Hours medal 3
	hoursDb, err = c.DB.GetHoursMedal3(id)
	if err != nil {
		return err
	}

	hoursCheck = CheckObtained(hours, 10)

	if(hoursCheck != hoursDb) {
		c.DB.UpdateHoursMedal3(id)
	}

	return nil
}

func (c* Controller) CheckSessionsMedal(id string) error{
	
	// Sessions var
	sessions, err := c.DB.GetSessions(id)
	if err != nil {
		return err
	}

	// Sessions medal 1
	sessionsDb, err := c.DB.GetSessionMedal1(id)
	if err != nil {
		return err
	}

	sessionsCheck := CheckObtained(sessions, 1)

	if(sessionsCheck != sessionsDb) {
		c.DB.UpdateSessionsMedal1(id)
	}

	// Sessions medal 2
	sessionsDb, err = c.DB.GetSessionMedal2(id)
	if err != nil {
		return err
	}

	sessionsCheck = CheckObtained(sessions, 10)

	if(sessionsCheck != sessionsDb) {
		c.DB.UpdateSessionsMedal2(id)
	}

	// Sessions medal 3
	sessionsDb, err = c.DB.GetSessionMedal3(id)
	if err != nil {
		return err
	}

	sessionsCheck = CheckObtained(sessions, 20)

	if(sessionsCheck != sessionsDb) {
		c.DB.UpdateSessionsMedal3(id)
	}

	return nil
}

func (c* Controller) CheckBackgroundsMedals(id string) error{
	
	// Background var
	background, err := c.DB.GetBackgroundsUnlocked(id)
	if err != nil {
		return err
	}

	// Background medal 1
	backgroundDb, err := c.DB.GetBackgroundMedal1(id)
	if err != nil {
		return err
	}
	
	backgroundsCheck := CheckObtained(background, 2)

	if(backgroundsCheck != backgroundDb) {
		c.DB.UpdateBackgroundsMedal1(id)
	}

	// Background medal 2
	backgroundDb, err = c.DB.GetBackgroundMedal2(id)
	if err != nil {
		return err
	}
	
	backgroundsCheck = CheckObtained(background, 5)

	if(backgroundsCheck != backgroundDb) {
		c.DB.UpdateBackgroundsMedal2(id)
	}

	// Background medal 3
	backgroundDb, err = c.DB.GetBackgroundMedal3(id)
	if err != nil {
		return err
	}
	
	backgroundsCheck = CheckObtained(background, 7)

	if(backgroundsCheck != backgroundDb) {
		c.DB.UpdateBackgroundsMedal3(id)
	}
	

	return nil
}

func (c* Controller) CheckAvatarMedals(id string) error{
	
	// Avatar var
	avatar, err := c.DB.GetAvatarUnlocked(id)
	if err != nil {
		return err
	}
	
	// Avatar medal 1
	avatarDb, err := c.DB.GetAvatarsMedal1(id)
	if err != nil {
		return err
	}
	
	avatarCheck := CheckObtained(avatar, 2)

	if(avatarCheck != avatarDb) {
		c.DB.UpdateAvatarsMedal1(id)
	}

	// Avatar medal 2
	avatarDb, err = c.DB.GetAvatarsMedal2(id)
	if err != nil {
		return err
	}
	
	avatarCheck = CheckObtained(avatar, 5)

	if(avatarCheck != avatarDb) {
		c.DB.UpdateAvatarsMedal2(id)
	}

	// Avatar medal 1
	avatarDb, err = c.DB.GetAvatarsMedal3(id)
	if err != nil {
		return err
	}
	
	avatarCheck = CheckObtained(avatar, 10)

	if(avatarCheck != avatarDb) {
		c.DB.UpdateAvatarsMedal3(id)
	}

	return nil
}

func (c *Controller) AchievementsUnlockCheck(id string) error{
	
	err := c.CheckLevelMedals(id)
	if err != nil {
		return err
	}

	err = c.CheckHoursMedal(id)
	if err != nil {
		return err
	}

	err = c.CheckSessionsMedal(id)
	if err != nil {
		return err
	}

	return nil
}


