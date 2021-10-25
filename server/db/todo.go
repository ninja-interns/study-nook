package db

import (
	"context"

	"github.com/jackc/pgx/v4"
	"studynook.go"
)

/**
* * CREATE TODO - Insert a todo into the Database
**/
func (db *DB) CreateTodo(todoId, userId, todoText, todoTitle string, isCompleted bool) error {
	query := `INSERT INTO todo (id, user_id, todo_text, is_completed, todo_title) VALUES ($1, $2, $3, $4, $5)`
	_, err := db.Conn.Exec(context.Background(), query, todoId, userId, todoText, isCompleted, todoTitle)
	if err != nil {
		return err
	}

	return nil
}

/**
* * DELETE TODO - Delete todo from the database
**/
func (db *DB) DeleteTodo(todoId string) error {
	query := `DELETE FROM todo WHERE id=$1`
	_, err := db.Conn.Exec(context.Background(), query, todoId)
	if err != nil {
		return err
	}

	return nil
}

//* SETTERS -------------------------------------------------------------------------
/**
* * SET TODO TITLE - Update the todos' Title in the Database
**/
func (db *DB) SetTodoTitle(todoId, title string) error {
	query := `UPDATE todo SET todo_title=$1 WHERE id=$2`
	_, err := db.Conn.Exec(context.Background(), query, title, todoId)
	if err != nil {
		return err
	}

	return nil
}

/**
* * SET TODO TEXT - Update the todos' text in the Database
**/
func (db *DB) SetTodoText(todoId, todoText string) error {
	query := `UPDATE todo SET todo_text=$1 WHERE id=$2`
	_, err := db.Conn.Exec(context.Background(), query, todoText, todoId)
	if err != nil {
		return err
	}

	return nil
}

/**
* * SET IS COMPLETED - Update the todos' completion in the Database
**/
func (db *DB) SetTodoIsCompleted(todoId string, isCompleted bool) error {
	query := `UPDATE todo SET is_completed=$1 WHERE id=$2`
	_, err := db.Conn.Exec(context.Background(), query, isCompleted, todoId)
	if err != nil {
		return err
	}

	return nil
}

/**
* * SET TODO USER ID - Update the todos' user ID in the Database
**/
func (db *DB) SetTodoUserId(todoId, userId string) error {
	query := `UPDATE todo SET user_id=$1 WHERE id=$2`
	_, err := db.Conn.Exec(context.Background(), query, userId, todoId)
	if err != nil {
		return err
	}

	return nil
}

//* GETTERS -------------------------------------------------------------------------

/**
* * GET ALL TODOS - Get the incompleted todos from the database
**/
func (db *DB) GetAllTodos(userId string) (pgx.Rows, error) {
	query := `SELECT id, user_id, todo_text, is_completed, todo_title FROM todo WHERE user_id=$1 AND is_completed='false'`
	data, err := db.Conn.Query(context.Background(), query, userId)
	if err != nil {
		return data, err
	}

	return data, nil
}

/**
* * GET TODO TEXT - Get the todos text from the database
**/
func (db *DB) GetTodoText(todoId string) (*studynook.Todo, error) {
	todo := &studynook.Todo{}
	query := `SELECT todo_text FROM todo WHERE id=$1`
	err := db.Conn.QueryRow(context.Background(), query, todoId).Scan(&todo.Text)
	if err != nil {
		return todo, err
	}

	return todo, nil
}

/**
* * GET TODO IS COMPLETED - Get the todos completion from the database
**/
func (db *DB) GetTodoIsCompleted(todoId string) (*studynook.Todo, error) {
	todo := &studynook.Todo{}
	query := `SELECT is_completed FROM todo WHERE id=$1`
	err := db.Conn.QueryRow(context.Background(), query, todoId).Scan(&todo.IsCompleted)
	if err != nil {
		return todo, err
	}

	return todo, nil
}
