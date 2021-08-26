package reports

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type Report struct {
	Message string `json: string`
}

func SubmitReports(w http.ResponseWriter, r *http.Request) {

	report := &Report{}
	err := json.NewDecoder(r.Body).Decode(report)
	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	fmt.Println("This is message: ")
	fmt.Println(report.Message)
}
