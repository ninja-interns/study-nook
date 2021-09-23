package db

import (
	"context"
	"fmt"

	"github.com/jackc/pgx/v4/pgxpool"
	"studynook.go"
)

type DB struct {
	Conn *pgxpool.Pool
}

//initializing my database connection
func Connect(user, password, connection, name string) (*pgxpool.Pool, error) {
	connectionString := "postgres://" + user + ":" + password + "@localhost:" + connection + "/" + name + "?sslmode=disable"

	fmt.Println(connectionString)
	conn, err := pgxpool.Connect(context.Background(), connectionString)
	if err != nil {
		return nil, err
	}
	return conn, nil
}

//making the connection available to other packages
func New(conn *pgxpool.Pool) (*DB, error) {
	return &DB{conn}, nil
}

//this method lives on the DB struct so it is also available whereever the DB struct is passed (example in the API controller struct)
func (db *DB) GetUserById(id string) (*studynook.User, error) {
	sqlStatement := `SELECT email, name, username FROM users WHERE id = $1`
	result := &studynook.User{}
	err := db.Conn.QueryRow(context.Background(), sqlStatement, id).Scan(&result.Email, &result.Name, &result.Username)
	if err != nil {
		return nil, err
	}
	result.ID = id

	return result, nil
}
