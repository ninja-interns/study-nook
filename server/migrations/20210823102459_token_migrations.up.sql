CREATE TABLE email_token(
    email TEXT UNIQUE NOT NULL,
    token VARCHAR UNIQUE NOT NULL,
    timestamp timestamp NOT NULL DEFAULT NOW() 
);