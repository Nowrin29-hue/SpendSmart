// src/components/ExpensesChart.jsx
import { useMemo, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function startOfWeek(date) {
  const d = new Date(date);
  const day = d.getDay(); // 0 (Sun) - 6 (Sat)
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Monday as first day
  const monday = new Date(d.setDate(diff));
  monday.setHours(0, 0, 0, 0);
  return monday;
}

function formatYYYYMM(date) {
  const d = new Date(date);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

export default function ExpensesChart({
  expenses,
  currencySymbol,
  chartCategory,
  setChartCategory,
}) {
  const [mode, setMode] = useState("weekly"); // "weekly" | "monthly"

  // Unique categories from expenses
  const categories = useMemo(() => {
    const set = new Set();
    expenses.forEach((e) => {
      if (e.category) set.add(e.category);
    });
    return Array.from(set).sort();
  }, [expenses]);

  // Filtered by selected category (or all)
  const filteredExpenses = useMemo(
    () =>
      chartCategory === "all"
        ? expenses
        : expenses.filter((e) => e.category === chartCategory),
    [expenses, chartCategory]
  );

  // Build labels and data points based on weekly/monthly mode
  const { labels, dataPoints } = useMemo(() => {
    if (!filteredExpenses || filteredExpenses.length === 0) {
      return { labels: [], dataPoints: [] };
    }

    const byPeriod = new Map();

    filteredExpenses.forEach((e) => {
      if (!e.date) return;
      const d = new Date(e.date);
      if (Number.isNaN(d)) return;

      let key;
      if (mode === "weekly") {
        const weekStart = startOfWeek(d);
        key = weekStart.toISOString().slice(0, 10); // YYYY-MM-DD (Monday)
      } else {
        key = formatYYYYMM(d); // YYYY-MM
      }

      const prev = byPeriod.get(key) || { sum: 0, count: 0 };
      byPeriod.set(key, {
        sum: prev.sum + Number(e.amount || 0),
        count: prev.count + 1,
      });
    });

    const sortedKeys = Array.from(byPeriod.keys()).sort();
    const last12 = sortedKeys.slice(-12);

    const labels = last12;
    const dataPoints = last12.map((key) => {
      const { sum, count } = byPeriod.get(key);
      return count > 0 ? sum / count : 0;
    });

    return { labels, dataPoints };
  }, [filteredExpenses, mode]);

  const chartData = {
    labels,
    datasets: [
      {
        label:
          mode === "weekly"
            ? `Average weekly expenses (${currencySymbol})`
            : `Average monthly expenses (${currencySymbol})`,
        data: dataPoints,
        borderColor: "#4f46e5",
        backgroundColor: "rgba(79, 70, 229, 0.2)",
        tension: 0.3,
        pointRadius: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (ctx) =>
            `${currencySymbol}${ctx.parsed.y.toFixed(2)}`,
        },
      },
    },
    scales: {
      y: {
        ticks: {
          callback: (value) =>
            `${currencySymbol}${Number(value).toFixed(0)}`,
        },
      },
    },
  };

  return (
    <div className="analytics-card compact-card">
      <div className="chart-header">
        <div className="chart-header-main">
          <div className="chart-title-row">
            <h3>Spending trends</h3>
            <div className="chart-toggle">
              <button
                type="button"
                className={
                  mode === "weekly"
                    ? "chart-toggle-btn active"
                    : "chart-toggle-btn"
                }
                onClick={() => setMode("weekly")}
              >
                Weekly
              </button>
              <button
                type="button"
                className={
                  mode === "monthly"
                    ? "chart-toggle-btn active"
                    : "chart-toggle-btn"
                }
                onClick={() => setMode("monthly")}
              >
                Monthly
              </button>
            </div>
          </div>

          <p className="card-subtitle">
            Track how your average spending changes over time, for all
            categories or a single one.
          </p>
        </div>

        <div className="chart-filters">
          <label className="chart-filter-label">
            Category
            <select
              value={chartCategory}
              onChange={(e) => setChartCategory(e.target.value)}
            >
              <option value="all">All categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {labels.length === 0 ? (
        <p className="empty-state">
          Not enough data yet. Add a few expenses to see trends.
        </p>
      ) : (
        <Line data={chartData} options={options} />
      )}
    </div>
  );
}
