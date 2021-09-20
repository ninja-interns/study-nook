package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/urfave/cli/v2"
	"studynook.go/api"
	"studynook.go/db"
)

func main() {
	app := &cli.App{
		Name:    "StudyNook CLI",
		Version: "v0.0.1",
		Usage:   "Developer's tool for the StudyNook app.",
		Commands: []*cli.Command{
			{
				Name:    "serve",
				Usage:   "run the server on certain port [default: 8080]",
				Aliases: []string{"s"},
				Flags: []cli.Flag{
					&cli.StringFlag{Name: "address", Aliases: []string{"a"}, Value: ":8080", Usage: "Set the address to use for the server"},
					&cli.StringFlag{Name: "user", Aliases: []string{"u"}, Value: "dev", Usage: "Set the database username in the database connection string"},
					&cli.StringFlag{Name: "password", Aliases: []string{"p"}, Value: "dev", Usage: "Set the database password in the database connection string"},
					&cli.StringFlag{Name: "connection", Aliases: []string{"c"}, Value: "5432", Usage: "Set the database port in the database connection string"},
					&cli.StringFlag{Name: "name", Aliases: []string{"n"}, Value: "studynook", Usage: "Set the database name in the database connection string"},
				},
				Action: func(c *cli.Context) error {
					// address := c.String("address")
					user := c.String("user")
					password := c.String("password")
					connection := c.String("connection")
					name := c.String("name")

					//initializing the database
					conn, err := db.Connect(user, password, connection, name)
					if err != nil {
						fmt.Println(err)
						return err
					}
					database, err := db.New(conn)
					if err != nil {
						fmt.Println(err)
						return err
					}
					controller, err := api.New(database)
					log.Fatal(http.ListenAndServe(":8080", controller.Sessions.LoadAndSave(controller.Router)))
					if err != nil {
						return err
					}
					return nil
				},
			},
		},
	}

	err := app.Run(os.Args)
	if err != nil {
		log.Fatal(err)
	}
}
