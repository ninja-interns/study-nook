package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/urfave/cli/v2"
	"studynook.go/api"
	"studynook.go/db"
	"studynook.go/emails"
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
					//Running the database and connection
					&cli.StringFlag{
						Name:    "address",
						Aliases: []string{"a"},
						Value:   ":8080",
						Usage:   "Set the address to use for the server"},
					&cli.StringFlag{
						Name:    "user",
						Aliases: []string{"u"},
						Value:   "dev",
						Usage:   "Set the database username in the database connection string"},
					&cli.StringFlag{
						Name:    "password",
						Aliases: []string{"p"},
						Value:   "dev",
						Usage:   "Set the database password in the database connection string"},
					&cli.StringFlag{
						Name:    "connection",
						Aliases: []string{"c"},
						Value:   "5432",
						Usage:   "Set the database port in the database connection string"},
					&cli.StringFlag{
						Name:    "name",
						Aliases: []string{"n"},
						Value:   "studynook",
						Usage:   "Set the database name in the database connection string"},

					//emailer configs
					&cli.StringFlag{
						Name:    "euser",
						EnvVars: []string{"SMTP_USERNAME"},
						Usage:   "Set the username in the Emailer configs"},
					&cli.StringFlag{
						Name:    "epassword",
						EnvVars: []string{"SMTP_PASSWORD"},
						Usage:   "Set the password in the Emailer configs"},
					&cli.StringFlag{
						Name:    "eserver",
						EnvVars: []string{"SMTP_SERVER"},
						Usage:   "Set the server in the Emailer configs"},
					&cli.StringFlag{
						Name:    "eport",
						EnvVars: []string{"SMTP_PORT"},
						Usage:   "Set the port in the Emailer configs"},
				},
				Action: func(c *cli.Context) error {
					// address := c.String("address")
					user := c.String("user")
					password := c.String("password")
					connection := c.String("connection")
					name := c.String("name")

					//emailer configs
					euser := c.String("euser")
					epassword := c.String("epassword")
					eserver := c.String("eserver")
					eport := c.String("eport")

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
					emailer, err := emails.New(euser, epassword, eserver, eport)
					controller, err := api.New(database, emailer)
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
