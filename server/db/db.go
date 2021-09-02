package db

import (
	"context"
	"fmt"

	"github.com/jackc/pgx/v4/pgxpool"
)

var Conn *pgxpool.Pool

//Initailize establishes the database connection
func Initialize() {
	var err error
	connectionString := "postgres://postgres:0802361@localhost:5432/studynook?sslmode=disable"
	Conn, err = pgxpool.Connect(context.Background(), connectionString)
	if err != nil {
		panic(err)
	}
	fmt.Println("CONNECTED TO DB")
}
