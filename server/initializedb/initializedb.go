package initializedb

import (
	"context"
	"fmt"

	"github.com/jackc/pgx/v4/pgxpool"
)

var Conn *pgxpool.Pool

//initializing my database
func InitDB() {
	var err error
	connectionString := "postgres://dev:dev@localhost:5432/studynook?sslmode=disable"
	//ran into ALOT of errors here because I was writing: db, err := sql.... which was assigning db to a local variable, not assigning it to the global variable which it is doing now.
	Conn, err = pgxpool.Connect(context.Background(), connectionString)
	if err != nil {
		panic(err)
	}
	fmt.Println("CONNECTED TO DB")
}
