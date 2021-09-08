package db

import (
	"context"

	"github.com/jackc/pgx/v4/pgxpool"
)

// Conn is database connection
var Conn *pgxpool.Pool

// Initialize establishes the database connection
func Initialize() error {
	var err error
	connectionString := "postgres://postgres:0802361@localhost:5432/studynook?sslmode=disable"
	Conn, err = pgxpool.Connect(context.Background(), connectionString)
	if err != nil {
		return err
	}
	return nil
}
