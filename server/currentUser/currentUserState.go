package currentUser

import (
	"encoding/json"
	"fmt"
	"net/http"

	"main.go/auth"
)

//creating a new struct for a more extensible currentUser. Here we can add tasks and other states
type currentUserState struct {
	Name     string `json:"name"`
	Username string `json:"username"`
	Email    string `json:"email"`
}

//will hit when the API from main.go is invoked- can be called from multiple components on frontend using useGetState() from utils folder, custom hook. Backend solution to persisting data through a refresh
func CurrentUserState(w http.ResponseWriter, r *http.Request, u *auth.User) {
	currentUser := &currentUserState{Email: u.Email,
		Name:     u.Name,
		Username: u.Username}

	err := json.NewEncoder(w).Encode(currentUser)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		fmt.Println(err)
		return
	}
}
