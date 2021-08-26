package auth

import (
	"fmt"
	"net/http"
)

func VerifyEmail(w http.ResponseWriter, r *http.Request) {
	fmt.Println("verify")
}
