export default function Summary({ expenses }) {
  const total = expenses.reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
  const categories = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + (Number(e.amount) || 0);
    return acc;
  }, {});

  return (
    <div className="summary">
      <h3>Total Spending: €{total.toFixed(2)}</h3>
      <ul>
        {Object.entries(categories).map(([cat, amt]) => (
          <li key={cat}>{cat}: €{amt.toFixed(2)}</li>
        ))}
      </ul>
    </div>
  );
}

