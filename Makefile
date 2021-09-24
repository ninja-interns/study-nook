# MAKE FILE FOR LINUX
.PHONY: up
up:
	./bin/migrate.linux-amd64 -database 'postgres://dev:dev@localhost:5432/studynook?sslmode=disable' -path ./server/migrations up

.PHONY: drop
drop:
	./bin/migrate.linux-amd64 -database 'postgres://dev:dev@localhost:5432/studynook?sslmode=disable' -path ./server/migrations drop -f

# docker start studynook to start container