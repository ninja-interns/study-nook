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
* * CREATE TODO FUNCTION
* * Decodes the todo from the client and inserts it into the database
 */
func (c *Controller) CreateTodo(w http.ResponseWriter, r *http.Request) {
	userId := c.Sessions.GetString(r.Context(), "id") // Logged in user ID

	// Decode the request (todo) from the client
	todo := &TodoItem{}
	err := json.NewDecoder(r.Body).Decode(todo)
	if err != nil {
		handleError(w, "Error decoding create todo request: ", err)
	}

	// Insert todo into the Database
	sqlStatement := `INSERT INTO todo (id, user_id, todo_text, is_completed) VALUES ($1, $2, $3, $4)`
	_, err = c.DB.Conn.Exec(context.Background(), sqlStatement, todo.ID, userId, todo.Text, todo.IsCompleted)
	if err != nil {
		handleError(w, "Error interting todo into database: ", err)
	}
}

/**
* * GET TODOS FUNCTION
* * Gets all the todos from the database which is_completed variable is false and sends it to the client
 */
func (c *Controller) GetTodos(w http.ResponseWriter, r *http.Request) {
	userId := c.Sessions.GetString(r.Context(), "id") // Logged in user ID

	// Get the incompleted todos from the database
	sqlStatement := `SELECT id, user_id, todo_text, is_completed FROM todo WHERE user_id=$1 AND is_completed='false'`
	results, err := c.DB.Conn.Query(context.Background(), sqlStatement, userId)
	if err != nil {
		handleError(w, "Error retrieving list from database: ", err)
	}

	// Add all the todo items from the database into the array
	todoArray := []*TodoItem{}
	for results.Next() {
		item := &TodoItem{}
		err = results.Scan(&item.ID, &item.UserId, &item.Text, &item.IsCompleted)
		if err != nil {
			handleError(w, "Error scanning results into todo list: ", err)
		}
		todoArray = append(todoArray, item)
	}

	// Send the todo list to the client
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(todoArray)
}

/**
* * UPDATE TODO FUNCTION
* * Updates the todo in the database with the todo information from the client
 */
func (c *Controller) UpdateTodo(w http.ResponseWriter, r *http.Request) {
	// Decode the request (todo) from the client
	todo := &TodoItem{}
	err := json.NewDecoder(r.Body).Decode(todo)
	if err != nil {
		handleError(w, "Error decoding todo update request: ", err)
	}

	// Update the todo in the Database
	sqlStatement := `UPDATE todo SET todo_text=$1, is_completed=$2 WHERE id=$3`
	_, err = c.DB.Conn.Exec(context.Background(), sqlStatement, todo.Text, todo.IsCompleted, todo.ID)
	if err != nil {
		handleError(w, "Error updating todo in database: ", err)
	}
}

/**
* * DELETE TODO FUNCTION
* * Deletes the todo with the matching todo ID from the database
 */
func (c *Controller) DeleteTodo(w http.ResponseWriter, r *http.Request) {
	// Decode the request (todo) from the client
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
