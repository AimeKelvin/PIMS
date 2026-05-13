import DashboardLayout from "../layouts/DashboardLayout";
import { useEffect, useState } from "react";

const INVENTORY_API = "http://localhost:1434/stocks";
const MEDICINE_API = "http://localhost:1434/medicines";

export default function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [medicines, setMedicines] = useState([]);

  const [MedicineID, setMedicineID] = useState("");
  const [QuantityInHand, setQuantityInHand] = useState("");
  const [ExpiryDate, setExpiryDate] = useState("");

  const [message, setMessage] = useState("");

  const loadInventory = async () => {
    try {
      const res = await fetch(INVENTORY_API);
      const data = await res.json();
      setInventory(data);
    } catch (err) {
      console.log(err);
      setMessage("Failed to load inventory");
    }
  };

  const loadMedicines = async () => {
    try {
      const res = await fetch(MEDICINE_API);
      const data = await res.json();
      setMedicines(data);
    } catch (err) {
      console.log(err);
      setMessage("Failed to load medicines");
    }
  };

  const addInventory = async (e) => {
    e.preventDefault();

    const data = {
      MedicineID,
      QuantityInHand,
      ExpiryDate,
    };

    try {
      const res = await fetch(INVENTORY_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      setMessage(result.message || "Inventory added successfully");

      setMedicineID("");
      setQuantityInHand("");
      setExpiryDate("");

      loadInventory();
    } catch (err) {
      console.log(err);
      setMessage("Something went wrong");
    }
  };

  useEffect(() => {
    loadInventory();
    loadMedicines();
  }, []);

  return (
    <DashboardLayout>
      <section>
        <h2 className="mb-4 flex items-center justify-center p-2 text-xl font-bold text-blue-500">
          Inventory Stock
        </h2>

        {message && (
          <p className="mb-4 border border-gray-300 bg-white p-3 text-sm">
            {message}
          </p>
        )}

        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Inventory ID</th>
              <th className="border border-gray-300 px-4 py-2">Medicine</th>
              <th className="border border-gray-300 px-4 py-2">Quantity In Hand</th>
              <th className="border border-gray-300 px-4 py-2">Expiry Date</th>
            </tr>
          </thead>

          <tbody>
            {inventory.map((item) => (
              <tr key={item.InventoryID}>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {item.StockNumber}
                </td>

                <td className="border border-gray-300 px-4 py-2 text-center">
                  {
  medicines.find(
    (medicine) => medicine.MedicineID === item.MedicineID
  )?.TradeName || item.MedicineID
}
                </td>

                <td className="border border-gray-300 px-4 py-2 text-center">
                  {item.QuantityInHand}
                </td>

                <td className="border border-gray-300 px-4 py-2 text-center">
                  {new Date(item.ExpiryDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <form
          onSubmit={addInventory}
          className="mt-6 border border-gray-300 bg-white p-6"
        >
          <h2 className="mb-6 text-xl font-bold">Add Inventory Stock</h2>

          <div className="flex flex-col gap-5">
            <div>
              <label className="mb-2 block font-medium">Medicine</label>

              <select
                value={MedicineID}
                onChange={(e) => setMedicineID(e.target.value)}
                className="w-full border border-gray-300 px-4 py-3 outline-none"
              >
                <option value="">Select Medicine</option>

                {medicines.map((medicine) => (
                  <option key={medicine.MedicineID} value={medicine.MedicineID}>
                    {medicine.TradeName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block font-medium">Quantity In Hand</label>

              <input
                type="number"
                value={QuantityInHand}
                placeholder="100"
                onChange={(e) => setQuantityInHand(e.target.value)}
                className="w-full border border-gray-300 px-4 py-3 outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">Expiry Date</label>

              <input
                type="date"
                value={ExpiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="w-full border border-gray-300 px-4 py-3 outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 rounded-md bg-blue-500 px-6 py-3 text-white"
          >
            Add Inventory
          </button>
        </form>
      </section>
    </DashboardLayout>
  );
}