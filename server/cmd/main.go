package main

//CLI command to start the server: **Make sure you are in study-nook/server/cmd first. Then run `go run main.go s` this will only print out emails for use in development. If you need to actually send an email, run `go run main.go s -b true`
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

//this main function is using a cli to start the server with flags for the configs so they can be easily changed if needed. It is initializing all of the package structs that we will be using so they can be used across the application
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

					//emailer configs -- these are using persistent environment variables available to a single profile on the computer that must be set up on your own computer environment. LINUX: in your home directory run `nano .bashrc`, at the end of the file add `export SMTP_USERNAME=<get this username from Alyssa>` for each of the variables below, ^0 and ^X to save and reboot.
					&cli.BoolFlag{
						Name:    "production",
						Aliases: []string{"b"},
						Value:   false,
						Usage:   "sets if the emailer will use production code to send to actual email address."},
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
					address := c.String("address")
					user := c.String("user")
					password := c.String("password")
					connection := c.String("connection")
					name := c.String("name")

					//emailer configs
					euser := c.String("euser")
					epassword := c.String("epassword")
					eserver := c.String("eserver")
					eport := c.String("eport")
					production := c.Bool("production")

					//if the production boolean flag (default false) is true it will initialize the emailer struct to use all the configs, or else it will just inialize the emailer as the development emailer struct only holding the username. Checkout server/emails to see how the logic works.
					var emailer emails.Emailer
					if production {
						emailer = &emails.Email{
							Username: euser,
							Password: epassword,
							Server:   eserver,
							Port:     eport}
					} else {
						emailer = &emails.DevEmail{
							Username: euser,
						}
					}

					//initializing the database connection
					conn, err := db.Connect(user, password, connection, name)
					if err != nil {
						fmt.Println(err)
						return err
					}
					//initializing the db struct holding the connection allowing it to be available to other packages ex. API below
					database, err := db.New(conn)
					if err != nil {
						fmt.Println(err)
						return err
					}
					//passing in the database and emailer to the controller so they are available to the API package
					controller, err := api.New(database, &emailer)
					if err != nil {
						fmt.Println(err)
						return err
					}
					//starting the server
					log.Fatal(http.ListenAndServe(address, controller.Sessions.LoadAndSave(controller.Router)))
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
