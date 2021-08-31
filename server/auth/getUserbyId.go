package auth

import (
	"context"

	initializeDB "main.go/initializedb"
)

func GetUserById(id int) (*User, error) {
	sqlStatement := `SELECT email, name, username FROM users WHERE id = $1`
	result := &User{}
	err := initializeDB.Conn.QueryRow(context.Background(), sqlStatement, id).Scan(&result.Email, &result.Name, &result.Username)
	if err != nil {
		return nil, err
	}
	result.ID = id

	return result, nil
}
