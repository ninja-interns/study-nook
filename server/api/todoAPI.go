package api

import (
	"encoding/json"
	"errors"
	"net/http"

	"studynook.go"
)

/**
* * CREATE TODO HANDLER
* * Decodes the todo from the client and inserts it into the database
**/
func (c *Controller) CreateTodoHandler(w http.ResponseWriter, r *http.Request) (int, error) {
	userId := c.Sessions.GetString(r.Context(), "id") // Logged in user ID

	// Decode the request (todo) from the client
	todo := &studynook.Todo{}
	err := json.NewDecoder(r.Body).Decode(todo)
	if err != nil {
		return http.StatusBadRequest, errors.New("error decoding create todo request")
		// handleError(w, "Error decoding create todo request: ", err)
	}

	// Insert todo into the Database
	err = c.DB.CreateTodo(todo.ID, userId, todo.Text, false)
	if err != nil {
		return http.StatusBadRequest, errors.New("error interting todo into the database")
		// handleError(w, "Error interting todo into the database: ", err)
	}

	return http.StatusOK, nil
}

/**
* * GET TODOS HANDLER
* * Gets all the todos from the database which is_completed variable is false and sends it to the client
**/
func (c *Controller) GetTodosHandler(w http.ResponseWriter, r *http.Request) (int, error) {
	userId := c.Sessions.GetString(r.Context(), "id") // Logged in user ID

	// Get the incompleted todos from the database
	results, err := c.DB.GetAllTodos(userId)
	if err != nil {
		return http.StatusBadRequest, errors.New("error retrieving list from database")
		// handleError(w, "Error retrieving list from database: ", err)
	}

	// Add all the todo items from the database into the array
	todoList := []*studynook.Todo{}
	for results.Next() {
		item := &studynook.Todo{}
		err = results.Scan(&item.ID, &item.UserId, &item.Text, &item.IsCompleted)
		if err != nil {
			return http.StatusBadRequest, errors.New("error scanning results into todo list")
			// handleError(w, "Error scanning results into todo list: ", err)
		}
		todoList = append(todoList, item)
	}

	// Send the todo list to the client
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(todoList)

	return http.StatusOK, nil
}

/**
* * UPDATE TODO HANDLER
* * Updates the todo in the database with the todo information from the client
**/
func (c *Controller) UpdateTodoHandler(w http.ResponseWriter, r *http.Request) (int, error) {
	// Decode the request (todo) from the client
	todo := &studynook.Todo{}
	err := json.NewDecoder(r.Body).Decode(todo)
	if err != nil {
		return http.StatusBadRequest, errors.New("error decoding todo update request")
		// handleError(w, "Error decoding todo update request: ", err)
	}

	// Update the todo text in the Database
	err = c.DB.SetTodoText(todo.ID, todo.Text)
	if err != nil {
		return http.StatusBadRequest, errors.New("error updating todos' text in database")
		// handleError(w, "Error updating todos' text in database: ", err)
	}

	// Update the todo completion in the Database
	err = c.DB.SetTodoIsCompleted(todo.ID, todo.IsCompleted)
	if err != nil {
		return http.StatusBadRequest, errors.New("error updating todos' text in database")
		// handleError(w, "Error updating todos' text in database: ", err)
	}

	return http.StatusOK, nil
}

/**
* * DELETE TODO HANDLER
* * Deletes the todo with the matching todo ID from the database
**/
func (c *Controller) DeleteTodoHandler(w http.ResponseWriter, r *http.Request) (int, error) {
	// Decode the request (todo) from the client
	todo := &studynook.Todo{}
	err := json.NewDecoder(r.Body).Decode(todo)
	if err != nil {
		return http.StatusBadRequest, errors.New("error decoding delete todo request")
		// handleError(w, "Error decoding delete todo request: ", err)
	}

	// Delete todo from the database
	err = c.DB.DeleteTodo(todo.ID)
	if err != nil {
		return http.StatusBadRequest, errors.New("error deleting todo from database")
		// handleError(w, "Error deleting todo from database: ", err)
	}

	return http.StatusOK, nil
}
