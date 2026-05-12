import { useNavigate } from "react-router-dom";
import { apiRequest } from "../api/client";

export default function Dashboard({ user, setUser }) {
  const navigate = useNavigate();

  async function logout() {
    await apiRequest("/logout", { method: "POST" });
    setUser(null);
    navigate("/login");
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <section className="w-full max-w-md rounded-xl bg-white p-6 text-center shadow-sm">
        <h1 className="text-2xl font-bold">Welcome to Dashboard</h1>
        <p className="mt-2 text-gray-500">You are logged in as {user?.username}.</p>

        <button onClick={logout} className="mt-6 rounded-lg bg-black px-5 py-2 text-white">
          Logout
        </button>
      </section>
    </main>
  );
}
