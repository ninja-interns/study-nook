# study-nook

Chrome extension app developed by ninja interns.


commands 



migrate -database 'postgres://studynook:studynook@localhost:5432/studynook?sslmode=disable' -path . up
migrate -database 'postgres://studynook:studynook@localhost:5432/studynook?sslmode=disable' -path . down
$ sudo docker exec -it f3983dd7600b psql -U studynook -d postgres -c "SELECT * FROM UserImages"