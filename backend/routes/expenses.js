import express from 'express';
import pool from '../db/index.js';

const router = express.Router();

// Get all expenses
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM expenses ORDER BY date DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add expense
router.post('/', async (req, res) => {
  const { title, amount, category, date, description } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO expenses (title, amount, category, date, description) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, amount, category, date, description]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
