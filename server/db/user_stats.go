package db

import (
	"context"
)

type User_Stats struct {
	ID			 	string `json:"id"`
	EXP 		 	string `json:"exp_amount"`
	Sessions 	 	int `json:"sessions_completed"`
	HoursNooked  	int `json:"hours_nooked"`
	Achievements 	int `json:"achievements_unlocked"`
	Backgrounds	 	int `json:"backgrounds_unlocked"`
	Coins		 	int `json:"coins"`
}

/*
 * Insert methods
 */

 // Creates a new row for user
func (db *DB) CreateUserStats(id string) error {
	sqlStatement := `INSERT INTO user_stats VALUES ($1, 50, 50, 0, 0, 0, 0, 0, $2, $3);`

	_, err := db.Conn.Exec(context.Background(), sqlStatement, id, "zone1.jpg", "avatar1.svg")
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

// Update Avatar Method
func (db *DB) UpdateAvatarsUnlocked(id string) error {

	sqlStatement := `UPDATE user_stats SET avatars_unlocked = avatars_unlocked + 1 WHERE id = $1;`

	_, err := db.Conn.Exec(context.Background(), sqlStatement, id)
	if err != nil {
		return err
	}
	return nil
}

// Update Current Background Method
func (db *DB) UpdateCurrentBackground(id string, newBackground string) error {

	sqlStatement := `UPDATE user_stats SET current_background = $1 WHERE id = $2;`

	_, err := db.Conn.Exec(context.Background(), sqlStatement, newBackground, id)
	if err != nil {
		return err
	}
	return nil
}

// Update Current Avatar Method
func (db *DB) UpdateCurrentAvatar(id string, newAvatar string) error {

	sqlStatement := `UPDATE user_stats SET current_avatar = $1 WHERE id = $2;`

	_, err := db.Conn.Exec(context.Background(), sqlStatement, newAvatar, id)
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

	sqlStatement := `SELECT session_completed FROM user_stats WHERE id = $1;`

	var sessions int

	err := db.Conn.QueryRow(context.Background(), sqlStatement, id).Scan(&sessions)
	if err != nil {
		return sessions, err
	}
	return sessions, nil
}

func (db *DB) GetHoursNooked(id string) (int, error) {

	sqlStatement := `SELECT hours_nooked FROM user_stats WHERE id = $1;`

	var hoursNooked int

	err := db.Conn.QueryRow(context.Background(), sqlStatement, id).Scan(&hoursNooked)
	if err != nil {
		return hoursNooked, err
	}
	return hoursNooked, nil
}

func (db *DB) GetAchievements(id string) (int, error) {

	sqlStatement := `SELECT achievements FROM user_stats WHERE id = $1;`

	var achievementsUnlocked int

	err := db.Conn.QueryRow(context.Background(), sqlStatement, id).Scan(&achievementsUnlocked)
	if err != nil {
		return achievementsUnlocked, err
	}
	return achievementsUnlocked, nil
}

func (db *DB) GetBackgroundsUnlocked(id string) (int, error) {

	sqlStatement := `SELECT background_unlocked FROM user_stats WHERE id = $1;`

	var backgroundsUnlocked int

	err := db.Conn.QueryRow(context.Background(), sqlStatement, id).Scan(&backgroundsUnlocked)
	if err != nil {
		return backgroundsUnlocked, err
	}
	return backgroundsUnlocked, nil
}

func (db *DB) GetAvatarUnlocked(id string) (int, error) {

	sqlStatement := `SELECT avatars_unlocked FROM user_stats WHERE id = $1;`

	var avatarsUnlocked int

	err := db.Conn.QueryRow(context.Background(), sqlStatement, id).Scan(&avatarsUnlocked)
	if err != nil {
		return avatarsUnlocked, err
	}
	return avatarsUnlocked, nil
}

func (db *DB) GetCurrentBackground(id string) (string, error) {

	sqlStatement := `SELECT current_background FROM user_stats WHERE id = $1;`

	var currentBackground string

	err := db.Conn.QueryRow(context.Background(), sqlStatement, id).Scan(&currentBackground)
	if err != nil {
		return currentBackground, err
	}
	return currentBackground, nil
}

func (db *DB) GetCurrentAvatar(id string) (string, error) {

	sqlStatement := `SELECT current_avatar FROM user_stats WHERE id = $1;`

	var currentAvatar string

	err := db.Conn.QueryRow(context.Background(), sqlStatement, id).Scan(&currentAvatar)
	if err != nil {
		return currentAvatar, err
	}
	return currentAvatar, nil
}
