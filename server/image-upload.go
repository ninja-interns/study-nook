package main

import (
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"time"
)

type File struct {
	file_name string
	fileExt   string
}

//Image size initially set to 1MB Max
//Image does not save to the database yet, instead the image is stored in a local directory called uploads
//I used curl to test image uploading example -> curl -F 'file=@file_path' http://localhost:3000/api/image-upload/
//Source https://freshman.tech/file-upload-golang/
//
/**Function handler for images**/
func (db_wr dbWrapper) handleImageUpload(w http.ResponseWriter, r *http.Request) {

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

func handleImageRetrieve(w http.ResponseWriter, r *http.Request) {

}
