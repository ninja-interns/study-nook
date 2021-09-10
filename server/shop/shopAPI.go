package shop

import (
	"fmt"
	"net/http"

	"studynook.go/auth"
)

func GetShopItems(w http.ResponseWriter, r *http.Request, u *auth.User) {
	fmt.Println("hit shop items")
}
