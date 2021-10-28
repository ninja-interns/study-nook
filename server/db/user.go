package db

import (
	"context"
	"errors"
	"net/http"

	"github.com/georgysavva/scany/pgxscan"
	"studynook.go"
)

// GetAllUsers fetches all the users from the database
func (db *DB) GetAllUsers(ctx context.Context) ([]*studynook.User, error) {

	users := []*studynook.User{}
	query := `SELECT id, email, name, username, is_verified, token FROM users ORDER BY ID DESC;`
	err := pgxscan.Select(ctx, db.Conn, &users, query)
	if err != nil {
		return nil, err
	}
	return users, nil

}

// AddUser inserts a user in the database
func (db *DB) AddUser(ctx context.Context, u *studynook.User) error {

	query := `INSERT INTO users (id, email, password_hash, name, username, is_verified, token) VALUES ($1, $2, $3, $4, $5, $6, $7);`
	_, err := db.Conn.Exec(ctx, query, u.ID, u.Email, u.PasswordHash, u.Name, u.Username, u.IsVerified, u.Token)
	if err != nil {
		return err
	}
	return nil

}

// GetUserByID returns a user with given ID
func (db *DB) GetUserByID(ctx context.Context, id string) (*studynook.User, error) {

	u := &studynook.User{}
	query := `SELECT id, email, name, username, is_verified, token FROM users WHERE id = $1;`
	err := db.Conn.QueryRow(ctx, query, id).Scan(&u.ID, &u.Email, &u.Name, &u.Username, &u.IsVerified, &u.Token)
	if err != nil {
		return nil, err
	}
	return u, nil

}

// UpdateUser updates the user with given ID
func (db *DB) UpdateUser(ctx context.Context, id string, u *studynook.User) error {

	query := `UPDATE users SET email = $1, name = $2, username = $3, password_hash = $4 WHERE id = $5;`
	res, err := db.Conn.Exec(ctx, query, u.Email, u.Name, u.Username, u.PasswordHash, id)
	if err != nil {
		return err
	}
	if res.RowsAffected() == 0 {
		return errors.New(http.StatusText(http.StatusNotFound))
	}
	return nil

}

// UpdateUserExceptPassword updates the user except password
func (db *DB) UpdateUserExceptPassword(ctx context.Context, id string, u *studynook.User) error {

	query := `UPDATE users SET email = $1, name = $2, username = $3 WHERE id = $4;`
	res, err := db.Conn.Exec(ctx, query, u.Email, u.Name, u.Username, id)
	if err != nil {
		return err
	}
	if res.RowsAffected() == 0 {
		return errors.New(http.StatusText(http.StatusNotFound))
	}
	return nil

}

// DeleteUserByID deletes the user with given ID
func (db *DB) DeleteUserByID(ctx context.Context, id string) error {

	query := `DELETE FROM users where id = $1;`
	res, err := db.Conn.Exec(ctx, query, id)
	if err != nil {
		return err
	}
	if res.RowsAffected() == 0 {
		return errors.New(http.StatusText(http.StatusNotFound))
	}
	return nil

}
