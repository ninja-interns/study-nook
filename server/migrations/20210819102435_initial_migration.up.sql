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
    timer_duration int,
    user_id text NOT NULL,
    finish_time timestamp,
    is_completed boolean
);

CREATE TABLE IF NOT EXISTS todo (
    id text PRIMARY KEY,
    user_id text NOT NULL,
    todo_text text NOT NULL,
    is_completed boolean NOT NULL
);

CREATE TABLE IF NOT EXISTS reports (
    submission_id serial PRIMARY KEY,
    username text UNIQUE NOT NULL,
    date_submission timestamptz NOT NULL DEFAULT NOW(),
    message text NOT NULL
);

CREATE TABLE IF NOT EXISTS admins (
    id text PRIMARY KEY,
    email text UNIQUE NOT NULL,
    password_hash bytea NOT NULL
);

CREATE TABLE IF NOT EXISTS theme (
    user_id text NOT NULL,
    dark_theme boolean NOT NULL
);
