import { useEffect, useState } from "react";
import "./App.css";

import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import ExpenseForm from "./components/ExpenseForm.jsx";
import ExpenseList from "./components/ExpenseList.jsx";
import DownloadMenu from "./components/DownloadMenu.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Settings from "./components/Settings.jsx";
import ExpensesChart from "./components/ExpensesChart.jsx";


import paypalLogo from "./assets/paypal-logo.png";
import remitlyLogo from "./assets/remitly-logo.png";
import taptapLogo from "./assets/taptap-logo.png";

const currencySymbols = {
  EUR: "€",
  USD: "$",
  GBP: "£",
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignup, setShowSignup] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [message, setMessage] = useState("");
  const [monthlyBudget, setMonthlyBudget] = useState(0);

  // Settings state
  const [currency, setCurrency] = useState("EUR");
  const [theme, setTheme] = useState("light");
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    goal: "",
  });

  const currencySymbol = currencySymbols[currency] || "€";

  const handleLoginSuccess = () => setIsLoggedIn(true);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowSignup(null);
    setExpenses([]);
    setProfile({ name: "", email: "", goal: "" });
    setCurrentPage("dashboard");
  };

  const addExpense = (expense) => {
    setExpenses((prev) => [...prev, expense]);
    setMessage("Expense added successfully.");
    setTimeout(() => setMessage(""), 2500);
  };

  const totalExpenses = expenses.reduce(
    (sum, e) => sum + Number(e.amount),
    0
  );

  const clearAllData = () => {
    const confirmClear = window.confirm(
      "This will remove all expenses, income, budget, and profile. Continue?"
    );
    if (!confirmClear) return;

    setExpenses([]);
    setMonthlyBudget(0);
    setProfile({ name: "", email: "", goal: "" });
    setMessage("All data cleared.");
    setCurrentPage("dashboard");
    setTimeout(() => setMessage(""), 2500);
  };

  // Apply theme to <body>
  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

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
            <h1 className="dashboard-title">
             
              {profile.name && `, ${profile.name}`}
            </h1>

            {message && (
              <div className="inline-message success">
                {message}
              </div>
            )}

            <div className="stats-cards compact-cards">
              {/* Card 1: Add Expense form */}
              <div className="analytics-card compact-card">
                <ExpenseForm
                  addExpense={addExpense}
                  currencySymbol={currencySymbol}
                />
              </div>

              {/* Card 2: Chart */}
              <ExpensesChart
                expenses={expenses}
                currencySymbol={currencySymbol}
              />
            </div>

            {/* Below: Expense list */}
            <div className="dashboard-grid compact-grid">
              <ExpenseList
                expenses={expenses}
                currencySymbol={currencySymbol}
              />
            </div>
          </>
        )}

        {/* SEND MONEY PAGE */}
        {currentPage === "sendMoney" && (
          <>
            <h1 className="dashboard-title"></h1>

            <div className="send-money-page">
              <div className="send-money-hero">
                <h2>Choose a provider</h2>
                <p>
                  Select a service to send money securely to your
                  family and friends. You will be redirected to
                  their website.
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
                  <div className="provider-visual">
                    <img
                      src={paypalLogo}
                      alt="PayPal logo"
                      className="provider-logo"
                    />
                  </div>
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
                  <div className="provider-visual">
                    <img
                      src={remitlyLogo}
                      alt="Remitly logo"
                      className="provider-logo"
                    />
                  </div>
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
                  <div className="provider-visual">
                    <img
                      src={taptapLogo}
                      alt="TapTap Send logo"
                      className="provider-logo"
                    />
                  </div>
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
            <h1 className="dashboard-title"></h1>

            <div className="download-page">
              <DownloadMenu
                expenses={expenses}
                currency={currency}
                currencySymbol={currencySymbol}
              />
            </div>
          </>
        )}

        {/* SETTINGS PAGE */}
        {currentPage === "settings" && (
          <Settings
            profile={profile}
            setProfile={setProfile}
            currency={currency}
            setCurrency={setCurrency}
            theme={theme}
            setTheme={setTheme}
            monthlyBudget={monthlyBudget}
            setMonthlyBudget={setMonthlyBudget}
            currencySymbol={currencySymbol}
            totalExpenses={totalExpenses}
            clearAllData={clearAllData}
            setMessage={setMessage}
          />
        )}

        {/* HELP PAGE */}
        {currentPage === "help" && (
          <>
            <h1 className="dashboard-title">Help</h1>
            <div className="analytics-card compact-card">
              <h3>How to use SpendSmart</h3>
              <p>
                Add expenses to track spending and view trends. Use Send Money for transfers, 
                Download Reports to export data, and Settings to manage your profile, budget,
                 currency, and theme.
              </p>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
