function ExpenseList({ expenses, currencySymbol }) {
  const total = expenses.reduce(
    (sum, e) => sum + Number(e.amount),
    0
  );

  if (expenses.length === 0) {
    return (
      <div className="expense-card">
        <h3>Expense List</h3>
        <p className="empty-state">
          No expenses yet. Add your first expense to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="expense-card">
      <h3>Expense List</h3>
      <p className="list-summary">
        You have {expenses.length} expenses totaling{" "}
        {currencySymbol}
        {total.toFixed(2)}.
      </p>
      <ul>
        {expenses.map((e, index) => (
          <li key={index} className="expense-row">
            <div className="expense-main">
              <span className="expense-title">
                {e.title}
              </span>
              <span className="expense-meta">
                {e.category} · {e.date}
              </span>
            </div>
            <span className="expense-amount">
              {currencySymbol}
              {e.amount.toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpenseList;
