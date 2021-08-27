package auth

import (
	"fmt"

	"github.com/gofrs/uuid"
)

//Create token that can be added to users table, both recover password and verify email will use it.
func CreateToken() (string, error) {
	token, err := uuid.NewV4()
	if err != nil {
		fmt.Println(err)
		return "", err
	}
	return token.String(), nil
}
