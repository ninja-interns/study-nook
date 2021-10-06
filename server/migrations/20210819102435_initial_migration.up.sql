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

CREATE TABLE IF NOT EXISTS user_stats (
    id text UNIQUE PRIMARY KEY NOT NULL,
    exp_amount int NOT NULL,
    sessions_completed int NOT NULL,
    hours_nooked int NOT NULL,
    achievements_unlocked int NOT NULL,
    backgrounds_unlocked int NOT NULL,
    coins int NOT NULL,
    CONSTRAINT fk_users FOREIGN KEY (id) REFERENCES users (id)
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

CREATE TABLE IF NOT EXISTS user_achievements (
    id text NOT NULL PRIMARY KEY,
    level_medal_1 boolean NOT NULL,
    level_medal_2 boolean NOT NULL,
    level_medal_3 boolean NOT NULL,
    sessions_medal_1 boolean NOT NULL,
    sessions_medal_2 boolean NOT NULL,
    sessions_medal_3 boolean NOT NULL,
    hours_medal_1 boolean NOT NULL,
    hours_medal_2 boolean NOT NULL,
    hours_medal_3 boolean NOT NULL,
    backgrounds_medal_1 boolean NOT NULL,
    backgrounds_medal_2 boolean NOT NULL,
    backgrounds_medal_3 boolean NOT NULL,
    CONSTRAINT fk_users FOREIGN KEY (id) REFERENCES users (id)
);

