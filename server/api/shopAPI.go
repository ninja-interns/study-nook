package api

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"

	"studynook.go"
)

func (c *Controller) GetShopItems(w http.ResponseWriter, r *http.Request, u *studynook.User) {
	var arr interface{}

	fmt.Println("hit shop")

	sqlStatement := `SELECT array_to_json(array_agg(row_to_json(shopItems))) FROM shopItems;`

	err := c.DB.Conn.QueryRow(context.Background(), sqlStatement).Scan(&arr)
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

func (c *Controller) HandleShopItemBuy(w http.ResponseWriter, r *http.Request, u *studynook.User) {
	i := &shopItemID{}
	err := json.NewDecoder(r.Body).Decode(i)
	if err != nil {
		fmt.Println(err)
		return
	}

	//insert into table shopItemsOwn that has the category, name, lv, src, userid and item id
	sqlStatement := `INSERT INTO shopItemsOwned(shopItemID, userID, category, name, level, src) VALUES($1, $2, $3, $4, $5, $6);`

	_, err = c.DB.Conn.Exec(context.Background(), sqlStatement, i.ID, u.ID, i.Category, i.Name, i.Level, i.Src)
	if err != nil {
		fmt.Println(err)
		return
	}

	json.NewEncoder(w).Encode(http.StatusOK)
}

func (c *Controller) GetInventoryItems(w http.ResponseWriter, r *http.Request, u *studynook.User) {
	var arr interface{}

	sqlStatement := `SELECT array_to_json(array_agg(row_to_json(shopItemsOwned))) FROM shopItemsOwned WHERE userid = $1;`

	err := c.DB.Conn.QueryRow(context.Background(), sqlStatement, u.ID).Scan(&arr)
	if err != nil {
		fmt.Println(err)
		return
	}

	json.NewEncoder(w).Encode(arr)
}
