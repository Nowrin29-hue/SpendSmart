// src/controllers/expensesController.js
import {
  getAllExpenses,
  addExpense,
  deleteExpense,
} from "../models/expensesModel.js";

export const fetchExpenses = async (req, res, next) => {
  try {
    const expenses = await getAllExpenses();
    res.json(expenses);
  } catch (err) {
    next(err);
  }
};

export const createExpense = async (req, res, next) => {
  try {
    const { title, amount, category, date } = req.body;

    // Basic validation
    if (!title || !amount || !category || !date) {
      return res
        .status(400)
        .json({ message: "title, amount, category and date are required" });
    }

    const parsedAmount = Number(amount);
    if (Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      return res
        .status(400)
        .json({ message: "amount must be a positive number" });
    }

    const expense = await addExpense({
      title,
      amount: parsedAmount,
      category,
      date,
    });

    res.status(201).json(expense);
  } catch (err) {
    next(err);
  }
};

export const removeExpense = async (req, res, next) => {
  try {
    const deleted = await deleteExpense(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.json(deleted);
  } catch (err) {
    next(err);
  }
};
