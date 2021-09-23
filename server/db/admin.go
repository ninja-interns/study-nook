package db

import (
	"context"

	"studynook.go"
)

// GetAdminByEmail returns a admin with given email
func (db *DB) GetAdminByEmail(ctx context.Context, email string) (*studynook.Admin, error) {
	query := `SELECT id, email, password_hash FROM admins WHERE email = $1`
	admin := &studynook.Admin{}
	err := db.Conn.QueryRow(ctx, query, email).Scan(&admin.ID, &admin.Email, &admin.PasswordHash)
	if err != nil {
		return admin, err
	}

	return admin, nil
}
