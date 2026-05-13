import DashboardLayout from "../layouts/DashboardLayout";
import { useEffect, useState } from "react";

const API_URL = "http://localhost:1434/categories";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  const [CategoryName, setCategoryName] = useState("");
  const [StorageInstructions, setStorageInstructions] = useState("");
  const [AverageTaxRate, setAverageTaxRate] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  const LoadCategories = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.log(err);
      setMessage("Failed to load categories");
    }
  };

  const resetForm = () => {
    setCategoryName("");
    setStorageInstructions("");
    setAverageTaxRate("");
    setEditingId(null);
  };

  const saveCategory = async (e) => {
    e.preventDefault();

    const data = {
      CategoryName,
      StorageInstructions,
      AverageTaxRate,
    };

    try {
      const url = editingId ? `${API_URL}/${editingId}` : API_URL;
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
      LoadCategories();
    } catch (err) {
      console.log(err);
      setMessage("Something went wrong");
    }
  };

  const editCategory = (category) => {
    setEditingId(category.CategoryID);
    setCategoryName(category.CategoryName);
    setStorageInstructions(category.StorageInstructions);
    setAverageTaxRate(category.AverageTaxRate);
  };

  const deleteCategory = async (id) => {
    const confirmDelete = confirm("Delete this category?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      const result = await res.json();

      setMessage(result.message || "Deleted successfully");
      LoadCategories();
    } catch (err) {
      console.log(err);
      setMessage("Failed to delete category");
    }
  };

  useEffect(() => {
    LoadCategories();
  }, []);

  return (
    <DashboardLayout>
      <section>
        <h2 className="mb-4 flex items-center justify-center p-2 text-xl font-bold text-blue-500">
          Categories
        </h2>

        {message && (
          <p className="mb-4 border border-gray-300 bg-white p-3 text-sm">
            {message}
          </p>
        )}

        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Category ID</th>
              <th className="border border-gray-300 px-4 py-2">Category Name</th>
              <th className="border border-gray-300 px-4 py-2">
                Storage Instructions
              </th>
              <th className="border border-gray-300 px-4 py-2">
                Average Tax Rate
              </th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((category) => (
              <tr key={category.CategoryID}>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {category.CategoryID}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {category.CategoryName}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {category.StorageInstructions}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {category.AverageTaxRate} %
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    onClick={() => editCategory(category)}
                    className="mr-2 bg-yellow-400 px-3 py-1 text-sm"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteCategory(category.CategoryID)}
                    className="bg-red-500 px-3 py-1 text-sm text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <form
          onSubmit={saveCategory}
          className="mt-6 border border-gray-300 bg-white p-6"
        >
          <h2 className="mb-6 text-xl font-bold">
            {editingId ? "Update Category" : "Create New Category"}
          </h2>

          <div className="flex flex-col gap-5">
            <div>
              <label className="mb-2 block font-medium">Category Name</label>
              <input
                type="text"
                value={CategoryName}
                placeholder="Antibiotics"
                onChange={(e) => setCategoryName(e.target.value)}
                className="w-full border border-gray-300 px-4 py-3 outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">Average Tax Rate</label>
              <input
                type="text"
                value={AverageTaxRate}
                placeholder="18"
                onChange={(e) => setAverageTaxRate(e.target.value)}
                className="w-full border border-gray-300 px-4 py-3 outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Storage Instructions
              </label>
              <textarea
                rows={3}
                value={StorageInstructions}
                placeholder="Store in a cool dry place..."
                onChange={(e) => setStorageInstructions(e.target.value)}
                className="w-full resize-none border border-gray-300 px-4 py-3 outline-none"
              />
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              type="submit"
              className="rounded-md bg-blue-500 px-6 py-3 text-white"
            >
              {editingId ? "Update Category" : "Create Category"}
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