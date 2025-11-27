export default function DownloadMenu({
  expenses,
  currency,
  currencySymbol,
}) {
  const hasExpenses = expenses.length > 0;
  const count = expenses.length;
  const total = expenses.reduce(
    (sum, e) => sum + Number(e.amount),
    0
  );

  const downloadCSV = () => {
    if (!hasExpenses) return;
    const rows = [
      ["Title", "Category", `Amount (${currency})`, "Date"],
    ];
    expenses.forEach((e) =>
      rows.push([e.title, e.category, e.amount, e.date])
    );
    const csvContent = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "expenses.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadPDF = () => {
    if (!hasExpenses) return;
    alert("PDF download not implemented. Use CSV for now.");
  };

  return (
    <div className="analytics-card">
      <h3>Download your data</h3>
      <p className="download-hint">
        Export your expenses so you can back them up, share them,
        or open them in Excel.
      </p>

      {!hasExpenses ? (
        <p className="empty-state">
          You have no expenses yet. Add some entries on the
          Dashboard before downloading.
        </p>
      ) : (
        <p className="list-summary">
          You are about to export {count} expenses totaling{" "}
          {currencySymbol}
          {total.toFixed(2)}.
        </p>
      )}

      <div className="download-scope">
        <strong>What to include</strong>
        <p className="download-scope-text">
          For now, all expenses in this account will be included.
        </p>
      </div>

      <div className="download-buttons">
        <button
          className="download-btn"
          onClick={downloadCSV}
          disabled={!hasExpenses}
        >
          Download CSV
        </button>
        <button
          className="download-btn"
          onClick={downloadPDF}
          disabled={!hasExpenses}
        >
          Download PDF
        </button>
      </div>

      <p className="download-tip">
        Tip: CSV files open in Excel, Google Sheets, and most
        spreadsheet apps.
      </p>

      <p className="list-summary">
        Current currency: {currencySymbol} ({currency})
      </p>
    </div>
  );
}
