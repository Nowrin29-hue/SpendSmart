// src/models/userModel.js
import pool from "../config/db.js";

// Find a user by username
export const findUserByUsername = async (username) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE username = $1",
    [username]
  );
  return result.rows[0];
};

// Create a new user
export const createUser = async ({ username, password_hash }) => {
  const result = await pool.query(
    `INSERT INTO users (username, password_hash)
     VALUES ($1, $2)
     RETURNING *`,
    [username, password_hash]
  );
  return result.rows[0];
};
