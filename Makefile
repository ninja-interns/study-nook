.PHONY: up
up:
	./bin/migrate.exe -database 'postgres://dev:dev@localhost:5432/studynook?sslmode=disable' -path ./server/migrations up

.PHONY: drop
drop:
	./bin/migrate.exe -database 'postgres://dev:dev@localhost:5432/studynook?sslmode=disable' -path ./server/migrations drop -f

.PHONY: dirtyV1
dirtyV1:
	./bin/migrate.exe -path ./server/migrations -database 'postgres://dev:dev@localhost:5432/studynook?sslmode=disable' force 20210819102435
