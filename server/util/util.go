package util

import (
	"golang.org/x/crypto/bcrypt"
)

// Hash function hashes the string input
func Hash(plainText string) ([]byte, error) {

	hashedText, err := bcrypt.GenerateFromPassword([]byte(plainText), 8)
	if err != nil {
		return hashedText, err
	}
	return hashedText, nil
}
