function ExpenseList({ expenses }) {
  return (
    <div className="expense-card">
      <h3>Expense List</h3>
      <ul>
        {expenses.map((e, index) => (
          <li key={index}>
            {e.title} ({e.category}): €{e.amount.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpenseList;
