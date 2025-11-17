export default function Summary({ expenses, income, setIncome }) {
  const totalExpenses = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
  const savings = (Number(income) || 0) - totalExpenses;

  const savingsColor = savings >= 0 ? "#10b981" : "#ef4444"; // green or red

  return (
    <div className="analytics-card">
      <h3>Finance Overview</h3>

      <label>Enter your Income (€)</label>
      <input
        type="number"
        value={income}
        onChange={(e) => setIncome(e.target.value)}
        placeholder="Your total income"
        className="income-input"
      />

      <p><strong>Total Expenses:</strong> €{totalExpenses.toFixed(2)}</p>
      <p><strong>Savings:</strong> €{savings.toFixed(2)}</p>

      <div className="savings-bar-container">
        <div
          className="savings-bar"
          style={{
            width: `${Math.min(Math.abs(savings) / (Number(income) || 1) * 100, 100)}%`,
            backgroundColor: savingsColor
          }}
        ></div>
      </div>
    </div>
  );
}
