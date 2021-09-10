package shop

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"reflect"

	initializeDB "studynook.go/initializedb"
)

func GetShopItems(w http.ResponseWriter, r *http.Request) {
	var arr interface{}
	var src []byte

	fmt.Println("hit shop")
	//Querying our database where our email column = the email the user input on the frontend
	sqlStatement := `SELECT array_to_json(array_agg(row_to_json(shopItems))) FROM shopItems;`

	//scanning the id, email and password from the DB into the created variables above
	err := initializeDB.Conn.QueryRow(context.Background(), sqlStatement).Scan(&arr)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println("hit shop")
	//Querying our database where our email column = the email the user input on the frontend
	sqlStatement = `SELECT src FROM shopItems;`

	//scanning the id, email and password from the DB into the created variables above
	err = initializeDB.Conn.QueryRow(context.Background(), sqlStatement).Scan(src)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println(reflect.TypeOf(src))

	json.NewEncoder(w).Encode(arr)
}
