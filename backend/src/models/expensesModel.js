// src/models/expensesModel.js
import pool from "../config/db.js";

// Get all expenses, newest first
export const getAllExpenses = async () => {
  const query = `
    SELECT id, title, amount, category, date
    FROM expenses
    ORDER BY date DESC, id DESC
  `;
  const result = await pool.query(query);
  return result.rows;
};

// Add a new expense
export const addExpense = async ({ title, amount, category, date }) => {
  const query = `
    INSERT INTO expenses (title, amount, category, date)
    VALUES ($1, $2, $3, $4)
    RETURNING id, title, amount, category, date
  `;
  const values = [title, amount, category, date];

  const result = await pool.query(query, values);
  return result.rows[0];
};

// Delete an expense by id
export const deleteExpense = async (id) => {
  const query = `
    DELETE FROM expenses
    WHERE id = $1
    RETURNING id, title, amount, category, date
  `;
  const values = [id];

  const result = await pool.query(query, values);
  return result.rows[0]; // undefined if nothing deleted
};
