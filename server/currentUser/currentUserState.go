package currentUser

import (
	"encoding/json"
	"fmt"
	"net/http"

	"main.go/auth"
)

//will hit when the API from main.go is invoked- can be called from multiple components on frontend using useGetState() from utils folder, custom hook. Backend solution to persisting data through a refresh
func CurrentUserState(w http.ResponseWriter, r *http.Request, u *auth.User) {
	currentUser := &auth.CurrentLoginUser{}

	currentUser.Email = u.Email
	currentUser.Name = u.Name
	currentUser.Username = u.Username

	err := json.NewEncoder(w).Encode(currentUser)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		fmt.Println(err)
		return
	}
	fmt.Println(currentUser)
}
