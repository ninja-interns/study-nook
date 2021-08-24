package auth

import (
	"fmt"

	initializeDB "main.go/initializedb"
)

func GetUserById(id int) (*User, error) {
	fmt.Println("Find user by id:", id)
	sqlStatement := `SELECT * FROM users WHERE id = $1`
	result := &User{}
	err := initializeDB.Db.QueryRow(sqlStatement, id).Scan(&result.Id, &result.Email, &result.Password, &result.Name, &result.Username)
	if err != nil {
		return nil, err
	}
	return result, nil
}
