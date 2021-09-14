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

// Get rid of this function once I have implemented sending the userId from react
func GetTodos(w http.ResponseWriter, r *http.Request) {
	// Create userID
	userId, err := uuid.NewV4()
	if (err != nil) {
		fmt.Println(err)
		return
	}

	// Get users Todos from the Database
	err = getTodoByUserId(userId.String(), w, r)
	if err != nil {
		fmt.Println(err)
	}
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

func UpdateTodo(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	
	// Create and instance of todoItem
	todo := &TodoItem{}	
	
	// Decoding the request into the todo item
	err := json.NewDecoder(r.Body).Decode(todo)
	if err != nil {
		fmt.Println(err)
		return
	}
	
	sqlStatement := `
	UPDATE todo
	SET todo_text=$1, is_completed=$2
	WHERE id=$3
	`
	
	// Intserting into Database
	_, err = initializeDB.Conn.Exec(context.Background(), sqlStatement, todo.Text, todo.IsCompleted, todo.ID)
	if err != nil {
		fmt.Println(err)
		return
	}
}

func DeleteTodo(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	
	// Create and instance of todoItem
	todo := &TodoItem{}	
	
	// Decoding the request into the todo item
	err := json.NewDecoder(r.Body).Decode(todo)
	if err != nil {
		fmt.Println(err)
		return
	}
	
	sqlStatement := `DELETE FROM todo WHERE id=$1`
	
	// Intserting into Database
	_, err = initializeDB.Conn.Exec(context.Background(), sqlStatement, todo.ID)
	if err != nil {
		fmt.Println(err)
		return
	}
}

// Change this to be either userId or ownerId for less reused code?
func getTodoByUserId(userId string, w http.ResponseWriter, r *http.Request) error {
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