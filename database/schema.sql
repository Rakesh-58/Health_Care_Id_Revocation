CREATE DATABASE healthcare;

USE healthcare;

CREATE TABLE users (
    user_id INT AUTO_INCREMENT UNIQUE KEY,
    username VARCHAR(100) PRIMARY KEY,
    password_hash VARCHAR(256) NOT NULL,
    public_key TEXT NOT NULL,
    is_revoked BOOLEAN DEFAULT 0,
    revoked_at TIMESTAMP
);

CREATE TABLE revocation_list (
    revocation_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100),
    public_key TEXT NOT NULL,
    reason VARCHAR(100),
    revoked_at TIMESTAMP,
    signature TEXT NOT NULL,
    FOREIGN KEY (username) REFERENCES users(username)
);
