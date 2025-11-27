import { useState } from "react";

function getTodayISODate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function ExpenseForm({ addExpense, currencySymbol }) {
  const [category, setCategory] = useState("Grocery");
  const [customCategory, setCustomCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(getTodayISODate());
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const finalCategory =
      category === "Other" ? customCategory.trim() : category;

    if (!finalCategory) {
      setError("Please choose a category.");
      return;
    }

    if (!title.trim()) {
      setError("Please enter a title or note.");
      return;
    }

    const numericAmount = Number(amount);
    if (!numericAmount || numericAmount <= 0) {
      setError("Amount must be greater than 0.");
      return;
    }

    if (!date) {
      setError("Please select a date.");
      return;
    }

    addExpense({
      category: finalCategory,
      amount: numericAmount,
      title: title.trim(),
      date,
    });

    setCategory("Grocery");
    setCustomCategory("");
    setAmount("");
    setTitle("");
    setDate(getTodayISODate());
    setError("");
  };

  return (
    <div className="expense-card">
      <h3>Add Expense</h3>
      <form className="expense-form" onSubmit={handleSubmit}>
        <label>Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Grocery</option>
          <option>Entertainment</option>
          <option>Utilities</option>
          <option>Transport</option>
          <option>Other</option>
        </select>

        <div
          className={`custom-category-wrapper ${
            category === "Other" ? "show" : ""
          }`}
        >
          <input
            type="text"
            className="custom-category-input"
            placeholder="Enter custom category"
            value={customCategory}
            onChange={(e) =>
              setCustomCategory(e.target.value)
            }
          />
        </div>

        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <label>Amount ({currencySymbol})</label>
        <input
          type="number"
          min="0"
          step="0.01"
          placeholder={`Amount in ${currencySymbol}`}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <label>Title/Details</label>
        <input
          type="text"
          placeholder="Groceries, rent, subscription..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {error && (
          <p className="form-error-message">{error}</p>
        )}

        <button className="primary-btn" type="submit">
          Add Expense
        </button>
      </form>
    </div>
  );
}
