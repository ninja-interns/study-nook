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

CREATE TABLE IF NOT EXISTS reports (
    submission_id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    date_submission TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    message TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS user_stats (
    id TEXT UNIQUE PRIMARY KEY NOT NULL,
    exp_amount INT NOT NULL,
    sessions_completed INT NOT NULL, 
    hours_nooked INT NOT NULL,
    achievements_unlocked INT NOT NULL,
    backgrounds_unlocked INT NOT NULL,
    coins INT NOT NULL,
    CONSTRAINT fk_users
        FOREIGN KEY(id)
            REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS admins (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash BYTEA NOT NULL
);

CREATE TABLE IF NOT EXISTS user_achievements (
    id TEXT NOT NULL PRIMARY KEY,
    level_medal_1 BOOLEAN NOT NULL,
    level_medal_2 BOOLEAN NOT NULL,
    level_medal_3 BOOLEAN NOT NULL,
    sessions_medal_1 BOOLEAN NOT NULL,
    sessions_medal_2 BOOLEAN NOT NULL,
    sessions_medal_3 BOOLEAN NOT NULL,
    hours_medal_1 BOOLEAN NOT NULL,
    hours_medal_2 BOOLEAN NOT NULL,
    hours_medal_3 BOOLEAN NOT NULL,
    backgrounds_medal_1 BOOLEAN NOT NULL,
    backgrounds_medal_2 BOOLEAN NOT NULL,
    backgrounds_medal_3 BOOLEAN NOT NULL,
    CONSTRAINT fk_users
        FOREIGN KEY(id)
            REFERENCES users(id)
);
