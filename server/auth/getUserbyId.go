package auth

import (
	"context"
	"fmt"

	initializeDB "main.go/initializedb"
)

func GetUserById(id int) (*User, error) {
	fmt.Println("GetUserById:", id)
	sqlStatement := `SELECT email, name, username FROM users WHERE id = $1`
	result := &User{}
	err := initializeDB.Conn.QueryRow(context.Background(), sqlStatement, id).Scan(&result.Email, &result.Name, &result.Username)
	if err != nil {
		return nil, err
	}
	return result, nil
}
