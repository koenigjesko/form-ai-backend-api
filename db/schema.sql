CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    surname TEXT,
    profile_picture BLOB  
);

CREATE TABLE IF NOT EXISTS generations (
    user_id INTEGER PRIMARY KEY,
    uploaded_picture BLOB,
    generated_picture BLOB 
);
