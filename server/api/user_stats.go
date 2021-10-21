package api

// Calculate session rewards will update all the changes on the DB
// based on session settings
func (c *Controller) CalculateSessionRewards(minutes int, id string) error{

	time := minutes

	exp, err := c.DB.GetEXPAmount(id)
	if err != nil {
		return err
	}

	expGained := CalculateEXPTime(time)
	coinsGained := CalculateCoinsTime(exp, time)

	err = c.DB.UpdateEXPAmount(expGained, id)
	if err != nil {
		return err
	}

	err = c.DB.UpdateCoins(coinsGained, id)
	if err != nil {
		return err
	}
	
	err = c.DB.UpdateHoursNooked(minutes, id)
	if err != nil {
		return err
	}

	err = c.DB.UpdateSessions(id)
	if err != nil {
		return err
	}

	return nil
}

// Check level group will check in which level user is 
// based on user's total amount experience and return a char
// representing their group
func CheckLevelGroup(currentExp int) string {

	switch {
	case currentExp > 0 && currentExp < 5000:
		return "A"
	case currentExp >= 5000 && currentExp < 11250:
		return "B"
	case currentExp >= 11250 && currentExp < 22500:
		return "C"
	case currentExp >= 22500 && currentExp < 37500:
		return "D"
	case currentExp >= 37500 && currentExp < 77500:
		return "E"
	case currentExp >= 77500 && currentExp < 127500:
		return "F"
	default:
		return "G"
	}
}

// Get Coins Level Group will get number of coins that specific level group 
// can get per minute in a session
func GetCoinsLevelGroup(levelGroup string) int {

	switch levelGroup{
	case  "A", "B":
		return 1
	case "C", "D":
		return 2
	case "E", "F":
		return 3
	default:
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

// Function to calculate in which level user is and how far on EXP that user is
// this function returns users current level and how far the user is in that level
func GetLevelEXP(passedLevels int, passedEXP int, necessaryEXP int, currentEXP int) (int, int) {
	currentEXP -= passedEXP
	currentLevel := currentEXP / necessaryEXP
	oldLevel := currentLevel
	currentLevel += passedLevels

	var percentage float32

	if oldLevel != 0 {
		percentage = float32((currentEXP / oldLevel) - necessaryEXP)
		percentage = (percentage / float32(necessaryEXP)) * 100
	} else {
		percentage = (float32(currentEXP) / float32(necessaryEXP)) * 100
	}
	
	return currentLevel, int(percentage)
}

func (c *Controller) GetLevel(id string) (int, error) {

	exp, err := c.DB.GetEXPAmount(id)
	if err != nil {
		return 0, err
	}

	level, _ := CalculateLevelEXP(exp)

	return level, nil
}

// Function to calculate level by total EXP points user has
// It requires level group
func CalculateLevelEXP(currentExp int) (int, int) {

	levelGroup := CheckLevelGroup(currentExp)

	// Switch statement to check in which level group the EXP is in
	// If it pertains to any group, another function will be called in order to
	// get the exact level in which the currentExp is in.
	switch levelGroup {
	case "A":
		return GetLevelEXP(1, 0, 1000, currentExp)
	case "B":
		return GetLevelEXP(5, 5000, 1500, currentExp)
	case "C":
		return GetLevelEXP(10, 12500, 2000, currentExp)
	case "D":
		return GetLevelEXP(15, 22500, 3000, currentExp)
	case "E":
		return GetLevelEXP(20, 37500, 4000, currentExp)
	case "F":
		return GetLevelEXP(30, 77500, 5000, currentExp)
	default:
		return GetLevelEXP(40, 127500, 6000, currentExp)
	}
}

// Calculate EXP over time
func CalculateEXPTime(minutes int) int {
	return minutes * 50
}
