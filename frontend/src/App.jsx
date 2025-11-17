import { useState } from "react";
import "./App.css";

import Login from "./components/Login";
import Signup from "./components/Signup";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import DownloadMenu from "./components/DownloadMenu";
import Sidebar from "./components/Sidebar";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignup, setShowSignup] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState(0);

  const handleLoginSuccess = () => setIsLoggedIn(true);
  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowSignup(null);
    setExpenses([]);
    setIncome(0);
  };

  const addExpense = (expense) => setExpenses((prev) => [...prev, expense]);

  const totalExpenses = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
  const savings = income - totalExpenses;

  // First-time user
  if (!isLoggedIn && showSignup === null) {
    return (
      <div className="first-time-card">
        <h2>Welcome to SpendSmart!</h2>
        <p>Are you a new user or do you already have an account?</p>
        <button onClick={() => setShowSignup(true)}>Sign Up</button>
        <button onClick={() => setShowSignup(false)}>Login</button>
      </div>
    );
  }

  // Login / Signup
  if (!isLoggedIn) {
    return showSignup ? <Signup onSuccess={handleLoginSuccess} /> : <Login onSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="dashboard-layout">
      <Sidebar handleLogout={handleLogout} />

      <main className="dashboard-main single-page-dashboard">

        <div className="stats-cards compact-cards">
          {/* Income & Savings */}
          <div className="analytics-card compact-card">
            <h3>Enter your Income (€)</h3>
            <input
              type="number"
              className="income-input"
              placeholder="Your total income"
              value={income}
              onChange={(e) => setIncome(Number(e.target.value))}
            />
            <p>Total Expenses: €{totalExpenses.toFixed(2)}</p>
            <p>Savings: €{savings.toFixed(2)}</p>
            <div className="savings-bar-container">
              <div
                className="savings-bar"
                style={{
                  width: income ? `${Math.max((savings / income) * 100, 0)}%` : "0%",
                  backgroundColor: savings >= 0 ? "#10b981" : "#ef4444",
                }}
              ></div>
            </div>
          </div>

          {/* Download Options */}
          <div className="analytics-card compact-card">
            <h3>Download Options</h3>
            <DownloadMenu expenses={expenses} />
          </div>
        </div>

        <div className="dashboard-grid compact-grid">
          {/* Add Expense */}
          <ExpenseForm addExpense={addExpense} />
          {/* Expense List */}
          <ExpenseList expenses={expenses} />
        </div>
      </main>
    </div>
  );
}

export default App;
