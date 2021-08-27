package auth

import (
	"fmt"

	"github.com/gofrs/uuid"
)

//Create token that can be added to users table, both recover password and verify email will use it.
func CreateToken() string {
	token, err := uuid.NewV4()
	if err != nil {
		fmt.Println(err)
	}
	return token.String()
}
