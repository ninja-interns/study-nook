package initializeDB

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
	//ran into ALOT of errors here because I was writing: db, err := sql.... which was assigning db to a local variable, not assigning it to the global variable which it is doing now.
	fmt.Println(connectionString)
	Conn, err = pgxpool.Connect(context.Background(), connectionString)
	if err != nil {
		fmt.Println(err)
		return err
	}
	return nil
}
