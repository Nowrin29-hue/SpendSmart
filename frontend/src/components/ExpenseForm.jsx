import { useState } from "react";

export default function ExpenseForm({ addExpense }) {
  const [category, setCategory] = useState("Grocery");
  const [customCategory, setCustomCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalCategory = category === "Other" ? customCategory : category;
    if (!finalCategory || !amount || !title) return;

    addExpense({ category: finalCategory, amount: Number(amount), title });
    setCategory("Grocery");
    setCustomCategory("");
    setAmount("");
    setTitle("");
  };

  return (
    <div className="expense-card">
      <h3>Add Expense</h3>
      <form className="expense-form" onSubmit={handleSubmit}>
        {/* Category First */}
        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>Grocery</option>
          <option>Entertainment</option>
          <option>Utilities</option>
          <option>Transport</option>
          <option>Other</option>
        </select>

        <div className={`custom-category-wrapper ${category === "Other" ? "show" : ""}`}>
          <input
            type="text"
            className="custom-category-input"
            placeholder="Enter custom category"
            value={customCategory}
            onChange={(e) => setCustomCategory(e.target.value)}
          />
        </div>

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

        <button className="primary-btn" type="submit">Add Expense</button>
      </form>
    </div>
  );
}
