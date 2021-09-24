package todo

import (
	"context"
	"encoding/json"
	"net/http"
	"time"

	initializeDB "studynook.go/initializedb"

	"github.com/alexedwards/scs/pgxstore"
	"github.com/alexedwards/scs/v2"
	"studynook.go/auth"
)

type TodoItem struct {
	ID          string `json:"id"`
	UserId      string `json:"user_id"`
	Text        string `json:"todo_text"`
	IsCompleted bool   `json:"is_completed"`
}

type UserId struct {
	ID string `json:"id"`
}

type JSONResponse struct {
	Message string `json:"message"`
	IsValid bool   `json:"isValid"`
}

var SessionManager *scs.SessionManager

func SessionsConfig() {
	SessionManager = scs.New()
	SessionManager.Store = pgxstore.New(initializeDB.Conn)
	SessionManager.Lifetime = 1000000 * time.Hour
	SessionManager.Cookie.Persist = true
	SessionManager.Cookie.HttpOnly = false
}

//! Explanation of function
func GetTodos(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	// Getting the logged in userId

	userId := auth.SessionManager.GetString(r.Context(), "id")

	// Get the rows from the database with the same user id
	todoArray := []TodoItem{}
	sqlStatement := `
		SELECT array_to_json(array_agg(row_to_json(todo)))
		FROM todo
		WHERE user_id=$1 AND is_completed='false'
		`
	err := initializeDB.Conn.QueryRow(context.Background(), sqlStatement, userId).Scan(&todoArray)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return

	} else if todoArray == nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	} else {
		json.NewEncoder(w).Encode(todoArray)
	}

}

//! Explanation of function
func CreateTodo(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// Getting the logged in userId
	userId := auth.SessionManager.GetString(r.Context(), "id")

	// Decoding the request into the todo item
	todo := &TodoItem{}
	err := json.NewDecoder(r.Body).Decode(todo)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Intserting todo into Database
	sqlStatement := `INSERT INTO todo (id, user_id, todo_text, is_completed) VALUES ($1, $2, $3, $4)`
	_, err = initializeDB.Conn.Exec(context.Background(), sqlStatement, todo.ID, userId, todo.Text, todo.IsCompleted)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
}

//! Explanation of function
func UpdateTodo(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// Decoding the request into the todo item
	todo := &TodoItem{}
	err := json.NewDecoder(r.Body).Decode(todo)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Intserting todo into Database
	sqlStatement := `UPDATE todo SET todo_text=$1, is_completed=$2 WHERE id=$3`
	_, err = initializeDB.Conn.Exec(context.Background(), sqlStatement, todo.Text, todo.IsCompleted, todo.ID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
}

//! Explanation of function
func DeleteTodo(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// Decoding the request into the todo item
	todo := &TodoItem{}
	err := json.NewDecoder(r.Body).Decode(todo)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Deleting todo from the database
	sqlStatement := `DELETE FROM todo WHERE id=$1`
	_, err = initializeDB.Conn.Exec(context.Background(), sqlStatement, todo.ID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
}
