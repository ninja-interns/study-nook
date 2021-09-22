package levelExperience

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"studynook.go/auth"
)

type Level struct {
	Experience string `json: "exp"`
}

type Time struct {
	Minutes int `json: "minutes"`
}

type JsonResponse struct {
	Level int `json: "level"`
}

func CalculateEXPHandler(w http.ResponseWriter, r *http.Request, u *auth.User) {
	// Creates instance of report struct and decode fatched data to it
	time := &Time{}
	err := json.NewDecoder(r.Body).Decode(time)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	fmt.Println(time.Minutes)

	expGained := time.Minutes * 50

	fmt.Println("EXP gained is: ", expGained)

}

func GetLevelHandler(w http.ResponseWriter, r *http.Request, u *auth.User) {

	// Creates instance of report struct and decode fatched data to it
	level := &Level{}
	err := json.NewDecoder(r.Body).Decode(level)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	fmt.Println(level)

	currentExp, err := strconv.Atoi(level.Experience)
	if err != nil {
		fmt.Println(err)
	}

	if currentExp > 0 && currentExp < 5000 {
		currentLevel := currentExp / 1000
		fmt.Println("Level is: ", currentLevel)
	} else if currentExp >= 5000 && currentExp < 11250 {
		currentExp -= 5000
		currentLevel := currentExp / 1500
		currentLevel += 5
		fmt.Println("Level is: ", currentLevel)
	} else if currentExp >= 11250 && currentExp < 22500 {
		currentExp -= 11250
		currentLevel := currentExp / 2000
		currentLevel += 10
		fmt.Println("Level is: ", currentLevel)
	} else if currentExp >= 22500 && currentExp < 37500 {
		currentExp -= 22500
		currentLevel := currentExp / 3000
		fmt.Println("Level is: ", currentLevel)
	} else if currentExp >= 37500 && currentExp < 77500 {
		currentExp -= 37500
		currentLevel := currentExp / 4000
		currentLevel += 20
		fmt.Println("Level is: ", currentLevel)
	} else {
		json.NewEncoder(w).Encode(&JsonResponse{100})
		fmt.Println("Level is: ", 100)
	}
}
