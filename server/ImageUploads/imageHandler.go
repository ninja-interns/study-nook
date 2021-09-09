package ImageUploads

import (
	"net/http"

	"github.com/jackc/pgx"
)

type FileData struct {
	file_name string `json: "file_name"`
	fileExt   string `json: "extension"`
}

type UserData struct {
	userId     string
	userCookie string
}

type dbWrapper struct {
	conn *pgx.Conn
}

func handleImageReceive(w http.ResponseWriter, r *http.Request) {
	file := FileData{}

}
