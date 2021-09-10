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

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
 
CREATE TABLE IF NOT EXISTS shopItems(
    id UUID NOT NULL DEFAULT uuid_generate_v4(),
    CONSTRAINT pkey PRIMARY KEY (id),
    category TEXT NOT NULL,
    name TEXT NOT NULL,
    level INT NOT NULL,
    cost INT NOT NULL,
    src BYTEA 
);

INSERT INTO shopItems(category, name, level, cost, src) VALUES('backgrounds', 'Cool Orange', 3, 200, pg_read_binary_file('C:\Users\aruef\Documents\Programs\study-nook\web\src\assets\exampleBackground.jpg'));
INSERT INTO shopItems(category, name, level, cost, src) VALUES('backgrounds', 'Minimalist', 3, 200, bytea('../../web/src/asset/pastelBookShelf.jpg'));

CREATE TABLE IF NOT EXISTS shopItemsOwned(
    id TEXT PRIMARY KEY,
    shopItemID UUID REFERENCES shopItems(id),
    userID TEXT REFERENCES users(id)
);
