CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    surname TEXT NOT NULL,
    email TEXT NOT NULL,
    profile_image_path BLOB
);

CREATE TABLE IF NOT EXISTS generations (
    operation_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    uploaded_image_path TEXT NOT NULL,
    generated_image_path BLOB
);
