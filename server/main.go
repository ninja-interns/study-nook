// Main file of study nook

// When creating new files for your React components or pages,
// create a subdirectory on this directory and name it with
// whichever feature you are creating.

package main

import (
	"fmt"
	"net/http"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
)

const MAX_UPLOAD_SIZE = 1024 * 1024

func main() {

	fmt.Println("Welcome to study nook! :)")
	r := chi.NewMux()

	r.Use(middleware.Logger)
	//receives images and handles the data to be stored in the uploads directory
	r.HandleFunc("/api/image-upload/", handleImageUpload)
	http.ListenAndServe(":3000", r)
}
