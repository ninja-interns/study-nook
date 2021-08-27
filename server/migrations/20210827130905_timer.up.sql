CREATE TABLE IF NOT EXISTS timer(
    id SERIAL PRIMARY KEY,
    owner_id INTEGER REFERENCES users(id),
    finish_time TIMESTAMP NOT NULL,
    timer_duration INT NOT NULL,
    is_completed BOOLEAN NOT NULL
);