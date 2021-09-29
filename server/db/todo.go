package db

import (
	"context"
)

// GetUserByID returns a user with given ID
func (db *DB) CreateTodo(todoId, userId, todoText string, isCompleted bool) (error) {
	// Insert todo into the Database
	sqlStatement := `INSERT INTO todo (id, user_id, todo_text, is_completed) VALUES ($1, $2, $3, $4)`
	_, err := db.Conn.Exec(context.Background(), sqlStatement, todoId, userId, todoText, isCompleted)
	if err != nil {
		return err
	}

	return nil
}
