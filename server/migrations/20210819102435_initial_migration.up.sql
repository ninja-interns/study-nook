CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash BYTEA NOT NULL,
    name TEXT NOT NULL,
    username TEXT UNIQUE NOT NULL
);


CREATE TABLE IF NOT EXISTS userimages (
    id INT UNIQUE NOT NULL,
    imagedata BYTEA,
    PRIMARY KEY(id),
    CONSTRAINT fk_user
        FOREIGN KEY(id)
            REFERENCES users(id)
            ON DELETE CASCADE
);


