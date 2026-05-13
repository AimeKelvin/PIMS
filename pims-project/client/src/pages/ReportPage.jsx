import DashboardLayout from "../layouts/DashboardLayout";
import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const DAILY_REPORT_API = "http://localhost:1434/reports/daily";
const RANGE_REPORT_API = "http://localhost:1434/reports/range";

export default function ReportsPage() {
  const today = new Date().toISOString().split("T")[0];

  const [reports, setReports] = useState([]);
  const [message, setMessage] = useState("");

  const [selectedDate, setSelectedDate] = useState(today);
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  const [reportMode, setReportMode] = useState("daily");

  const loadReports = async () => {
    try {
      setMessage("");

      let url = "";

      if (reportMode === "daily") {
        url = `${DAILY_REPORT_API}?date=${selectedDate}`;
      } else {
        url = `${RANGE_REPORT_API}?startDate=${startDate}&endDate=${endDate}`;
      }

      const res = await fetch(url);
      const data = await res.json();

      if (!res.ok) {
        setReports([]);
        setMessage(data.message || "Failed to load reports");
        return;
      }

      setReports(data);
    } catch (err) {
      console.log(err);
      setMessage("Failed to load reports");
    }
  };

  useEffect(() => {
    loadReports();
  }, [selectedDate, startDate, endDate, reportMode]);

  const getReportTitle = () => {
    if (reportMode === "daily") {
      return `Daily Sales Report - ${selectedDate}`;
    }

    return `Sales Report - ${startDate} to ${endDate}`;
  };

  const exportCSV = () => {
    const headers = ["Trade Name", "Quantity Sold", "Remaining Stock"];

    const rows = reports.map((report) => [
      report.TradeName,
      report.QuantitySold,
      report.RemainingStock,
    ]);

    const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join(
      "\n"
    );

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download =
      reportMode === "daily"
        ? `daily-report-${selectedDate}.csv`
        : `range-report-${startDate}-to-${endDate}.csv`;

    link.click();
  };

  const exportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text(getReportTitle(), 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [["Trade Name", "Quantity Sold", "Remaining Stock"]],
      body: reports.map((report) => [
        report.TradeName,
        report.QuantitySold,
        report.RemainingStock,
      ]),
    });

    doc.save(
      reportMode === "daily"
        ? `daily-report-${selectedDate}.pdf`
        : `range-report-${startDate}-to-${endDate}.pdf`
    );
  };

  return (
    <DashboardLayout>
      <section>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-bold text-blue-500">
            {reportMode === "daily" ? "Daily Sales Report" : "Sales Report Range"}
          </h2>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={reportMode}
              onChange={(e) => setReportMode(e.target.value)}
              className="border border-gray-300 px-4 py-2 outline-none"
            >
              <option value="daily">Single Day</option>
              <option value="range">Date Range</option>
            </select>

            {reportMode === "daily" ? (
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="border border-gray-300 px-4 py-2 outline-none"
              />
            ) : (
              <>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="border border-gray-300 px-4 py-2 outline-none"
                />

                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="border border-gray-300 px-4 py-2 outline-none"
                />
              </>
            )}

            <button
              onClick={exportCSV}
              disabled={reports.length === 0}
              className="rounded bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              Export CSV
            </button>

            <button
              onClick={exportPDF}
              disabled={reports.length === 0}
              className="rounded bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              Export PDF
            </button>
          </div>
        </div>

        {message && (
          <p className="mb-4 border border-gray-300 bg-white p-3 text-sm">
            {message}
          </p>
        )}

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Trade Name</th>
                <th className="border border-gray-300 px-4 py-2">Quantity Sold</th>
                <th className="border border-gray-300 px-4 py-2">Remaining Stock</th>
              </tr>
            </thead>

            <tbody>
              {reports.length > 0 ? (
                reports.map((report, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {report.TradeName}
                    </td>

                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {report.QuantitySold}
                    </td>

                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {report.RemainingStock}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="border border-gray-300 px-4 py-6 text-center text-gray-500"
                  >
                    No report data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </DashboardLayout>
  );
}