package api

import (
	"encoding/json"
	"errors"
	"net/http"

	"github.com/jackc/pgx/v4"
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
	}

	// Insert todo into the Database
	err = c.DB.CreateTodo(todo.ID, userId, todo.Text, false)
	if err != nil {
		return http.StatusBadRequest, errors.New("error interting todo into the database")
	}

	return http.StatusOK, nil
}

/**
* * GET TODOS HANDLER
* * Gets all the todos from the database which is_completed variable is false and sends it to the client
**/
func (c *Controller) GetTodosHandler(w http.ResponseWriter, r *http.Request) (int, error) {
	userId := c.Sessions.GetString(r.Context(), "id") // Logged in user ID

	// Gets the incompleted todos from the database
	results, err := c.DB.GetAllTodos(userId)
	if err != nil {
		if err == pgx.ErrNoRows {
			return http.StatusNotFound, errors.New("error retrieving todo list from database: no results in database")
		}
		return http.StatusBadRequest, errors.New("error retrieving todo list from database")
	}

	// Add all the todo items from the database into the array
	todoList := []*studynook.Todo{}
	for results.Next() {
		item := &studynook.Todo{}
		err = results.Scan(&item.ID, &item.UserId, &item.Text, &item.IsCompleted)
		if err != nil {
			return http.StatusBadRequest, errors.New("error scanning results into todo list")
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
	}

	// Update the todo text in the Database
	err = c.DB.SetTodoText(todo.ID, todo.Text)
	if err != nil {
		return http.StatusBadRequest, errors.New("error updating todos' text in database")
	}

	// Update the todo completion in the Database
	err = c.DB.SetTodoIsCompleted(todo.ID, todo.IsCompleted)
	if err != nil {
		return http.StatusBadRequest, errors.New("error updating todos' text in database")
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
	}

	// Delete todo from the database
	err = c.DB.DeleteTodo(todo.ID)
	if err != nil {
		return http.StatusBadRequest, errors.New("error deleting todo from database")
	}

	return http.StatusOK, nil
}
