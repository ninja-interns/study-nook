package api

import (
	"context"
	"encoding/json"
	"net/http"
)

type TodoItem struct {
	ID          string `json:"id"`
	UserId      string `json:"user_id"`
	Text        string `json:"todo_text"`
	IsCompleted bool   `json:"is_completed"`
}

/**
* * GET TODOS FUNCTION
* *
 */
func (c *Controller) GetTodos(w http.ResponseWriter, r *http.Request) {
	userId := c.Sessions.GetString(r.Context(), "id") // Logged in user ID

	// Get the rows from the database with the same user id
	sqlStatement := `SELECT id, user_id, todo_text, is_completed FROM todo WHERE user_id=$1 AND is_completed='false'`
	results, err := c.DB.Conn.Query(context.Background(), sqlStatement, userId)
	if err != nil {
		handleError(w, "Error retrieving list from database: ", err)
	}

	todoArray := []*TodoItem{}
	for results.Next() {
		item := &TodoItem{}
		err = results.Scan(&item.ID, &item.UserId, &item.Text, &item.IsCompleted)
		if err != nil {
			handleError(w, "Error scanning results into todo list: ", err)
		}
		todoArray = append(todoArray, item)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(todoArray)
}

/**
* * CREATE TODO FUNCTION
* *
 */
func (c *Controller) CreateTodo(w http.ResponseWriter, r *http.Request) {
	userId := c.Sessions.GetString(r.Context(), "id") // Logged in user ID

	// Decoding the request into the todo item
	todo := &TodoItem{}
	err := json.NewDecoder(r.Body).Decode(todo)
	if err != nil {
		handleError(w, "Error decoding create todo request: ", err)
	}

	// Intserting todo into Database
	sqlStatement := `INSERT INTO todo (id, user_id, todo_text, is_completed) VALUES ($1, $2, $3, $4)`
	_, err = c.DB.Conn.Exec(context.Background(), sqlStatement, todo.ID, userId, todo.Text, todo.IsCompleted)
	if err != nil {
		handleError(w, "Error interting todo into database: ", err)
	}
}

/**
* * UPDATE TODO FUNCTION
* *
 */
func (c *Controller) UpdateTodo(w http.ResponseWriter, r *http.Request) {
	// Decoding the request into the todo item
	todo := &TodoItem{}
	err := json.NewDecoder(r.Body).Decode(todo)
	if err != nil {
		handleError(w, "Error decoding todo update request: ", err)
	}

	// Intserting todo into Database
	sqlStatement := `UPDATE todo SET todo_text=$1, is_completed=$2 WHERE id=$3`
	_, err = c.DB.Conn.Exec(context.Background(), sqlStatement, todo.Text, todo.IsCompleted, todo.ID)
	if err != nil {
		handleError(w, "Error updating todo in database: ", err)
	}
}

/**
* * DELETE TODO FUNCTION
* *
 */
func (c *Controller) DeleteTodo(w http.ResponseWriter, r *http.Request) {
	// Decoding request
	todo := &TodoItem{}
	err := json.NewDecoder(r.Body).Decode(todo)
	if err != nil {
		handleError(w, "Error decoding delete todo request: ", err)
	}

	// Deleting todo from the database
	sqlStatement := `DELETE FROM todo WHERE id=$1`
	_, err = c.DB.Conn.Exec(context.Background(), sqlStatement, todo.ID)
	if err != nil {
		handleError(w, "Error deleting todo from database: ", err)
	}
}
