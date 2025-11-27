// src/components/Settings.jsx
export default function Settings({
  profile,
  setProfile,
  currency,
  setCurrency,
  theme,
  setTheme,
  monthlyBudget,
  setMonthlyBudget,
  currencySymbol,
  totalExpenses,
  clearAllData,
  setMessage,
}) {
  return (
    <>
      <h1 className="dashboard-title"></h1>

      <div className="settings-card-wrapper">
        <div className="expense-card">
         

          {/* Use the SAME layout as Add Expense */}
          <form className="expense-form">
            <h4>Your profile</h4>
            <p className="card-subtitle">
              Update your info and your main money goal.
            </p>

            <label>Name</label>
            <input
              type="text"
              placeholder="Your name"
              value={profile.name}
              onChange={(e) =>
                setProfile((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
            />

            <label>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={profile.email}
              onChange={(e) =>
                setProfile((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
            />

            {/* <label>Financial goal</label>
            <input
              type="text"
              placeholder="Save for a trip, pay off debt..."
              value={profile.goal}
              onChange={(e) =>
                setProfile((prev) => ({
                  ...prev,
                  goal: e.target.value,
                }))
              }
            /> */}

            {/* <p className="list-summary">
              Your goal can be shown on the Dashboard as a reminder
              of why you are tracking your money.
            </p> */}

            <button
              type="button"
              className="primary-btn"
              onClick={() => setMessage("Profile updated.")}
            >
              Save profile
            </button>

            <button
              type="button"
              className="primary-btn"
              style={{
                marginTop: "8px",
                backgroundColor: "#ef4444",
              }}
              onClick={() =>
                setProfile({ name: "", email: "", goal: "" })
              }
            >
              Clear profile
            </button>

            <hr style={{ margin: "24px 0" }} />

            <h4>Display & preferences</h4>
            <p className="card-subtitle">
              Choose your currency, theme, and monthly budget
              target.
            </p>

            <label>Currency</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <option value="EUR">Euro (€)</option>
              <option value="USD">US Dollar ($)</option>
              <option value="GBP">British Pound (£)</option>
            </select>

            <label>Theme</label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>

            <label>Monthly budget ({currencySymbol})</label>
            <input
              type="number"
              placeholder="Monthly budget"
              value={monthlyBudget === 0 ? "" : monthlyBudget}
              onChange={(e) =>
                setMonthlyBudget(
                  e.target.value ? Number(e.target.value) : 0
                )
              }
            />
            {monthlyBudget > 0 && (
              <p className="list-summary">
                Current budget: {currencySymbol}
                {monthlyBudget.toFixed(2)}. Total expenses:{" "}
                {currencySymbol}
                {totalExpenses.toFixed(2)}.
              </p>
            )}

            <hr style={{ margin: "24px 0" }} />

            <h4>Data</h4>
            <p className="card-subtitle">
              Reset everything if you want to start from scratch.
              This clears expenses, income, budget, and profile
              data.
            </p>
            <button
              type="button"
              className="primary-btn"
              style={{ backgroundColor: "#ef4444" }}
              onClick={clearAllData}
            >
              Clear all data
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
