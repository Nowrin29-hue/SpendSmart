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

  // Chart category filter state (you can wire this into ExpensesChart later)
  // const [chartCategory, setChartCategory] = useState("all");

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

<<<<<<< Updated upstream
  // Load expenses from DB
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoadingExpenses(false);
      return;
    }

    async function loadExpenses() {
=======
  // Load expenses from backend, localStorage or dummy.json on first load
  useEffect(() => {
    async function initExpenses() {
>>>>>>> Stashed changes
      try {
        const token = localStorage.getItem("token");

        // 1) If logged in, try backend first
        if (token) {
          try {
            const res = await api.get("/expenses");
            if (Array.isArray(res.data) && res.data.length > 0) {
              setExpenses(res.data);
              setIsLoadingExpenses(false);
              return;
            }
          } catch (err) {
            console.error("Failed to load expenses from API:", err);
          }
        }

        // 2) Try localStorage
        const stored = localStorage.getItem("spendsmart_expenses");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setExpenses(parsed);
            setIsLoadingExpenses(false);
            return;
          }
        }

        // 3) If still no data, fetch dummy.json from public
        try {
          const res = await fetch("/dummy.json", {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          });

          if (!res.ok) {
            throw new Error("Failed to load dummy data");
          }

          const dummy = await res.json();

          if (Array.isArray(dummy)) {
            setExpenses(dummy);
            localStorage.setItem(
              "spendsmart_expenses",
              JSON.stringify(dummy)
            );
          }
        } catch (err) {
          console.error("Failed to load dummy.json:", err);
          setLoadError("Could not load initial expenses.");
        } finally {
          setIsLoadingExpenses(false);
        }
      } catch (err) {
<<<<<<< Updated upstream
        console.error("Failed to load expenses:", err);
        setLoadError("Could not load expenses.");
=======
        console.error(err);
        setLoadError("Could not load initial expenses.");
        setIsLoadingExpenses(false);
>>>>>>> Stashed changes
      }
    }

    initExpenses();
  }, []);

<<<<<<< Updated upstream
  // Save expenses to localStorage
=======
  // Keep localStorage in sync whenever expenses change
>>>>>>> Stashed changes
  useEffect(() => {
    if (!isLoadingExpenses) {
      localStorage.setItem(
        "spendsmart_expenses",
        JSON.stringify(expenses)
      );
    }
  }, [expenses, isLoadingExpenses]);

<<<<<<< Updated upstream
  // Apply theme
=======
  // Apply theme to <body>
>>>>>>> Stashed changes
  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

<<<<<<< Updated upstream
  // FIRST-TIME WELCOME SCREEN
=======
  // First-time user choice
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
  // LOGIN / SIGNUP
=======
  // Login / Signup
>>>>>>> Stashed changes
  if (!isLoggedIn) {
    return showSignup ? (
      <Signup onSuccess={handleLoginSuccess} />
    ) : (
      <Login onSuccess={handleLoginSuccess} />
    );
  }

<<<<<<< Updated upstream
  // LOGGED-IN APP LAYOUT
=======
  // Logged-in area with simple page navigation
>>>>>>> Stashed changes
  return (
    <div className="dashboard-layout">
      <Sidebar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        handleLogout={handleLogout}
      />

      <main className="dashboard-main single-page-dashboard">
<<<<<<< Updated upstream

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
=======
        {/* DASHBOARD PAGE */}
        {currentPage === "dashboard" && (
          <>
            <h1 className="dashboard-title">
              Dashboard
              {profile.name && `, ${profile.name}`}
            </h1>

            {message && (
              <div className="inline-message success">
                {message}
              </div>
            )}

            {isLoadingExpenses && (
              <p className="empty-state">Loading your expenses...</p>
            )}
            {loadError && !isLoadingExpenses && (
              <p className="form-error-message">{loadError}</p>
            )}

            <div className="stats-cards compact-cards">
              {/* Card 1: Add Expense form */}
>>>>>>> Stashed changes
              <div className="analytics-card compact-card">
                <ExpenseForm
                  addExpense={addExpense}
                  currencySymbol={currencySymbol}
                />
              </div>
<<<<<<< Updated upstream

              <ExpensesChart
                expenses={expenses}
                currencySymbol={currencySymbol}
                chartCategory={chartCategory}
                setChartCategory={setChartCategory}
              />
            </div>
=======
>>>>>>> Stashed changes

            <div className="dashboard-grid compact-grid">
              <ExpenseList
                expenses={expenses}
                currencySymbol={currencySymbol}
              />
            </div>
          </>
        )}

<<<<<<< Updated upstream
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
=======
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
            <h1 className="dashboard-title">Send Money</h1>

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
>>>>>>> Stashed changes
                </button>

                <button
                  className="provider-card remitly"
<<<<<<< Updated upstream
                  onClick={() => window.open("https://www.remitly.com/", "_blank")}
                >
                  <img src={remitlyLogo} alt="Remitly" className="provider-logo" />
                  <h3>Remitly</h3>
=======
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
>>>>>>> Stashed changes
                </button>

                <button
                  className="provider-card taptap"
<<<<<<< Updated upstream
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

=======
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
            <h1 className="dashboard-title">Download Reports</h1>

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
                On the Dashboard, add expenses to track your
                spending and view trends in the chart. Use Send
                Money to open your preferred transfer provider,
                Download Reports to export your data, and Settings
                to manage your profile, budget, currency, and
                theme.
              </p>
            </div>
          </>
        )}
>>>>>>> Stashed changes
      </main>
    </div>
  );
}

export default App;
