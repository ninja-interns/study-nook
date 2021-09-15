package db

import (
	"context"
	"fmt"

	"github.com/georgysavva/scany/pgxscan"
	"studynook.go/schema"
)

// GetAllUsers fetches all the users from the database
func GetAllUsers(ctx context.Context) ([]*schema.User, error) {

	var userList []*schema.User
	query := `SELECT id, email, name, username, is_verified, token FROM users ORDER BY ID DESC`
	err := pgxscan.Select(ctx, Conn, &userList, query)
	if err != nil {
		return userList, err
	}
	return userList, nil

}

// AddUser inserts a user in the database
func AddUser(ctx context.Context, user *schema.User) error {
	query := `INSERT INTO users (id, email, password_hash, name, username, is_verified, token) VALUES ($1, $2, $3, $4, $5, $6, $7)`
	_, err := Conn.Exec(ctx, query, user.ID, user.Email, user.PasswordHash, user.Name, user.Username, user.IsVerified, user.Token)
	if err != nil {
		return err
	}
	return nil
}

// GetUserByID returns a user with given ID
func GetUserByID(ctx context.Context, userID string) (*schema.User, error) {
	query := `SELECT id, email, name, username, is_verified, token FROM users WHERE id = $1`
	user := &schema.User{}
	err := Conn.QueryRow(ctx, query, userID).Scan(&user.ID, &user.Email, &user.Name, &user.Username, &user.IsVerified, &user.Token)
	if err != nil {
		return user, err
	}

	return user, nil
}

// UpdateUser updates the user with given ID
func UpdateUser(ctx context.Context, userID string, userData *schema.User) error {
	query := `UPDATE users SET email=$1, name=$2, username=$3, password_hash=$4, is_verified=$5, token=$6 WHERE id=$7`
	res, err := Conn.Exec(ctx, query, userData.Email, userData.Name, userData.Username, userData.PasswordHash, userData.IsVerified, userData.Token, userID)
	if err != nil || res.RowsAffected() == 0 {
		fmt.Println(err.Error())
		return err
	}
	return nil
}

// DeleteUser deletes the user with given ID
func DeleteUser(ctx context.Context, userID string) error {
	query := `DELETE FROM users where id = $1`
	res, err := Conn.Exec(ctx, query, userID)
	if err != nil || res.RowsAffected() == 0 {
		return err
	}
	return nil
}
