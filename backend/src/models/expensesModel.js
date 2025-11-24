// src/models/expensesModel.js
import pool from "../config/db.js";

export const getAllExpenses = async () => {
  const result = await pool.query(
    "SELECT * FROM expenses ORDER BY date DESC, id DESC"
  );
  return result.rows;
};

export const addExpense = async ({ title, amount, category, date }) => {
  const result = await pool.query(
    `INSERT INTO expenses (title, amount, category, date)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [title, amount, category, date]
  );
  return result.rows[0];
};

export const deleteExpense = async (id) => {
  const result = await pool.query(
    "DELETE FROM expenses WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};

