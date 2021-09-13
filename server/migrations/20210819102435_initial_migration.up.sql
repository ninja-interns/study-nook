CREATE TABLE IF NOT EXISTS users (
    id text PRIMARY KEY,
    email text UNIQUE NOT NULL,
    password_hash bytea NOT NULL,
    name text NOT NULL,
    username text UNIQUE NOT NULL,
    is_verified boolean NOT NULL,
    token text
);

CREATE TABLE IF NOT EXISTS sessions (
    token text PRIMARY KEY,
    data bytea NOT NULL,
    expiry timestamptz NOT NULL
);

CREATE INDEX IF NOT EXISTS sessions_expiry_idx ON sessions (expiry);

CREATE TABLE IF NOT EXISTS timer (
    id text PRIMARY KEY,
    owner_id text REFERENCES users (id),
    finish_time timestamp NOT NULL,
    timer_duration int NOT NULL,
    is_completed boolean NOT NULL
);

CREATE TABLE IF NOT EXISTS todo (
    id text PRIMARY KEY,
    -- owner_id text REFERENCES users (id),
    owner_id text NOT NULL,
    todo_text text NOT NULL,
    is_completed boolean NOT NULL
);

