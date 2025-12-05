import { useEffect, useState } from "react";
import "./App.css";
import api from "./lib/api.js";
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
  const [isLoadingExpenses, setIsLoadingExpenses] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [currentPage, setCurrentPage] = useState("dashboard");
  const [message, setMessage] = useState("");
  const [monthlyBudget, setMonthlyBudget] = useState(0);

  // Settings
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

  const totalExpenses = expenses.reduce(
    (sum, e) => sum + Number(e.amount),
    0
  );

  const addExpense = async (expense) => {
    try {
      const res = await api.post("/expenses", expense);
      setExpenses((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Failed to add expense:", err);
    }
  };

  const clearAllData = () => {
    if (!window.confirm("This will remove all data. Continue?")) return;

    setExpenses([]);
    setMonthlyBudget(0);
    setProfile({ name: "", email: "", goal: "" });
    setMessage("All data cleared.");
    setCurrentPage("dashboard");
    setTimeout(() => setMessage(""), 2500);
    localStorage.removeItem("spendsmart_expenses");
  };

  // Load expenses from DB
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoadingExpenses(false);
      return;
    }

    async function loadExpenses() {
      try {
        const res = await api.get("/expenses");
        setExpenses(res.data);
      } catch (err) {
        console.error("Failed to load expenses:", err);
        setLoadError("Could not load expenses.");
      }
      setIsLoadingExpenses(false);
    }

    loadExpenses();
  }, []);

  // Save expenses to localStorage
  useEffect(() => {
    if (!isLoadingExpenses) {
      localStorage.setItem(
        "spendsmart_expenses",
        JSON.stringify(expenses)
      );
    }
  }, [expenses, isLoadingExpenses]);

  // Apply theme
  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  // FIRST-TIME WELCOME SCREEN
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

  // LOGIN / SIGNUP
  if (!isLoggedIn) {
    return showSignup ? (
      <Signup onSuccess={handleLoginSuccess} />
    ) : (
      <Login onSuccess={handleLoginSuccess} />
    );
  }

  // LOGGED-IN APP LAYOUT
  return (
    <div className="dashboard-layout">
      <Sidebar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        handleLogout={handleLogout}
      />

      <main className="dashboard-main single-page-dashboard">

        {/* DASHBOARD */}
        {currentPage === "dashboard" && (
          <>
            <h1 className="dashboard-title">
              Dashboard {profile.name && `, ${profile.name}`}
            </h1>

            {message && <div className="inline-message success">{message}</div>}

            {isLoadingExpenses && <p className="empty-state">Loading your expenses...</p>}
            {loadError && !isLoadingExpenses && (
              <p className="form-error-message">{loadError}</p>
            )}

            <div className="stats-cards compact-cards">
              <div className="analytics-card compact-card">
                <ExpenseForm
                  addExpense={addExpense}
                  currencySymbol={currencySymbol}
                />
              </div>

              <ExpensesChart
                expenses={expenses}
                currencySymbol={currencySymbol}
              />
            </div>

            <div className="dashboard-grid compact-grid">
              <ExpenseList
                expenses={expenses}
                currencySymbol={currencySymbol}
              />
            </div>
          </>
        )}

        {/* SEND MONEY */}
        {currentPage === "sendMoney" && (
          <>
            <h1 className="dashboard-title">Send Money</h1>

            <div className="send-money-page">
              <div className="send-money-hero">
                <h2>Choose a provider</h2>
                <p>Select a secure service to send money.</p>
              </div>

              <div className="providers-grid">
                <button
                  className="provider-card paypal"
                  onClick={() => window.open("https://www.paypal.com/myaccount/transfer", "_blank")}
                >
                  <img src={paypalLogo} alt="PayPal" className="provider-logo" />
                  <h3>PayPal</h3>
                </button>

                <button
                  className="provider-card remitly"
                  onClick={() => window.open("https://www.remitly.com/", "_blank")}
                >
                  <img src={remitlyLogo} alt="Remitly" className="provider-logo" />
                  <h3>Remitly</h3>
                </button>

                <button
                  className="provider-card taptap"
                  onClick={() => window.open("https://www.taptapsend.com/", "_blank")}
                >
                  <img src={taptapLogo} alt="TapTap Send" className="provider-logo" />
                  <h3>TapTap Send</h3>
                </button>
              </div>
            </div>
          </>
        )}

        {/* DOWNLOAD REPORTS */}
        {currentPage === "downloadReports" && (
          <>
            <h1 className="dashboard-title">Download Reports</h1>
            <DownloadMenu
              expenses={expenses}
              currency={currency}
              currencySymbol={currencySymbol}
            />
          </>
        )}

        {/* SETTINGS */}
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

        {/* HELP */}
        {currentPage === "help" && (
          <>
            <h1 className="dashboard-title">Help</h1>
            <div className="analytics-card compact-card">
              <h3>How to use SpendSmart</h3>
              <p>
                Add expenses, track spending trends, send money, download reports, and manage settings.
              </p>
            </div>
          </>
        )}

      </main>
    </div>
  );
}

export default App;
