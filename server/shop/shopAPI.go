package shop

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"

	"studynook.go/auth"
	initializeDB "studynook.go/initializedb"
)

func GetShopItems(w http.ResponseWriter, r *http.Request, u *auth.User) {
	var arr interface{}

	fmt.Println("hit shop")

	sqlStatement := `SELECT array_to_json(array_agg(row_to_json(shopItems))) FROM shopItems;`

	err := initializeDB.Conn.QueryRow(context.Background(), sqlStatement).Scan(&arr)
	if err != nil {
		fmt.Println(err)
		return
	}

	json.NewEncoder(w).Encode(arr)
}

type shopItemID struct {
	ID       string `json:"shopItemID"`
	Name     string `json:"name"`
	Category string `json:"category"`
	Level    int    `json:"level"`
	Src      string `json:"src"`
}

func HandleShopItemBuy(w http.ResponseWriter, r *http.Request, u *auth.User) {
	i := &shopItemID{}
	err := json.NewDecoder(r.Body).Decode(i)
	if err != nil {
		fmt.Println(err)
		return
	}

	//insert into table shopItemsOwn that has the category, name, lv, src, userid and item id
	sqlStatement := `INSERT INTO shopItemsOwned(shopItemID, userID, category, name, level, src) VALUES($1, $2, $3, $4, $5, $6);`

	_, err = initializeDB.Conn.Exec(context.Background(), sqlStatement, i.ID, u.ID, i.Category, i.Name, i.Level, i.Src)
	if err != nil {
		fmt.Println(err)
		return
	}

	json.NewEncoder(w).Encode(http.StatusOK)
}

func GetInventoryItems(w http.ResponseWriter, r *http.Request, u *auth.User) {
	var arr interface{}

	fmt.Println("hit shop")

	sqlStatement := `SELECT array_to_json(array_agg(row_to_json(shopItemsOwned))) FROM shopItemsOwned;`

	err := initializeDB.Conn.QueryRow(context.Background(), sqlStatement).Scan(&arr)
	if err != nil {
		fmt.Println(err)
		return
	}

	json.NewEncoder(w).Encode(arr)
}
