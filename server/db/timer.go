package db

import (
	"context"

	"studynook.go"
)

// GetUserByID returns a user with given ID
func (db *DB) (ctx context.Context, userID string) (*studynook.User, error) {
	query := `SELECT id, email, name, username, is_verified, token FROM users WHERE id = $1`
	user := &studynook.User{}
	err := db.Conn.QueryRow(ctx, query, userID).Scan(&user.ID, &user.Email, &user.Name, &user.Username, &user.IsVerified, &user.Token)
	if err != nil {
		return user, err
	}

	return user, nil
}
