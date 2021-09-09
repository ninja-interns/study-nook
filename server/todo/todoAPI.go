package todo

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	initializeDB "studynook.go/initializedb"

	"github.com/alexedwards/scs/pgxstore"
	"github.com/alexedwards/scs/v2"
)

type TodoList struct {
	ID			string	`json:"id"`
	Todo		string	`json:"todo"`
	IsCompleted	bool	`json:"isCompleted"`
}

type JsonResponse struct {
	Message    string `json:"message"`
	IsValid    bool   `json:"isValid"`
	IsVerified bool   `json:"isVerified"`
}

var SessionManager *scs.SessionManager

func SessionsConfig() {
	SessionManager = scs.New()
	SessionManager.Store = pgxstore.New(initializeDB.Conn)
	SessionManager.Lifetime = 1000000 * time.Hour
	SessionManager.Cookie.Persist = true
	SessionManager.Cookie.HttpOnly = false
}

func GetTodos(w http.ResponseWriter, r *http.Request) {
	fmt.Println("recieved get todos request")
	
	todo := &TodoList{}
	todo.Todo = "Todo from Database"
	json.NewEncoder(w).Encode(todo.Todo)
		
}