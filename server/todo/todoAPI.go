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
	UserId		string 	`json:"user_id"`
	Text		string	`json:"todo_text"`
	IsCompleted	bool	`json:"is_completed"`
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
	userId, err := uuid.NewV4()
	if (err != nil) {
		fmt.Println(err)
		return
	}
	
	// Inserting Dummy Todos into the Database
	// createTodo(userId.String(), "Todo 1", w, r)
	// createTodo(userId.String(), "Todo 2", w, r)
	// createTodo(userId.String(), "Todo 3", w, r)

	// Get Todos from the Database
	err = getTodoByOwnderId(userId.String(), w, r)
	if err != nil {
		fmt.Println(err)
	}
		
}

func getTodoByOwnderId(userId string, w http.ResponseWriter, r *http.Request) error {
	// Create todo item Array
	todoArray := []TodoItem{}

	sqlStatement := `
        SELECT array_to_json(array_agg(row_to_json(todo)))
        FROM todo
        WHERE user_id=$1
	`
	
	// Get the rows from the database with the same user id
	err := initializeDB.Conn.QueryRow(context.Background(), sqlStatement, userId).Scan(&todoArray)
	if err != nil {
		return err
	}

	json.NewEncoder(w).Encode(todoArray)
	return nil
}


func CreateTodo(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	
	// Create and instance of todoItem
	todo := &TodoItem{}	

	// Decoding the request into the todo item
	err := json.NewDecoder(r.Body).Decode(todo)
	if err != nil {
		fmt.Println(err)
		return
	}

	// Giving the todo an ID
	id, err := uuid.NewV4()
	if (err != nil) {
		fmt.Println(err)
		return
	}
	todo.ID = id.String()

	fmt.Println(todo)
	
	// Creating an insert in our database
	sqlStatement := `
	INSERT INTO todo (id, user_id, todo_text, is_completed)
	VALUES ($1, $2, $3, $4)`

	// Intserting into Database
	_, err = initializeDB.Conn.Exec(context.Background(), sqlStatement, todo.ID, todo.UserId, todo.Text, todo.IsCompleted)
	if err != nil {
		fmt.Println(err)
		return
	}

}