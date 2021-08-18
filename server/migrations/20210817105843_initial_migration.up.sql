CREATE TABLE users (
    
    username TEXT UNIQUE PRIMARY KEY,
    email TEXT UNIQUE,
    password_hash BYTEA NOT NULL,
    name TEXT NOT NULL

)