import { useState } from "react";

function getTodayISODate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function ExpenseForm({ addExpense }) {
  const [category, setCategory] = useState("Grocery");
  const [customCategory, setCustomCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(getTodayISODate());

  const handleSubmit = (e) => {
    e.preventDefault();

    const finalCategory =
      category === "Other" ? customCategory : category;

    if (!finalCategory || !amount || !title || !date) return;

    addExpense({
      category: finalCategory,
      amount: Number(amount),
      title,
      date, // save the date
    });

    setCategory("Grocery");
    setCustomCategory("");
    setAmount("");
    setTitle("");
    setDate(getTodayISODate()); // reset to today on submit
  };

  return (
    <div className="expense-card">
      <h3>Add Expense</h3>
      <form className="expense-form" onSubmit={handleSubmit}>
        {/* Category */}
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
            onChange={(e) => setCustomCategory(e.target.value)}
          />
        </div>

        {/* Date */}
        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        {/* Amount */}
        <label>Amount (€)</label>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        {/* Title/Details */}
        <label>Title/Details</label>
        <input
          type="text"
          placeholder="Title or Details"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button className="primary-btn" type="submit">
          Add Expense
        </button>
      </form>
    </div>
  );
}
