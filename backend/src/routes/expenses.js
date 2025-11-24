// src/routes/expenses.js
import express from "express";
import {
  fetchExpenses,
  createExpense,
  removeExpense,
} from "../controllers/expensesController.js";

const router = express.Router();

router.get("/", fetchExpenses);
router.post("/", createExpense);
router.delete("/:id", removeExpense);

export default router;
