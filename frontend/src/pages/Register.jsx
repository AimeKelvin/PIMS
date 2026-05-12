import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "../api/client";

export default function Register({ setUser }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    try {
      const data = await apiRequest("/register", {
        method: "POST",
        body: JSON.stringify(form)
      });

      setUser(data.user);
      navigate("/dashboard");
    } catch (err) {
      setMessage(err.message);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-xl bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold">Register</h1>
        <p className="mt-1 text-sm text-gray-500">Create a simple account.</p>

        {message && <p className="mt-4 rounded bg-red-50 p-3 text-sm text-red-600">{message}</p>}

        <div className="mt-5">
          <label className="text-sm font-medium">Username</label>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:border-black"
            placeholder="Choose username"
          />
        </div>

        <div className="mt-4">
          <label className="text-sm font-medium">Password</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:border-black"
            placeholder="Choose password"
          />
        </div>

        <button className="mt-6 w-full rounded-lg bg-black px-4 py-2 text-white">
          Register
        </button>

        <p className="mt-4 text-center text-sm text-gray-500">
          Already have an account? <Link className="font-medium text-black" to="/login">Login</Link>
        </p>
      </form>
    </main>
  );
}
