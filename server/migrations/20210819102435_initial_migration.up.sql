CREATE TABLE IF NOT EXISTS users(
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash BYTEA NOT NULL,
    name TEXT NOT NULL,
    username TEXT UNIQUE NOT NULL,
    is_verified BOOLEAN NOT NULL,
    token TEXT
);

CREATE TABLE IF NOT EXISTS sessions (
	token TEXT PRIMARY KEY,
	data BYTEA NOT NULL,
	expiry TIMESTAMPTZ NOT NULL
);

CREATE INDEX IF NOT EXISTS sessions_expiry_idx ON sessions (expiry);

CREATE TABLE IF NOT EXISTS shopItems(
    id TEXT PRIMARY KEY,
    category TEXT NOT NULL,
    name TEXT NOT NULL,
    lvRequired INT NOT NULL,
    cost INT NOT NULL
);

CREATE TABLE IF NOT EXISTS shopItemsOwned(
    id TEXT PRIMARY KEY,
    shopItemID TEXT REFERENCES shopItems(id),
    userID TEXT REFERENCES users(id)
);
