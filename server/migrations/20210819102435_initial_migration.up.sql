CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash BYTEA NOT NULL,
    name TEXT NOT NULL,
    username TEXT UNIQUE NOT NULL
)


CREATE TABLE userimages (
    id INT UNIQUE NOT NULL,
    image_file_path TEXT NOT NULL
);


