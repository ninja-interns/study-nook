package db

import (
	"context"
	"errors"
	"net/http"

	"github.com/georgysavva/scany/pgxscan"
	"studynook.go"
)

// GetAdminByID returns a admin with given email
func (db *DB) GetAdminByID(ctx context.Context, id string) (*studynook.Admin, error) {

	a := &studynook.Admin{}
	query := `SELECT id, name, email, type FROM admins WHERE id = $1;`
	err := db.Conn.QueryRow(ctx, query, id).Scan(&a.ID, &a.Name, &a.Email, &a.AdminType)
	if err != nil {
		return nil, err
	}
	return a, nil
}

// GetAdminByEmail returns a admin with password_hash for given email
func (db *DB) GetAdminByEmail(ctx context.Context, email string) (*studynook.Admin, error) {
	query := `SELECT id, email, password_hash, admin_type FROM admins WHERE email = $1;`
	a := &studynook.Admin{}
	err := db.Conn.QueryRow(ctx, query, email).Scan(&a.ID, &a.Email, &a.PasswordHash, &a.AdminType)
	if err != nil {
		return nil, err
	}
	return a, nil
}

// GetAllAdmins gets all the admins from database
func (db *DB) GetAllAdmins(ctx context.Context) ([]*studynook.Admin, error) {
	admins := []*studynook.Admin{}
	query := `SELECT id, name, email, type AS type FROM admins;`
	err := pgxscan.Select(ctx, db.Conn, &admins, query)
	if err != nil {
		return nil, err
	}
	return admins, nil
}

// AddAdmin inserts a admin in the database
func (db *DB) AddAdmin(ctx context.Context, a *studynook.Admin) error {

	query := `INSERT INTO admins (id, name, email, type, password_hash) VALUES ($1, $2, $3, $4, $5);`
	_, err := db.Conn.Exec(ctx, query, a.ID, a.Name, a.Email, a.AdminType, a.PasswordHash)
	if err != nil {
		return err
	}
	return nil
}

// UpdateAdmin updates the admin with given ID
func (db *DB) UpdateAdmin(ctx context.Context, id string, a *studynook.Admin) error {

	query := `UPDATE admins SET name = $1, email = $2, type = $3, password_hash = $4 WHERE id = $5;`
	res, err := db.Conn.Exec(ctx, query, a.Name, a.Email, a.AdminType, a.PasswordHash, id)
	if err != nil {
		return err
	}
	if res.RowsAffected() == 0 {
		return errors.New(http.StatusText(http.StatusNotFound))
	}
	return nil
}

// UpdateAdminExceptPassword updates the admin except password
func (db *DB) UpdateAdminExceptPassword(ctx context.Context, id string, a *studynook.Admin) error {

	query := `UPDATE admins SET name = $1, email = $2, type = $3 WHERE id = $4;`
	res, err := db.Conn.Exec(ctx, query, a.Name, a.Email, a.AdminType, id)
	if err != nil {
		return err
	}
	if res.RowsAffected() == 0 {
		return errors.New(http.StatusText(http.StatusNotFound))
	}
	return nil
}

// DeleteAdminByID deletes the admin with given ID
func (db *DB) DeleteAdminByID(ctx context.Context, id string) error {
	query := `DELETE FROM admins WHERE id = $1;`
	res, err := db.Conn.Exec(ctx, query, id)
	if err != nil {
		return err
	}
	if res.RowsAffected() == 0 {
		return errors.New(http.StatusText(http.StatusNotFound))
	}
	return nil
}
