package shop

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"

	initializeDB "studynook.go/initializedb"
)

func GetShopItems(w http.ResponseWriter, r *http.Request) {
	var arr interface{}

	fmt.Println("hit shop")
	//Querying our database where our email column = the email the user input on the frontend
	sqlStatement := `SELECT array_to_json(array_agg(row_to_json(shopItems))) FROM shopItems;`

	//scanning the id, email and password from the DB into the created variables above
	err := initializeDB.Conn.QueryRow(context.Background(), sqlStatement).Scan(&arr)
	if err != nil {
		fmt.Println(err)
		return
	}

	json.NewEncoder(w).Encode(arr)
}
