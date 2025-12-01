import { useState } from "react";

function ExpenseList({ expenses, currencySymbol }) {
  const [yearFilter, setYearFilter] = useState("all");
  const [monthFilter, setMonthFilter] = useState("all");

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

  const monthNames = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
  ];

  // Collect available years from the data (e.g. 2024, 2025)
  const yearsSet = new Set();
  expenses.forEach((e) => {
    if (!e.date) return;
    const y = e.date.slice(0, 4);
    if (/^\d{4}$/.test(y)) yearsSet.add(y);
  });
  const availableYears = Array.from(yearsSet).sort();

  // Apply year + month filter
  const filtered = expenses.filter((e) => {
    if (!e.date) return false;
    const [y, m] = e.date.split("-");

    if (yearFilter !== "all" && y !== yearFilter) return false;
    if (monthFilter !== "all" && m !== monthFilter) return false;
    return true;
  });

  // Sort by date (newest first)
  const sorted = [...filtered].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // Limit to latest 10
  const visible = sorted.slice(0, 10);

  const handleClearFilters = () => {
    setYearFilter("all");
    setMonthFilter("all");
  };

  return (
    <div className="expense-card">
      <h3>Expense List</h3>

      <div className="expense-filters">
        <label>
          Year:
          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
          >
            <option value="all">All</option>
            {availableYears.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </label>

        <label>
          Month:
          <select
            value={monthFilter}
            onChange={(e) => setMonthFilter(e.target.value)}
          >
            <option value="all">All</option>
            {monthNames.map((name, index) => {
              const monthValue = String(index + 1).padStart(2, "0");
              return (
                <option key={monthValue} value={monthValue}>
                  {name}
                </option>
              );
            })}
          </select>
        </label>

        <button
          type="button"
          className="clear-filters-btn"
          onClick={handleClearFilters}
        >
          Clear filters
        </button>
      </div>

      <p className="list-summary">
        Showing {visible.length} of {filtered.length} filtered expenses (total{" "}
        {expenses.length}) totaling {currencySymbol}
        {total.toFixed(2)}.
      </p>

      <ul>
        {visible.map((e, index) => (
          <li key={index} className="expense-row">
            <div className="expense-main">
              <span className="expense-title">{e.title}</span>
              <span className="expense-meta">
                {e.category} · {e.date}
              </span>
            </div>
            <span className="expense-amount">
              {currencySymbol}
              {Number(e.amount).toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpenseList;
