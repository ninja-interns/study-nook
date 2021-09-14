.PHONY: up
up:
	./bin/migrateLinux -database 'postgres://dev:dev@localhost:5432/studynook?sslmode=disable' -path ./server/migrations up

.PHONY: drop
drop:
	./bin/migrateLinux -database 'postgres://dev:dev@localhost:5432/studynook?sslmode=disable' -path ./server/migrations drop -f

.PHONY: dirtyV1
dirtyV1:
	./bin/migrateLinux -path ./server/migrations -database 'postgres://dev:dev@localhost:5432/studynook?sslmode=disable' force 20210819102435
