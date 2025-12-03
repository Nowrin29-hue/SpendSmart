// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import expensesRoutes from "./src/routes/expenses.js";
import authRoutes from "./src/routes/auth.js";
import errorHandler from "./src/middleware/errorHandler.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/expenses", expensesRoutes);
app.use("/api/auth", authRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "SpendSmart API is running" });
});

// Error handler (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
