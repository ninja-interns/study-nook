package db

import (
	"context"
)

// Creates User Achivements will create a new row for user achievements
func (db *DB) CreateUserAchievements(id string) error {
	sqlStatement := `INSERT INTO user_achievements VALUES ($1, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false);`

	_, err := db.Conn.Exec(context.Background(), sqlStatement, id, "zone1", "avatar1")
	if err != nil {
		return err
	}

	return nil
}

func (db *DB) GetLevelMedal1(id string) (bool,error) {

	var returnItem bool

	sqlStatement := `SELECT level_medal_1 FROM user_achievements WHERE id = $1;`

	err := db.Conn.QueryRow(context.Background(), sqlStatement, id).Scan(&returnItem)
	if err != nil {
		return returnItem, err
	}

	return returnItem, nil
}

func (db *DB) GetLevelMedal2(id string) (bool,error) {

	var returnItem bool

	sqlStatement := `SELECT level_medal_2 FROM user_achievements WHERE id = $1;`

	err := db.Conn.QueryRow(context.Background(), sqlStatement, id).Scan(&returnItem)
	if err != nil {
		return returnItem, err
	}

	return returnItem, nil
}

func (db *DB) GetLevelMedal3(id string) (bool,error) {

	var returnItem bool

	sqlStatement := `SELECT level_medal_3 FROM user_achievements WHERE id = $1;`

	err := db.Conn.QueryRow(context.Background(), sqlStatement, id).Scan(&returnItem)
	if err != nil {
		return returnItem, err
	}

	return returnItem, nil
}

func (db *DB) GetSessionMedal1(id string) (bool,error) {

	var returnItem bool

	sqlStatement := `SELECT sessions_medal_1 FROM user_achievements WHERE id = $1;`

	err := db.Conn.QueryRow(context.Background(), sqlStatement, id).Scan(&returnItem)
	if err != nil {
		return returnItem, err
	}

	return returnItem, nil
}

func (db *DB) GetSessionMedal2(id string) (bool,error) {

	var returnItem bool

	sqlStatement := `SELECT sessions_medal_2 FROM user_achievements WHERE id = $1;`

	err := db.Conn.QueryRow(context.Background(), sqlStatement, id).Scan(&returnItem)
	if err != nil {
		return returnItem, err
	}

	return returnItem, nil
}

func (db *DB) GetSessionMedal3(id string) (bool,error) {

	var returnItem bool

	sqlStatement := `SELECT sessions_medal_3 FROM user_achievements WHERE id = $1;`

	err := db.Conn.QueryRow(context.Background(), sqlStatement, id).Scan(&returnItem)
	if err != nil {
		return returnItem, err
	}

	return returnItem, nil
}

func (db *DB) GetHoursMedal1(id string) (bool,error) {

	var returnItem bool

	sqlStatement := `SELECT hours_medal_1 FROM user_achievements WHERE id = $1;`

	err := db.Conn.QueryRow(context.Background(), sqlStatement, id).Scan(&returnItem)
	if err != nil {
		return returnItem, err
	}

	return returnItem, nil
}

func (db *DB) GetHoursMedal2(id string) (bool,error) {

	var returnItem bool

	sqlStatement := `SELECT hours_medal_2 FROM user_achievements WHERE id = $1;`

	err := db.Conn.QueryRow(context.Background(), sqlStatement, id).Scan(&returnItem)
	if err != nil {
		return returnItem, err
	}

	return returnItem, nil
}

func (db *DB) GetHoursMedal3(id string) (bool,error) {

	var returnItem bool

	sqlStatement := `SELECT hours_medal_3 FROM user_achievements WHERE id = $1;`

	err := db.Conn.QueryRow(context.Background(), sqlStatement, id).Scan(&returnItem)
	if err != nil {
		return returnItem, err
	}

	return returnItem, nil
}

func (db *DB) GetBackgroundMedal1(id string) (bool,error) {

	var returnItem bool

	sqlStatement := `SELECT backgrounds_medal_1 FROM user_achievements WHERE id = $1;`

	err := db.Conn.QueryRow(context.Background(), sqlStatement, id).Scan(&returnItem)
	if err != nil {
		return returnItem, err
	}

	return returnItem, nil
}

func (db *DB) GetBackgroundMedal2(id string) (bool,error) {

	var returnItem bool

	sqlStatement := `SELECT backgrounds_medal_2 FROM user_achievements WHERE id = $1;`

	err := db.Conn.QueryRow(context.Background(), sqlStatement, id).Scan(&returnItem)
	if err != nil {
		return returnItem, err
	}

	return returnItem, nil
}

func (db *DB) GetBackgroundMedal3(id string) (bool,error) {

	var returnItem bool

	sqlStatement := `SELECT backgrounds_medal_3 FROM user_achievements WHERE id = $1;`

	err := db.Conn.QueryRow(context.Background(), sqlStatement, id).Scan(&returnItem)
	if err != nil {
		return returnItem, err
	}

	return returnItem, nil
}

func (db *DB) GetAvatarsMedal1(id string) (bool,error) {

	var returnItem bool

	sqlStatement := `SELECT avatars_medal_1 FROM user_achievements WHERE id = $1;`

	err := db.Conn.QueryRow(context.Background(), sqlStatement, id).Scan(&returnItem)
	if err != nil {
		return returnItem, err
	}

	return returnItem, nil
}

func (db *DB) GetAvatarsMedal2(id string) (bool,error) {

	var returnItem bool

	sqlStatement := `SELECT avatars_medal_2 FROM user_achievements WHERE id = $1;`

	err := db.Conn.QueryRow(context.Background(), sqlStatement, id).Scan(&returnItem)
	if err != nil {
		return returnItem, err
	}

	return returnItem, nil
}

func (db *DB) GetAvatarsMedal3(id string) (bool,error) {

	var returnItem bool

	sqlStatement := `SELECT avatars_medal_3 FROM user_achievements WHERE id = $1;`

	err := db.Conn.QueryRow(context.Background(), sqlStatement, id).Scan(&returnItem)
	if err != nil {
		return returnItem, err
	}

	return returnItem, nil
}
