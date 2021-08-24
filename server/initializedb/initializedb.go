package initializeDB

import (
	"database/sql"
	"fmt"

	_ "github.com/lib/pq"
)

var Db *sql.DB

//here are our db configs to connect to the database
const (
	host     = "localhost"
	port     = 5432
	user     = "dev"
	password = "dev"
	dbname   = "studynook"
)

//initializing my database
func InitDB() {
	var err error
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
		"password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname)

	//ran into ALOT of errors here because I was writing: db, err := sql.... which was assigning db to a local variable, not assigning it to the global variable which it is doing now.
	Db, err = sql.Open("postgres", psqlInfo)
	if err != nil {
		panic(err)
	}
	if err != nil {
		panic(err)
	}

	err = Db.Ping()
	if err != nil {
		panic(err)
	}
	fmt.Println("CONNECTED TO DB")
}
