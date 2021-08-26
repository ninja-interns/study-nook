package todo

import (
	"net/http"
)

type task struct {
	OwnerId 	string 
	Title		string
	isCompleted bool
}

//creating a struct for the JSON response message
type JsonResponse struct {
	Message string `json:"message"`
	IsValid bool   `json:"isValid"`
}

// Create task handler creates a new task item
func createTask(w http.ResponseWriter, r *http.Request) {

	
}