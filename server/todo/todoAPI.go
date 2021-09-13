package todo

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	initializeDB "studynook.go/initializedb"

	"github.com/alexedwards/scs/pgxstore"
	"github.com/alexedwards/scs/v2"
	"github.com/gofrs/uuid"
)

type TodoItem struct {
	ID			string	`json:"id"`
	OwnerId		string 	`json:"ownerId`
	Text		string	`json:"text"`
	IsCompleted	bool	`json:"isCompleted"`
}

type JsonResponse struct {
	Message    string `json:"message"`
	IsValid    bool   `json:"isValid"`
	IsVerified bool   `json:"isVerified"`
}

type User struct {
	ID        string `json:"id"`
	Email     string `json:"email"`
	Name      string `json:"name"`
	Username  string `json:"username"`
	Password  string `json:"password"`
	IsVerfied bool   `json:"isVerified"`
	Token     string `json:"token"`
}

var SessionManager *scs.SessionManager

func SessionsConfig() {
	SessionManager = scs.New()
	SessionManager.Store = pgxstore.New(initializeDB.Conn)
	SessionManager.Lifetime = 1000000 * time.Hour
	SessionManager.Cookie.Persist = true
	SessionManager.Cookie.HttpOnly = false
}


func GetTodos(w http.ResponseWriter, r *http.Request) {
	// Create ownerID
	ownerId, err := uuid.NewV4()
	if (err != nil) {
		fmt.Println(err)
		return
	}
	
	// Inserting Dummy Todos into the Database
	createTodos(ownerId.String(), "Todo 1", w, r)
	createTodos(ownerId.String(), "Todo 2", w, r)
	createTodos(ownerId.String(), "Todo 3", w, r)

	// Get Todos from Database
	todo, err := getTodoByOwnderId(ownerId.String())
	if err != nil {
		fmt.Println(err)
	}
	
	json.NewEncoder(w).Encode(todo)

	// Eventually need to do this from database https://hashrocket.com/blog/posts/faster-json-generation-with-postgresql
	// It will create an object for each line in the database table
		
}

func getTodoByOwnderId(ownerId string) (*TodoItem, error) {
	sqlStatement := `SELECT id, todo_text, is_completed FROM todo WHERE owner_id = $1`
	result := &TodoItem{}
	err := initializeDB.Conn.QueryRow(context.Background(), sqlStatement, ownerId).Scan(&result.ID, &result.Text, &result.IsCompleted)
	if err != nil {
		return nil, err
	}

	return result, nil
}

func createTodos(OwnerId string, text string, w http.ResponseWriter, r *http.Request) {
	// Create new todo Item
	todo := &TodoItem{}	

	// Create a new ID
	id, err := uuid.NewV4()
	if (err != nil) {
		fmt.Println(err)
		return
	}

	todo.ID = id.String()
	todo.OwnerId = OwnerId
	todo.Text = text
	todo.IsCompleted = false

	// Creating an insert in our database
	sqlStatement := `
	INSERT INTO todo (id, owner_id, todo_text, is_completed)
	VALUES ($1, $2, $3, $4)`

	// Intserting into Database
	_, err = initializeDB.Conn.Exec(context.Background(), sqlStatement, todo.ID, todo.OwnerId, todo.Text, todo.IsCompleted)
	if err != nil {
		fmt.Println(err)
		return
	}

}