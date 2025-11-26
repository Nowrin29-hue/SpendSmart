import { useState } from "react";
import "./App.css";

import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import ExpenseForm from "./components/ExpenseForm.jsx";
import ExpenseList from "./components/ExpenseList.jsx";
import DownloadMenu from "./components/DownloadMenu.jsx";
import Sidebar from "./components/Sidebar.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignup, setShowSignup] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState(0);
  const [currentPage, setCurrentPage] = useState("dashboard"); // "dashboard" | "sendMoney" | "downloadReports" | "help"

  const handleLoginSuccess = () => setIsLoggedIn(true);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowSignup(null);
    setExpenses([]);
    setIncome(0);
    setCurrentPage("dashboard");
  };

  const addExpense = (expense) =>
    setExpenses((prev) => [...prev, expense]);

  const totalExpenses = expenses.reduce(
    (sum, e) => sum + Number(e.amount),
    0
  );
  const savings = income - totalExpenses;

  // First-time user choice
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
    return showSignup ? (
      <Signup onSuccess={handleLoginSuccess} />
    ) : (
      <Login onSuccess={handleLoginSuccess} />
    );
  }

  // Logged-in area with simple page navigation
  return (
    <div className="dashboard-layout">
      <Sidebar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        handleLogout={handleLogout}
      />

      <main className="dashboard-main single-page-dashboard">
        {/* DASHBOARD PAGE */}
        {currentPage === "dashboard" && (
          <>
            <h1 className="dashboard-title">Dashboard</h1>

            <div className="stats-cards compact-cards">
              {/* Card 1: Add Expense form */}
              <div className="analytics-card compact-card">
                <ExpenseForm addExpense={addExpense} />
              </div>

              {/* Card 2: Income + savings */}
              <div className="analytics-card compact-card">
                <h3>Enter your Income (€)</h3>
                <input
                  type="number"
                  className="income-input"
                  placeholder="Your total income"
                  value={income}
                  onChange={(e) =>
                    setIncome(Number(e.target.value))
                  }
                />
                <p>
                  Total Expenses: €
                  {totalExpenses.toFixed(2)}
                </p>
                <p>Savings: €{savings.toFixed(2)}</p>
                <div className="savings-bar-container">
                  <div
                    className="savings-bar"
                    style={{
                      width: income
                        ? `${Math.max(
                            (savings / income) * 100,
                            0
                          )}%`
                        : "0%",
                      backgroundColor:
                        savings >= 0 ? "#10b981" : "#ef4444",
                    }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Below: Expense list */}
            <div className="dashboard-grid compact-grid">
              <ExpenseList expenses={expenses} />
            </div>
          </>
        )}

        {/* SEND MONEY PAGE */}
        {currentPage === "sendMoney" && (
          <>
            <h1 className="dashboard-title">Send Money</h1>

            <div className="send-money-page">
              <div className="send-money-hero">
                <h2>Choose a provider</h2>
                <p>
                  Select a service to send money securely to your
                  family and friends.
                </p>
              </div>

              <div className="providers-grid">
                <button
                  className="provider-card paypal"
                  type="button"
                  onClick={() =>
                    window.open(
                      "https://www.paypal.com/myaccount/transfer",
                      "_blank",
                      "noopener,noreferrer"
                    )
                  }
                >
                  <div className="provider-visual" />
                  <h3>PayPal</h3>
                  <p>
                    Send and receive money worldwide with your
                    PayPal account.
                  </p>
                </button>

                <button
                  className="provider-card remitly"
                  type="button"
                  onClick={() =>
                    window.open(
                      "https://www.remitly.com/",
                      "_blank",
                      "noopener,noreferrer"
                    )
                  }
                >
                  <div className="provider-visual" />
                  <h3>Remitly</h3>
                  <p>
                    Fast international transfers with transparent
                    fees.
                  </p>
                </button>

                <button
                  className="provider-card taptap"
                  type="button"
                  onClick={() =>
                    window.open(
                      "https://www.taptapsend.com/",
                      "_blank",
                      "noopener,noreferrer"
                    )
                  }
                >
                  <div className="provider-visual" />
                  <h3>TapTap Send</h3>
                  <p>
                    Send money instantly to mobile wallets in many
                    countries.
                  </p>
                </button>
              </div>
            </div>
          </>
        )}

        {/* DOWNLOAD REPORTS PAGE */}
        {currentPage === "downloadReports" && (
          <>
            <h1 className="dashboard-title">Download Reports</h1>

            <div className="download-page">
              <div className="analytics-card compact-card download-card">
                <h3>Export your expenses</h3>
                <p>
                  Download all current expenses as CSV or PDF for
                  your records.
                </p>
                <DownloadMenu expenses={expenses} />
              </div>
            </div>
          </>
        )}

        {/* HELP PAGE */}
        {currentPage === "help" && (
          <>
            <h1 className="dashboard-title">Help</h1>
            <div className="analytics-card compact-card">
              <h3>How to use SpendSmart</h3>
              <p>
                Use the Dashboard to add expenses and track your
                income and savings. Use Send Money to open your
                preferred transfer provider, and Download Reports
                to export your data.
              </p>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
