package db

import (
	"context"

	"studynook.go/initializedb"
	"studynook.go/schema"
)

// GetAdminByEmail returns a admin with given email
func GetAdminByEmail(ctx context.Context, email string) (*schema.Admin, error) {
	query := `SELECT id, email, password_hash FROM admins WHERE email = $1`
	admin := &schema.Admin{}
	err := initializedb.Conn.QueryRow(ctx, query, email).Scan(&admin.ID, &admin.Email, &admin.PasswordHash)
	if err != nil {
		return admin, err
	}

	return admin, nil
}
