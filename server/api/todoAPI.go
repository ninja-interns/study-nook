package api

import (
	"encoding/json"
	"net/http"

	"studynook.go"
)

/**
* * CREATE TODO HANDLER
* * Decodes the todo from the client and inserts it into the database
**/
func (c *Controller) CreateTodoHandler(w http.ResponseWriter, r *http.Request) {
	userId := c.Sessions.GetString(r.Context(), "id") // Logged in user ID

	// Decode the request (todo) from the client
	todo := &studynook.Todo{}
	err := json.NewDecoder(r.Body).Decode(todo)
	if err != nil {
		handleError(w, "Error decoding create todo request: ", err) //! Handle with middleware
		return
	}

	// Insert todo into the Database
	err = c.DB.CreateTodo(todo.ID, userId, todo.Text, false)
	if err != nil {
		handleError(w, "Error interting todo into the database: ", err) //! Handle with middleware
		return
	}
}

/**
* * GET TODOS HANDLER
* * Gets all the todos from the database which is_completed variable is false and sends it to the client
**/
func (c *Controller) GetTodosHandler(w http.ResponseWriter, r *http.Request) {
	userId := c.Sessions.GetString(r.Context(), "id") // Logged in user ID

	// Get the incompleted todos from the database
	results, err := c.DB.GetAllTodos(userId)
	if err != nil {
		handleError(w, "Error retrieving list from database: ", err) //! Handle with middleware
		return
	}

	// Add all the todo items from the database into the array
	todoList := []*studynook.Todo{}
	for results.Next() {
		item := &studynook.Todo{}
		err = results.Scan(&item.ID, &item.UserId, &item.Text, &item.IsCompleted)
		if err != nil {
			handleError(w, "Error scanning results into todo list: ", err) //! Handle with middleware
			return
		}
		todoList = append(todoList, item)
	}

	// Send the todo list to the client
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(todoList)
}

/**
* * UPDATE TODO HANDLER
* * Updates the todo in the database with the todo information from the client
**/
func (c *Controller) UpdateTodoHandler(w http.ResponseWriter, r *http.Request) {
	// Decode the request (todo) from the client
	todo := &studynook.Todo{}
	err := json.NewDecoder(r.Body).Decode(todo)
	if err != nil {
		handleError(w, "Error decoding todo update request: ", err) //! Handle with middleware
		return
	}

	// Update the todo text in the Database
	err = c.DB.SetTodoText(todo.ID, todo.Text)
	if err != nil {
		handleError(w, "Error updating todos' text in database: ", err) //! Handle with middleware
		return
	}

	// Update the todo completion in the Database
	err = c.DB.SetTodoIsCompleted(todo.ID, todo.IsCompleted)
	if err != nil {
		handleError(w, "Error updating todos' text in database: ", err) //! Handle with middleware
		return
	}
}

/**
* * DELETE TODO HANDLER
* * Deletes the todo with the matching todo ID from the database
**/
func (c *Controller) DeleteTodoHandler(w http.ResponseWriter, r *http.Request) {
	// Decode the request (todo) from the client
	todo := &studynook.Todo{}
	err := json.NewDecoder(r.Body).Decode(todo)
	if err != nil {
		handleError(w, "Error decoding delete todo request: ", err) //! Handle with middleware
		return
	}

	// Delete todo from the database
	err = c.DB.DeleteTodo(todo.ID)
	if err != nil {
		handleError(w, "Error deleting todo from database: ", err) //! Handle with middleware
		return
	}
}
