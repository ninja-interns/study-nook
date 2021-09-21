package initializedb

import (
	"context"

	"github.com/jackc/pgx/v4/pgxpool"
)

// Conn - database connection
var Conn *pgxpool.Pool

// InitDB initializes the database
func InitDB() error {
	var err error
	connectionString := "postgres://dev:dev@localhost:5432/studynook?sslmode=disable"
	//ran into ALOT of errors here because I was writing: db, err := sql.... which was assigning db to a local variable, not assigning it to the global variable which it is doing now.
	Conn, err = pgxpool.Connect(context.Background(), connectionString)
	if err != nil {
		return err
	}
	return nil
}
