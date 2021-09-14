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

	sqlStatement := `SELECT array_to_json(array_agg(row_to_json(shopItems))) FROM shopItems;`

	err := initializeDB.Conn.QueryRow(context.Background(), sqlStatement).Scan(&arr)
	if err != nil {
		fmt.Println(err)
		return
	}

	fmt.Println(arr)
	json.NewEncoder(w).Encode(arr)
}

type shopItemID struct {
	Id string `json:"shopItemID"`
}

func HandleShopItemBuy(w http.ResponseWriter, r *http.Request) {
	i := &shopItemID{}
	err := json.NewDecoder(r.Body).Decode(i)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println(i)
}
