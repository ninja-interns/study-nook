# MAKE FILE FOR MAC
.PHONY: up
up:
	./bin/migrate.darwin-amd64 -database 'postgres://dev:dev@localhost:5432/studynook?sslmode=disable' -path ./server/migrations up

.PHONY: drop
drop:
	./bin/migrate.darwin-amd64 -database 'postgres://dev:dev@localhost:5432/studynook?sslmode=disable' -path ./server/migrations drop -f

# MAKE FILE FOR WINDOWS
# .PHONY: up
# up:
# 	./bin/migrate -database 'postgres://dev:dev@localhost:5432/studynook?sslmode=disable' -path ./server/migrations up

# .PHONY: drop
# drop:
# 	./bin/migrate -database 'postgres://dev:dev@localhost:5432/studynook?sslmode=disable' -path ./server/migrations drop -f
