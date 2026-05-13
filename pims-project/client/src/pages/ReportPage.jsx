import DashboardLayout from "../layouts/DashboardLayout";
import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const REPORT_API = "http://localhost:1434/reports/daily";

export default function ReportsPage() {
  const [reports, setReports] = useState([]);
  const [message, setMessage] = useState("");

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const loadReports = async () => {
    try {
      const res = await fetch(
        `${REPORT_API}?date=${selectedDate}`
      );

      const data = await res.json();

      setReports(data);
    } catch (err) {
      console.log(err);
      setMessage("Failed to load reports");
    }
  };

  useEffect(() => {
    loadReports();
  }, [selectedDate]);

  // EXPORT CSV
  const exportCSV = () => {
    const headers = [
      "Trade Name",
      "Quantity Sold",
      "Remaining Stock",
    ];

    const rows = reports.map((report) => [
      report.TradeName,
      report.QuantitySold,
      report.RemainingStock,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = `daily-report-${selectedDate}.csv`;

    link.click();
  };

  // EXPORT PDF
  const exportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Daily Sales Report", 14, 20);

    doc.setFontSize(11);
    doc.text(`Date: ${selectedDate}`, 14, 28);

    autoTable(doc, {
      startY: 35,
      head: [["Trade Name", "Quantity Sold", "Remaining Stock"]],
      body: reports.map((report) => [
        report.TradeName,
        report.QuantitySold,
        report.RemainingStock,
      ]),
    });

    doc.save(`daily-report-${selectedDate}.pdf`);
  };

  return (
    <DashboardLayout>
      <section>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-bold text-blue-500">
            Daily Sales Report
          </h2>

          <div className="flex items-center gap-2">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border border-gray-300 px-4 py-2 outline-none"
            />

            <button
              onClick={exportCSV}
              className="rounded bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700"
            >
              Export CSV
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
                <th className="border border-gray-300 px-4 py-2">
                  Trade Name
                </th>

                <th className="border border-gray-300 px-4 py-2">
                  Quantity Sold
                </th>

                <th className="border border-gray-300 px-4 py-2">
                  Remaining Stock
                </th>
              </tr>
            </thead>

            <tbody>
              {reports.map((report, index) => (
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
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </DashboardLayout>
  );
}