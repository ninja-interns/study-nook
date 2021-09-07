package db

import (
	"context"

	"studynook.go/schema"
)

//GetAllUsers fetches all the users from the database
func GetAllUsers() ([]schema.User, error) {

	userList := []schema.User{}

	query := `SELECT id, email, name, username FROM users ORDER BY ID DESC`
	rows, err := Conn.Query(context.Background(), query)
	if err != nil {
		return userList, err
	}

	for rows.Next() {
		var user schema.User
		err := rows.Scan(&user.ID, &user.Email, &user.Name, &user.Username)

		if err != nil {
			return userList, err
		}
		userList = append(userList, user)
	}

	return userList, nil
}

//AddUser inserts a user in the database
func AddUser(user schema.User) error {
	query := `INSERT INTO users (email, name, username, password) VALUES ($1,$2,$3,$4)`
	_, err := Conn.Exec(context.Background(), query, user.Email, user.Name, user.Username, user.Password)
	if err != nil {
		return err
	}
	return nil
}

//GetUserByID returns a user with given ID
func GetUserByID(userID int) (schema.User, error) {
	query := `SELECT id, email, name, username FROM users WHERE id = $1`
	user := schema.User{}
	err := Conn.QueryRow(context.Background(), query, userID).Scan(&user.ID, &user.Email, &user.Name, &user.Username)
	if err != nil {
		return user, err
	}

	return user, nil
}

//UpdateUser updates the user with given ID
func UpdateUser(userID int, userData schema.User) error {
	query := `UPDATE users SET email=$1, name=$2, username=$3, password=$4 WHERE id=$5`
	res, err := Conn.Exec(context.Background(), query, userData.Email, userData.Name, userData.Username, userData.Password, userID)
	if err != nil || res.RowsAffected() == 0 {
		return err
	}
	return nil
}

//DeleteUser deletes the user with given ID
func DeleteUser(userID int) error {
	query := `DELETE FROM users where id = $1;`
	res, err := Conn.Exec(context.Background(), query, userID)
	if err != nil || res.RowsAffected() == 0 {
		return err
	}
	return nil
}
