// src/routes/expenses.js
import express from "express";
import {
  fetchExpenses,
  createExpense,
  removeExpense,
} from "../controllers/expensesController.js";
// import auth middleware later if you want to protect these routes

const router = express.Router();

// Public for now (no auth required)
router.get("/", fetchExpenses);
router.post("/", createExpense);
router.delete("/:id", removeExpense);

export default router;
