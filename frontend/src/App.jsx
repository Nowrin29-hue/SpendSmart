import { useState } from "react";
import "./App.css";

import Login from "./components/Login";
import Signup from "./components/Signup";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Summary from "./components/Summary";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignup, setShowSignup] = useState(null);
  const [expenses, setExpenses] = useState([]);

  const handleLoginSuccess = () => setIsLoggedIn(true);
  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowSignup(null);
    setExpenses([]);
  };
  const addExpense = (expense) => setExpenses((prev) => [...prev, expense]);

  // First-time user prompt
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

  // Show Login or Signup form
  if (!isLoggedIn) return showSignup ? <Signup onSuccess={handleLoginSuccess} /> : <Login onSuccess={handleLoginSuccess} />;

  // Main dashboard
  return (
    <div>
      <div className="header">
        <h1>SpendSmart</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div className="expense-container">
        <ExpenseForm addExpense={addExpense} />
        <ExpenseList expenses={expenses} />
        <Summary expenses={expenses} />
      </div>
    </div>
  );
}

export default App;

