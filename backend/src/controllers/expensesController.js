// src/controllers/expensesController.js
import {
  getAllExpenses,
  addExpense,
  deleteExpense,
} from "../models/expensesModel.js";

// GET /api/expenses
export const fetchExpenses = async (req, res, next) => {
  try {
    const expenses = await getAllExpenses();
    res.json(expenses);
  } catch (err) {
    next(err);
  }
};

// POST /api/expenses
export const createExpense = async (req, res, next) => {
  try {
    const { title, amount, category, date } = req.body;

    if (!title || !amount || !category || !date) {
      return res.status(400).json({
        message:
          "Missing required fields: title, amount, category, date",
      });
    }

    const numericAmount = Number(amount);
    if (Number.isNaN(numericAmount) || numericAmount <= 0) {
      return res
        .status(400)
        .json({ message: "Amount must be a positive number" });
    }

    const newExpense = await addExpense({
      title: String(title),
      amount: numericAmount,
      category: String(category),
      date,
    });

    res.status(201).json(newExpense);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/expenses/:id
export const removeExpense = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id || Number.isNaN(Number(id))) {
      return res
        .status(400)
        .json({ message: "A valid expense id is required" });
    }

    const deleted = await deleteExpense(id);

    if (!deleted) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.json(deleted);
  } catch (err) {
    next(err);
  }
};
