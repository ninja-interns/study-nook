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

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS shopItems (
    id uuid NOT NULL DEFAULT uuid_generate_v4 (),
    CONSTRAINT pkey PRIMARY KEY (id),
    category text NOT NULL,
    name text NOT NULL,
    level INT NOT NULL,
    cost INT NOT NULL,
    src text
);

INSERT INTO shopItems (category, name, level,
    COST, src)
    VALUES ('backgrounds', 'Cool Orange', 3, 200, 'exampleBackground.jpg');

INSERT INTO shopItems (category, name, level,
    COST, src)
    VALUES ('backgrounds', 'Pastels', 3, 200, 'pastelBookShelf.jpg');

CREATE TABLE IF NOT EXISTS shopItemsOwned (
    id uuid NOT NULL DEFAULT uuid_generate_v4 (),
    shopItemID uuid UNIQUE REFERENCES shopItems (id),
    userID text REFERENCES users (id),
    category text NOT NULL,
    name text NOT NULL,
    level INT NOT NULL,
    src text
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

