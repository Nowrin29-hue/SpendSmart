// src/models/userModel.js
import pool from "../config/db.js";

// Find user by username
export const findUserByUsername = async (username) => {
  const query = `
    SELECT id, username, password_hash, created_at
    FROM users
    WHERE username = $1
  `;
  const result = await pool.query(query, [username]);
  return result.rows[0];
};

// Create new user
export const createUser = async ({ username, passwordHash }) => {
  const query = `
    INSERT INTO users (username, password_hash)
    VALUES ($1, $2)
    RETURNING id, username, created_at
  `;
  const values = [username, passwordHash];
  const result = await pool.query(query, values);
  return result.rows[0];
};
