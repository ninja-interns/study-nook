module main.go

go 1.16

require (
	//github.com/alexedwards/scs/v2 v2.4.0 // indirect
	github.com/go-chi/chi v1.5.4 // indirect
	github.com/golang-migrate/migrate v3.5.4+incompatible // indirect
	localmodel.com/authentication v1.0.0
)

replace localmodel.com/authentication => ./authentication
