// Main file of study nook

// When creating new files for your React components or pages,
// create a subdirectory on this directory and name it with
// whichever feature you are creating.

package main

import (
	"errors"
	"fmt"
	"log"
	"os"

	"studynook.go/api"

	"github.com/urfave/cli/v2"
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
					address := c.String("address")
					user := c.String("user")
					password := c.String("password")
					connection := c.String("connection")
					name := c.String("name")

					if address == "" {
						return errors.New("Missing Flag: address")
					}

					fmt.Println("Serving on port: ", address)
					err := api.Serve(address, user, password, connection, name)
					if err != nil {
						fmt.Println(err)
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
