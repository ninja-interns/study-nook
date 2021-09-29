package studynook

//run your `go run main.go` in server/cmd
//here will hold the global structs that will need to be used across the application

//User struct
type User struct {
	ID        string `json:"id"`
	Email     string `json:"email"`
	Name      string `json:"name"`
	Username  string `json:"username"`
	Password  string `json:"password"`
	IsVerfied bool   `json:"isVerified"`
	Token     string `json:"token"`
}
