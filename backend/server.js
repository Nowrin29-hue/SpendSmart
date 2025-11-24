import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import expensesRoutes from "./src/routes/expenses.js";
import errorHandler from "./src/middleware/errorHandler.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/expenses", expensesRoutes);

// Error handler (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));