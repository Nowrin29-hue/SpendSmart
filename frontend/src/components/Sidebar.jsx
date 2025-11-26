export default function Sidebar({
  currentPage,
  onNavigate,
  handleLogout,
}) {
  const navButtonClass = (page) =>
    `sidebar-link ${currentPage === page ? "active" : ""}`;

  return (
    <aside className="sidebar">
      <div>
        <h2 className="sidebar-title">SpendSmart</h2>

        <nav className="sidebar-menu">
          <button
            type="button"
            className={navButtonClass("dashboard")}
            onClick={() => onNavigate("dashboard")}
          >
            Dashboard
          </button>
          <button
            type="button"
            className={navButtonClass("sendMoney")}
            onClick={() => onNavigate("sendMoney")}
          >
            Send Money
          </button>
          <button
            type="button"
            className={navButtonClass("downloadReports")}
            onClick={() => onNavigate("downloadReports")}
          >
            Download Reports
          </button>
          <button
            type="button"
            className={navButtonClass("help")}
            onClick={() => onNavigate("help")}
          >
            Help
          </button>
        </nav>
      </div>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </aside>
  );
}
