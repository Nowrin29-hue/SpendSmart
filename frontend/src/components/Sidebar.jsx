export default function Sidebar({ handleLogout }) {
  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">SpendSmart</h2>

      <nav className="sidebar-menu">
        <a>Dashboard</a>
        <a>Add Expense</a>
        <a>Reports</a>
      </nav>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </aside>
  );
}
