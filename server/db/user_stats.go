package db

import (
	"context"
)

type User_Stats struct {
	ID			string `json:"id"`
	EXP 		string `json:"exp_amount"`
	Sessions 	int `json:"sessions_completed"`
	HoursNooked int `json:"hours_nooked"`
	Achievements int `json:"achievements_unlocked"`
	Backgrounds	int `json:"backgrounds_unlocked"`
	Coins		int `json:"coins"`
}

/*
 * Insert methods
 */
func (db *DB) CreateUserStats(id string) error {
	sqlStatement := `INSERT INTO user_stats VALUES ($1, 0, 0, 0, 0, 0, 50);`

	_, err := db.Conn.Exec(context.Background(), sqlStatement, id)
	if err != nil {
		return err
	}

	return nil
}

/*
 * Update methods
 */

// Update coins method
func (db *DB) UpdateCoins(coins int, id string) error {

	sqlStatement := `UPDATE user_stats SET coins = coins + $1 WHERE id = $2;`

	_, err := db.Conn.Exec(context.Background(), sqlStatement, coins, id)
	if err != nil {
		return err
	}
	return nil
}

// Update EXP Amount Method
func (db *DB) UpdateEXPAmount(exp int, id string) error {

	sqlStatement := `UPDATE user_stats SET exp_amount = exp_amount + $1 WHERE id = $2;`

	_, err := db.Conn.Exec(context.Background(), sqlStatement, exp, id)
	if err != nil {
		return err
	}
	return nil
}

// Update Sessions Method
func (db *DB) UpdateSessions(id string) error {

	sqlStatement := `UPDATE user_stats SET sessions_completed = sessions_completed + 1 WHERE id = $1;`

	_, err := db.Conn.Exec(context.Background(), sqlStatement, id)
	if err != nil {
		return err
	}
	return nil
}

// Update Hours Nooked Method
func (db *DB) UpdateHoursNooked(hours int, id string) error {

	sqlStatement := `UPDATE user_stats SET hours_nooked = hours_nooked + $1 WHERE id = $2;`

	_, err := db.Conn.Exec(context.Background(), sqlStatement, hours, id)
	if err != nil {
		return err
	}
	return nil
}

// Update Achievemenets Method
func (db *DB) UpdateAchievementsUnlocked(id string) error {

	sqlStatement := `UPDATE user_stats SET achievements_unlocked = achievements_unlocked + 1 WHERE id = $1;`

	_, err := db.Conn.Exec(context.Background(), sqlStatement, id)
	if err != nil {
		return err
	}
	return nil
}

// Update Backgrounds Method
func (db *DB) UpdateBackgroundsUnlocked(id string) error {

	sqlStatement := `UPDATE user_stats SET backgrounds_unlocked = backgrounds_unlocked + 1 WHERE id = $1;`

	_, err := db.Conn.Exec(context.Background(), sqlStatement, id)
	if err != nil {
		return err
	}
	return nil
}

/*
 * Get methods
 */
func (db *DB) GetCoins(id string) (int, error) {

	sqlStatement := `SELECT coins FROM user_stats WHERE id = $1;`

	//fmt.Println(id)

	var returnItem int

	err := db.Conn.QueryRow(context.Background(), sqlStatement, id).Scan(&returnItem)
	if err != nil {
		return returnItem, err
	}
	return returnItem, nil
}

func (db *DB) GetEXPAmount(id string) (int, error) {

	sqlStatement := `SELECT exp_amount FROM user_stats WHERE id = $1;`

	var exp int

	err := db.Conn.QueryRow(context.Background(), sqlStatement, id).Scan(&exp)
	if err != nil {
		return exp, err
	}
	return exp, nil
}

func (db *DB) GetSessions(id string) (int, error) {

	sqlStatement := `SELECT coins FROM user_stats WHERE id = $1;`

	//fmt.Println(id)

	var sessions int

	err := db.Conn.QueryRow(context.Background(), sqlStatement, id).Scan(&sessions)
	if err != nil {
		return sessions, err
	}
	return sessions, nil
}

func (db *DB) GetHoursNooked(id string) (int, error) {

	sqlStatement := `SELECT coins FROM user_stats WHERE id = $1;`

	var hoursNooked int

	err := db.Conn.QueryRow(context.Background(), sqlStatement, id).Scan(&hoursNooked)
	if err != nil {
		return hoursNooked, err
	}
	return hoursNooked, nil
}

func (db *DB) GetAchievements(id string) (int, error) {

	sqlStatement := `SELECT coins FROM user_stats WHERE id = $1;`

	var achievementsUnlocked int

	err := db.Conn.QueryRow(context.Background(), sqlStatement, id).Scan(&achievementsUnlocked)
	if err != nil {
		return achievementsUnlocked, err
	}
	return achievementsUnlocked, nil
}

func (db *DB) GetBackgrounds(id string) (int, error) {

	sqlStatement := `SELECT coins FROM user_stats WHERE id = $1;`

	var backgroundsUnlocked int

	err := db.Conn.QueryRow(context.Background(), sqlStatement, id).Scan(&backgroundsUnlocked)
	if err != nil {
		return backgroundsUnlocked, err
	}
	return backgroundsUnlocked, nil
}
