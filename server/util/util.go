package util

import (
	"golang.org/x/crypto/bcrypt"
)

//one way hashing function
//returns hashed string
func Hash(plainText string) (string, error) {

	hashedText, err := bcrypt.GenerateFromPassword([]byte(plainText), 8)
	if err != nil {
		return string(hashedText[:]), err
	}
	return string(hashedText[:]), nil
}
