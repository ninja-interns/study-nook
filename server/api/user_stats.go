package api

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"studynook.go"
)

type Level struct {
	Experience string `json:"experience"`
}

type Time struct {
	Experience string `json:"experience"`
}

type LevelResponse struct {
	Level int `json:"level"`
}

// Function to calculate session rewards after session finshes
func (c *Controller) CalculateSessionRewards(minutes int, id string) {

	time := minutes

	sqlStatement := `SELECT exp_amount FROM user_stats WHERE id = $1`

	var exp int

	err := c.DB.Conn.QueryRow(context.Background(), sqlStatement, id).Scan(&exp)
	if err != nil {
		fmt.Println(err)
	}

	expGained := CalculateEXPTime(time)
	coinsGained := CalculateCoinsTime(exp, time)

	c.UpdateEXPAmount(expGained, id)
	c.UpdateCoins(coinsGained, id)

}

func (c *Controller) GetCoins(selectItem string, id string) (int, error) {

	sqlStatement := `SELECT $1 FROM user_stats WHERE id = $2;`

	returnItem := 0

	err := c.DB.Conn.QueryRow(context.Background(), sqlStatement, selectItem, id).Scan(returnItem)
	if err != nil {
		return returnItem, err
	}
	return returnItem, nil
}

func (c *Controller) UpdateCoins(coins int, id string) error {

	sqlStatement := `UPDATE user_stats SET coins = coins + $1 WHERE id = $2;`

	_, err := c.DB.Conn.Exec(context.Background(), sqlStatement, coins, id)
	if err != nil {
		return err
	}
	return nil
}

func (c *Controller) UpdateEXPAmount(exp int, id string) error {

	sqlStatement := `UPDATE user_stats SET exp_amount = exp_amount + $1 WHERE id = $2;`

	_, err := c.DB.Conn.Exec(context.Background(), sqlStatement, exp, id)
	if err != nil {
		return err
	}
	return nil
}

func (c *Controller) UpdateSessions(id string) error {

	sqlStatement := `UPDATE user_stats SET sessions_completed = sessions_completed + 1 WHERE id = $1;`

	_, err := c.DB.Conn.Exec(context.Background(), sqlStatement, id)
	if err != nil {
		return err
	}
	return nil
}

func (c *Controller) UpdateHoursNooked(hours int, id string) error {

	sqlStatement := `UPDATE user_stats SET hours_nooked = hours_nooked + $1 WHERE id = $2;`

	_, err := c.DB.Conn.Exec(context.Background(), sqlStatement, hours, id)
	if err != nil {
		return err
	}
	return nil
}

func (c *Controller) UpdateAchievementsUnlocked(id string) error {

	sqlStatement := `UPDATE user_stats SET achievements_unlocked = achievements_unlocked + 1 WHERE id = $1;`

	_, err := c.DB.Conn.Exec(context.Background(), sqlStatement, id)
	if err != nil {
		return err
	}
	return nil
}

func (c *Controller) UpdateBackgroundsUnlocked(id string) error {

	sqlStatement := `UPDATE user_stats SET backgrounds_unlocked = backgrounds_unlocked + 1 WHERE id = $1;`

	_, err := c.DB.Conn.Exec(context.Background(), sqlStatement, id)
	if err != nil {
		return err
	}
	return nil
}

// Function to check based on total Experience points,
// which level group the user is at.
func CheckLevelGroup(currentExp int) string {

	if currentExp > 0 && currentExp < 5000 {
		return "A"
	} else if currentExp >= 5000 && currentExp < 11250 {
		return "B"
	} else if currentExp >= 11250 && currentExp < 22500 {
		return "C"
	} else if currentExp >= 22500 && currentExp < 37500 {
		return "D"
	} else if currentExp >= 37500 && currentExp < 77500 {
		return "E"
	} else if currentExp >= 77500 && currentExp < 127500 {
		return "F"
	} else {
		return "G"
	}
}

// Get number of coins that specific level group can get per minute
func GetCoinsLevelGroup(levelGroup string) int {
	if levelGroup == "A" || levelGroup == "B" {
		return 1
	} else if levelGroup == "C" || levelGroup == "D" {
		return 2
	} else if levelGroup == "E" || levelGroup == "F" {
		return 3
	} else {
		return 4
	}

}

// Calculate how much coins did the user earned in the session
// It requires level group in order to get how much that user
// earns per minute
func CalculateCoinsTime(exp int, minutesInt int) int {

	levelGroup := CheckLevelGroup(exp)
	groupCoins := GetCoinsLevelGroup(levelGroup)

	return groupCoins * minutesInt
}

// Function to calculate in which level user is determined by how much EXP user has
func GetLevelEXP(passedLevels int, passedEXP int, necessaryEXP int, currentEXP int) int {
	currentEXP -= passedEXP
	currentLevel := currentEXP / necessaryEXP
	currentLevel += passedLevels

	return currentLevel
}

// Function to calculate level by total EXP points user has
// It requires level group
func CalculateLevelEXP(currentExp int) int {

	levelGroup := CheckLevelGroup(currentExp)

	// Conditional statement to check in which level group the EXP is in
	// If it pertains to any group, another function will be called in order to
	// get the exact level in which the currentExp is in.
	if levelGroup == "A" {
		return GetLevelEXP(1, 0, 1000, currentExp)
	} else if levelGroup == "B" {
		return GetLevelEXP(5, 5000, 1500, currentExp)
	} else if levelGroup == "C" {
		return GetLevelEXP(10, 11250, 2000, currentExp)
	} else if levelGroup == "D" {
		return GetLevelEXP(15, 22500, 3000, currentExp)
	} else if levelGroup == "E" {
		return GetLevelEXP(20, 37500, 4000, currentExp)
	} else if levelGroup == "F" {
		return GetLevelEXP(30, 77500, 5000, currentExp)
	} else {
		return GetLevelEXP(40, 127500, 6000, currentExp)
	}
}

// Calculate EXP over time
func CalculateEXPTime(minutes int) int {
	return minutes * 50
}

func CalculateEXPHandler(w http.ResponseWriter, r *http.Request, u *studynook.User) {

	time := &Time{}
	err := json.NewDecoder(r.Body).Decode(time)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	minutesInt, err := strconv.Atoi(time.Experience)
	if err != nil {
		fmt.Println(err)
	}

	expGained := CalculateEXPTime(minutesInt)

	fmt.Println("EXP gained is: ", expGained)
}

func GetLevelHandler(w http.ResponseWriter, r *http.Request, u *studynook.User) {

	level := &Level{}

	err := json.NewDecoder(r.Body).Decode(level)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	currentExp, err := strconv.Atoi(level.Experience)
	if err != nil {
		fmt.Println(err)
	}

	userLevel := CalculateLevelEXP(currentExp)

	fmt.Println(userLevel)

}
