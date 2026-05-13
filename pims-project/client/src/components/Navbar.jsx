import { Link, useNavigate } from "react-router-dom";
import { api } from "../api/client";
import { clearUser, getUser } from "../utils/auth";

export default function Navbar() {
  const navigate = useNavigate();
  const user = getUser();

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch {}

    clearUser();
    navigate("/login");
  };

  return (
    <nav className="flex items-center gap-6 border-b border-gray-200 bg-white px-8 py-4">
      <strong className="mr-2 text-xl font-bold text-gray-900">
        PIMS
      </strong>

      <Link
        to="/"
        className="text-sm font-medium text-gray-700 transition hover:text-blue-600"
      >
        Dashboard
      </Link>

      <Link
        to="/category"
        className="text-sm font-medium text-gray-700 transition hover:text-blue-600"
      >
        Categories
      </Link>

      <Link
        to="/medicine"
        className="text-sm font-medium text-gray-700 transition hover:text-blue-600"
      >
        Medicines
      </Link>

      <Link
        to="/inventory"
        className="text-sm font-medium text-gray-700 transition hover:text-blue-600"
      >
        Inventory
      </Link>

      <Link
        to="/sales"
        className="text-sm font-medium text-gray-700 transition hover:text-blue-600"
      >
        Sales
      </Link>

      <Link
        to="/bills"
        className="text-sm font-medium text-gray-700 transition hover:text-blue-600"
      >
        Bills
      </Link>

      <span className="ml-auto text-sm text-gray-500">
        {user?.Username}
      </span>

      <button
        onClick={logout}
        className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
      >
        Logout
      </button>
    </nav>
  );
}