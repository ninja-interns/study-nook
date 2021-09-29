
func processImageUpload(w http.ResponseWriter, r *http.Request) {
	if r.Method == "POST" {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	r.ParseMultiPartForm(32 << 20)
	file, handler, err := r.FormFile("uploadimage")
	if err != nil {
		fmt.Println(err)
		return
	}

	defer file.Close()

}