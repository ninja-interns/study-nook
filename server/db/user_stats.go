package db

import "context"

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
func (db *DB) GetItem(selectItem string, id string) (int, error) {

	sqlStatement := `SELECT $1 FROM user_stats WHERE id = $2;`

	returnItem := 0

	err := db.Conn.QueryRow(context.Background(), sqlStatement, selectItem, id).Scan(returnItem)
	if err != nil {
		return returnItem, err
	}
	return returnItem, nil
}
