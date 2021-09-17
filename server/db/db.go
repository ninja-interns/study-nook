package db

import (
	"context"
	"fmt"

	"github.com/jackc/pgx/v4/pgxpool"
)

var Conn *pgxpool.Pool

//initializing my database
func InitDB(user, password, connection, name string) error {
	var err error
	connectionString := "postgres://" + user + ":" + password + "@localhost:" + connection + "/" + name + "?sslmode=disable"

	fmt.Println(connectionString)
	Conn, err = pgxpool.Connect(context.Background(), connectionString)
	if err != nil {
		return err
	}
	return nil
}
