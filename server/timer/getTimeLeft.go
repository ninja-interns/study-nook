package timer

import "net/http"

// import the timer finish time from the user
func GetTimeLeft(w http.ResponseWriter, r *http.Request) {
	// Push the timer left until the future time back to the user
	//time.Until(futureTime)

}
// save the timer on a cookie so if the page refreshes the user can still access it