package authentication

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/jackc/pgx/v4"
	"golang.org/x/crypto/bcrypt"
)

type User struct {
	Username string `json: string`
	Password string `json: string`
	Email    string `json: string`
	Name     string `json: string`
}

func SignupHandler(conn *pgx.Conn, w http.ResponseWriter, r *http.Request) error {

	// Reading all body of POST method and storing to resposeData
	responseData, err := ioutil.ReadAll(r.Body)
	if err != nil {
		log.Fatal(err)
	}

	// Creating instance of User struct
	user := &User{}

	fmt.Println(string(responseData))

	// Unmarshalling JSON strings to user instance
	json.Unmarshal([]byte(responseData), user)

	fmt.Println("This is username: " + user.Username)
	fmt.Println("This is password: " + user.Password)
	fmt.Println("This is email: " + user.Email)
	fmt.Println("This is name: " + user.Name)

	var hashedPass []byte

	hashedPass, err = bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)

	if err != nil {
		fmt.Println(err)
	}

	ctx := context.Background()
	q := `INSERT INTO users (username, email, password, name) VALUES ($1, $2, $3, $4)`

	_, err = conn.Exec(ctx, q, user.Username, user.Email, hashedPass, user.Name)

	fmt.Println("It should be there right now!")

	if err != nil {
		return err
	}
	return nil
}
