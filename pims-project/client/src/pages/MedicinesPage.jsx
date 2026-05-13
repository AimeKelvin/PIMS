import DashboardLayout from "../layouts/DashboardLayout";
import { useEffect, useState } from "react";

const MEDICINE_API = "http://localhost:1434/medicines";
const CATEGORY_API = "http://localhost:1434/categories";

export default function Medicines() {
  const [categories, setCategories] = useState([]);
  const [medicines, setMedicines] = useState([]);

  const [CategoryID, setCategoryID] = useState("");
  const [TradeName, setTradeName] = useState("");
  const [GenericName, setGenericName] = useState("");
  const [UnitPrice, setUnitPrice] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  const loadCategories = async () => {
    try {
      const res = await fetch(CATEGORY_API);
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.log(err);
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

  const resetForm = () => {
    setCategoryID("");
    setTradeName("");
    setGenericName("");
    setUnitPrice("");
    setEditingId(null);
  };

  const saveMedicine = async (e) => {
    e.preventDefault();

    const data = {
      CategoryID,
      TradeName,
      GenericName,
      UnitPrice,
    };

    try {
      const url = editingId ? `${MEDICINE_API}/${editingId}` : MEDICINE_API;
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      setMessage(result.message || "Saved successfully");
      resetForm();
      loadMedicines();
    } catch (err) {
      console.log(err);
      setMessage("Something went wrong");
    }
  };

  const editMedicine = (medicine) => {
    setEditingId(medicine.MedicineID);
    setCategoryID(medicine.CategoryID);
    setTradeName(medicine.TradeName);
    setGenericName(medicine.GenericName);
    setUnitPrice(medicine.UnitPrice);
  };

  const deleteMedicine = async (id) => {
    const confirmDelete = confirm("Delete this medicine?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${MEDICINE_API}/${id}`, {
        method: "DELETE",
      });

      const result = await res.json();

      setMessage(result.message || "Deleted successfully");
      loadMedicines();
    } catch (err) {
      console.log(err);
      setMessage("Failed to delete medicine");
    }
  };

  useEffect(() => {
    loadCategories();
    loadMedicines();
  }, []);

  return (
    <DashboardLayout>
      <section>
        <h2 className="mb-4 flex items-center justify-center p-2 text-xl font-bold text-blue-500">
          Medicines
        </h2>

        {message && (
          <p className="mb-4 border border-gray-300 bg-white p-3 text-sm">
            {message}
          </p>
        )}

        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Medicine ID</th>
              <th className="border border-gray-300 px-4 py-2">Category</th>
              <th className="border border-gray-300 px-4 py-2">Trade Name</th>
              <th className="border border-gray-300 px-4 py-2">Generic Name</th>
              <th className="border border-gray-300 px-4 py-2">Unit Price</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {medicines.map((medicine) => (
              <tr key={medicine.MedicineID}>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {medicine.MedicineID}
                </td>

                <td className="border border-gray-300 px-4 py-2 text-center">
                  {medicine.CategoryName || medicine.CategoryID}
                </td>

                <td className="border border-gray-300 px-4 py-2 text-center">
                  {medicine.TradeName}
                </td>

                <td className="border border-gray-300 px-4 py-2 text-center">
                  {medicine.GenericName}
                </td>

                <td className="border border-gray-300 px-4 py-2 text-center">
                  {medicine.UnitPrice}
                </td>

                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    onClick={() => editMedicine(medicine)}
                    className="m-1 rounded-md bg-yellow-400 px-3 py-1 text-sm"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteMedicine(medicine.MedicineID)}
                    className="m-1 rounded-md bg-red-500 px-3 py-1 text-sm text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <form
          onSubmit={saveMedicine}
          className="mt-6 border border-gray-300 bg-white p-6"
        >
          <h2 className="mb-6 text-xl font-bold">
            {editingId ? "Update Medicine" : "Create New Medicine"}
          </h2>

          <div className="flex flex-col gap-5">
            <div>
              <label className="mb-2 block font-medium">Category</label>

              <select
                value={CategoryID}
                onChange={(e) => setCategoryID(e.target.value)}
                className="w-full border border-gray-300 px-4 py-3 outline-none"
              >
                <option value="">Select Category</option>

                {categories.map((category) => (
                  <option
                    key={category.CategoryID}
                    value={category.CategoryID}
                  >
                    {category.CategoryName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block font-medium">Trade Name</label>

              <input
                type="text"
                value={TradeName}
                placeholder="Panadol"
                onChange={(e) => setTradeName(e.target.value)}
                className="w-full border border-gray-300 px-4 py-3 outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">Generic Name</label>

              <input
                type="text"
                value={GenericName}
                placeholder="Paracetamol"
                onChange={(e) => setGenericName(e.target.value)}
                className="w-full border border-gray-300 px-4 py-3 outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">Unit Price</label>

              <input
                type="number"
                value={UnitPrice}
                placeholder="500"
                onChange={(e) => setUnitPrice(e.target.value)}
                className="w-full border border-gray-300 px-4 py-3 outline-none"
              />
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              type="submit"
              className="rounded-md bg-blue-500 px-6 py-3 text-white"
            >
              {editingId ? "Update Medicine" : "Create Medicine"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-md border border-gray-300 px-6 py-3"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>
    </DashboardLayout>
  );
}