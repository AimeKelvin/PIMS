import DashboardLayout from "../layouts/DashboardLayout";
import { useEffect, useState } from "react";

const SALES_API = "http://localhost:1434/sales";
const MEDICINE_API = "http://localhost:1434/medicines";

export default function Sales() {
  const [sales, setSales] = useState([]);
  const [medicines, setMedicines] = useState([]);

  const [MedicineID, setMedicineID] = useState("");
  const [QuantitySold, setQuantitySold] = useState("");
  const [SaleDate, setSaleDate] = useState("");

  const [message, setMessage] = useState("");

  const loadSales = async () => {
    try {
      const res = await fetch(SALES_API);
      const data = await res.json();

      setSales(data);
    } catch (err) {
      console.log(err);
      setMessage("Failed to load sales");
    }
  };

  const loadMedicines = async () => {
    try {
      const res = await fetch(MEDICINE_API);
      const data = await res.json();

      setMedicines(data);
    } catch (err) {
      console.log(err);
    }
  };

  const addSale = async (e) => {
    e.preventDefault();

    const data = {
      MedicineID,
      QuantitySold,
      SaleDate,
    };

    try {
      const res = await fetch(SALES_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      setMessage(result.message || "Sale added successfully");

      setMedicineID("");
      setQuantitySold("");
      setSaleDate("");

      loadSales();
    } catch (err) {
      console.log(err);
      setMessage("Something went wrong");
    }
  };

  useEffect(() => {
    loadSales();
    loadMedicines();
  }, []);

  return (
    <DashboardLayout>
      <section>
        <h2 className="mb-4 flex items-center justify-center p-2 text-xl font-bold text-blue-500">
          Sales
        </h2>

        {message && (
          <p className="mb-4 border border-gray-300 bg-white p-3 text-sm">
            {message}
          </p>
        )}

        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">
                Sale ID
              </th>

              <th className="border border-gray-300 px-4 py-2">
                Medicine
              </th>

              <th className="border border-gray-300 px-4 py-2">
                Quantity Sold
              </th>

              <th className="border border-gray-300 px-4 py-2">
                Total Amount
              </th>

              <th className="border border-gray-300 px-4 py-2">
                Sale Date
              </th>
            </tr>
          </thead>

          <tbody>
            {sales.map((sale) => (
              <tr key={sale.SaleNumber}>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {sale.SaleNumber}
                </td>

                <td className="border border-gray-300 px-4 py-2 text-center">
                  {sale.TradeName || sale.MedicineID}
                </td>

                <td className="border border-gray-300 px-4 py-2 text-center">
                  {sale.QuantitySold}
                </td>

                <td className="border border-gray-300 px-4 py-2 text-center">
                  {sale.TotalAmount} RWF
                </td>

                <td className="border border-gray-300 px-4 py-2 text-center">
                  {new Date(sale.SaleDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <form
          onSubmit={addSale}
          className="mt-6 border border-gray-300 bg-white p-6"
        >
          <h2 className="mb-6 text-xl font-bold">
            Add New Sale
          </h2>

          <div className="flex flex-col gap-5">
            <div>
              <label className="mb-2 block font-medium">
                Medicine
              </label>

              <select
                value={MedicineID}
                onChange={(e) => setMedicineID(e.target.value)}
                className="w-full border border-gray-300 px-4 py-3 outline-none"
              >
                <option value="">Select Medicine</option>

                {medicines.map((medicine) => (
                  <option
                    key={medicine.MedicineID}
                    value={medicine.MedicineID}
                  >
                    {medicine.TradeName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Quantity Sold
              </label>

              <input
                type="number"
                value={QuantitySold}
                placeholder="10"
                onChange={(e) => setQuantitySold(e.target.value)}
                className="w-full border border-gray-300 px-4 py-3 outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Sale Date
              </label>

              <input
                type="date"
                value={SaleDate}
                onChange={(e) => setSaleDate(e.target.value)}
                className="w-full border border-gray-300 px-4 py-3 outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 rounded-md bg-blue-500 px-6 py-3 text-white"
          >
            Add Sale
          </button>
        </form>
      </section>
    </DashboardLayout>
  );
}