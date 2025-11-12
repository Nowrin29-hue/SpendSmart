import { useState } from "react";

function ExpenseForm({ addExpense }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount || !category) return;
    addExpense({ title, amount: Number(amount), category });
    setTitle("");
    setAmount("");
    setCategory("");
  };

  return (
    <div className="expense-card">
      <h3>Add Expense</h3>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        <label>Amount:</label>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
        <label>Category:</label>
        <input value={category} onChange={(e) => setCategory(e.target.value)} required />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default ExpenseForm;



