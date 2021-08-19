CREATE TABLE "User" (
    id INT UNIQUE PRIMARY KEY,
    email VARCHAR( 255 ) UNIQUE NOT NULL,
    password_hash BYTEA NOT NULL,

    deleted_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(id)
);


CREATE TABLE "UserCookie" (
    id INT UNIQUE PRIMARY KEY,
    user_cookie TEXT
);
CREATE TABLE "UserImages" (
    id INT UNIQUE NOT NULL,
    image_file_path TEXT NOT NULL
);

CREATE TABLE "PlayerAchievements"(
    id INT UNIQUE NOT NULL, 
    achievement TEXT NOT NULL
);