package db

import (
	"context"

	"github.com/georgysavva/scany/pgxscan"
	"studynook.go"
)

// GetAllUsers fetches all the users from the database
func (db *DB) GetAllUsers(ctx context.Context) ([]*studynook.User, error) {

	userList := []*studynook.User{}
	query := `SELECT id, email, name, username, is_verified, token FROM users ORDER BY ID DESC`
	err := pgxscan.Select(ctx, db.Conn, &userList, query)
	if err != nil {
		return userList, err
	}
	return userList, nil

}

// AddUser inserts a user in the database
func (db *DB) AddUser(ctx context.Context, user *studynook.User) error {
	query := `INSERT INTO users (id, email, password_hash, name, username, is_verified, token) VALUES ($1, $2, $3, $4, $5, $6, $7)`
	_, err := db.Conn.Exec(ctx, query, user.ID, user.Email, user.PasswordHash, user.Name, user.Username, user.IsVerified, user.Token)
	if err != nil {
		return err
	}
	return nil
}

// GetUserByID returns a user with given ID
func (db *DB) GetUserByID(ctx context.Context, userID string) (*studynook.User, error) {
	query := `SELECT id, email, name, username, is_verified, token FROM users WHERE id = $1`
	user := &studynook.User{}
	err := db.Conn.QueryRow(ctx, query, userID).Scan(&user.ID, &user.Email, &user.Name, &user.Username, &user.IsVerified, &user.Token)
	if err != nil {
		return user, err
	}

	return user, nil
}

// UpdateUser updates the user with given ID
func (db *DB) UpdateUser(ctx context.Context, userID string, userData *studynook.User) error {
	query := `UPDATE users SET email=$1, name=$2, username=$3, password_hash=$4, is_verified=$5, token=$6 WHERE id=$7`
	res, err := db.Conn.Exec(ctx, query, userData.Email, userData.Name, userData.Username, userData.PasswordHash, userData.IsVerified, userData.Token, userID)
	if err != nil || res.RowsAffected() == 0 {
		return err
	}
	return nil
}

// UpdateUserExceptPassword updates the user except password
func (db *DB) UpdateUserExceptPassword(ctx context.Context, userID string, userData *studynook.User) error {
	query := `UPDATE users SET email=$1, name=$2, username=$3, is_verified=$4, token=$5 WHERE id=$6`
	res, err := db.Conn.Exec(ctx, query, userData.Email, userData.Name, userData.Username, userData.IsVerified, userData.Token, userID)
	if err != nil || res.RowsAffected() == 0 {
		return err
	}
	return nil
}

// DeleteUser deletes the user with given ID
func (db *DB) DeleteUser(ctx context.Context, userID string) error {
	query := `DELETE FROM users where id = $1`
	res, err := db.Conn.Exec(ctx, query, userID)
	if err != nil || res.RowsAffected() == 0 {
		return err
	}
	return nil
}
