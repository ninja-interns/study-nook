package ImageUploads

import (
	"context"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"net/http"
	"os"
	"path/filepath"
	"time"

	"github.com/h2non/filetype"
)

const MAX_UPLOAD_SIZE = 1024 * 1024

type FileData struct {
	file_name    string `json: "file_name"`
	fileExt      string `json: "extension"`
	encoded_data string `json: "b64Encoding"`
}

func (db_wr *dbWrapper) handleImageSend(w http.ResponseWriter, r *http.Request) {
	conn := db_wr.conn
	userInfo := UserData{}
	err := json.NewDecoder(r.Body).Decode(&userInfo)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
	}
	ctx := context.Background()
	query := `SELECT image FROM UserImages WHERE id=$1`
	imgData := ' '
	err = conn.QueryRow(ctx, query, userInfo.userId).Scan(&imgData)
	if err != nil && imgData == ' ' {
		http.Error(w, err.Error(), http.StatusBadGateway)
	}
	sendImageFile(imgData)
}

func sendImageFile(imgData string) {

}

//Image size initially set to 1MB Max
//Image does not save to the database yet, instead the image is stored in a local directory called uploads
//I used curl to test image uploading example -> curl -F 'file=@file_path' http://localhost:3000/api/image-upload/
//Source https://freshman.tech/file-upload-golang/
//
/**Function handler for images**/
func (db_wr *dbWrapper) handleImageUpload(w http.ResponseWriter, r *http.Request) {

	/**Take image from the request body**/
	r.Body = http.MaxBytesReader(w, r.Body, MAX_UPLOAD_SIZE)

	/**Throw error if image size is too big**/
	if err := r.ParseMultipartForm(MAX_UPLOAD_SIZE); err != nil {
		http.Error(w, "Uploaded file is too big", http.StatusBadRequest)
		return
	}

	/**Open file**/
	file, fileHeader, err := r.FormFile("file")
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	defer file.Close()

	/**Validating received files only checks if the received file is jpeg or png at the momemnt**/
	buff := make([]byte, 512)
	_, err = file.Read(buff)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	filetype := http.DetectContentType(buff)
	if filetype != "images/jpeg" && filetype != "image/png" {
		http.Error(w, "Invalid file format", http.StatusBadRequest)
		return
	}

	//Reset file pointer to the beginning for io.copy()
	_, err = file.Seek(0, io.SeekStart)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	//Create uploads directory if it doesn't exist
	err = os.MkdirAll("./uploads", os.ModePerm)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	//Sets name of the uploaded file to the time it was received in since epoch
	// which would be the function call time.now().UnixNano()
	dst, err := os.Create(fmt.Sprintf("./uploads/%d%s", time.Now().UnixNano(), filepath.Ext(fileHeader.Filename)))

	defer dst.Close()

	_, err = io.Copy(dst, file)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	fmt.Fprintf(w, "Upload was successful")
}

func (db_wr *dbWrapper) handleImageRetrieve(w http.ResponseWriter, r *http.Request) {
	id := "fakeid"
	filepath := "./upload/default-profile.png"
	dbConnector := db_wr.conn
	ctx := context.Background()
	query := "SELECT image_file_path FROM UserImages WHERE id=$1;"
	err := dbConnector.QueryRow(ctx, query, id).Scan(&filepath)
	/**Failed to get file path, returning default profile path instead**/
	if err != nil {
		filepath = "./upload/default-profile.png"
		fmt.Printf("Cannot query image from user id: " + id)
	}

	//Send image to frontend
	data, err := ioutil.ReadFile(filepath)
	ext, err := filetype.Match(data)
	if err != nil {
		return
	}
	sEnc := base64.StdEncoding.EncodeToString(data)
	jsonData := &FileData{filepath, ext.Extension, sEnc}
	json.NewEncoder(w).Encode(jsonData)
}
