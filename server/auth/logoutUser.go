package auth

import (
	"encoding/json"
<<<<<<< HEAD
	"fmt"
=======
>>>>>>> e16be99060d970b3d3f909b223482a19b6250048
	"net/http"
)

func LogoutUser(w http.ResponseWriter, r *http.Request) {
	err := SessionManager.Destroy(r.Context())
	if err != nil {
<<<<<<< HEAD
		fmt.Println(err)
=======
		w.WriteHeader(http.StatusBadRequest)
		return
>>>>>>> e16be99060d970b3d3f909b223482a19b6250048
	}

	logout := JsonResponse{
		Message: "Successfully logged out!",
		IsValid: true,
	}
	json.NewEncoder(w).Encode(logout)
}
