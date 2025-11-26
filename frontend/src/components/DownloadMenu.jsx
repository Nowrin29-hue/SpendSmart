export default function DownloadMenu({ expenses }) {
  const downloadCSV = () => {
    const rows = [["Title", "Category", "Amount", "Date"]];
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
    alert("PDF download not implemented. Use CSV for now.");
  };

  return (
    <div className="analytics-card">
      <div className="download-buttons">
        <button className="download-btn" onClick={downloadCSV}>
          Download CSV
        </button>
        <button className="download-btn" onClick={downloadPDF}>
          Download PDF
        </button>
      </div>
    </div>
  );
}
