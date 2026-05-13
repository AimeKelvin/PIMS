import DashboardLayout from "../layouts/DashboardLayout";
import { useEffect, useState } from "react";

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

  return (
    <DashboardLayout>
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-blue-500">
            Daily Sales Report
          </h2>

          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border border-gray-300 px-4 py-2 outline-none"
          />
        </div>

        {message && (
          <p className="mb-4 border border-gray-300 bg-white p-3 text-sm">
            {message}
          </p>
        )}

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
      </section>
    </DashboardLayout>
  );
}