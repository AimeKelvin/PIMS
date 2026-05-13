import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/client";
import { saveUser } from "../utils/auth";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    Username: "",
    Password: ""
  });

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  const register = async () => {
    try {
      await api.post("/auth/register", form);
      alert("Registered successfully. Now login.");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  const login = async () => {
    try {
      const res = await api.post("/auth/login", form);
      saveUser(res.data);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#f8fafc",
      fontFamily: "Arial, sans-serif",
      padding: "20px"
    }}>
      <div style={{
        width: "380px",
        background: "white",
        padding: "32px",
        borderRadius: "20px",
        border: "1px solid #e5e7eb",
        boxShadow: "0 1px 5px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "column",
        gap: "14px"
      }}>
        <p style={{
          color: "#2563EB",
          fontWeight: "700",
          margin: 0
        }}>
          Create Parachute
        </p>

        <h1 style={{
          margin: 0,
          fontSize: "28px"
        }}>
          Login or Register
        </h1>

        <p style={{
          color: "#6b7280",
          marginTop: 0,
          lineHeight: "1.5"
        }}>
          Use a username and password. Passwords are hashed in the backend.
        </p>

        <input
          placeholder="Username"
          value={form.Username}
          onChange={(e) => setForm({ ...form, Username: e.target.value })}
          style={{
            padding: "12px",
            border: "1px solid #d1d5db",
            borderRadius: "10px"
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={form.Password}
          onChange={(e) => setForm({ ...form, Password: e.target.value })}
          style={{
            padding: "12px",
            border: "1px solid #d1d5db",
            borderRadius: "10px"
          }}
        />

        <button
          onClick={register}
          style={{
            background: "#2563EB",
            color: "white",
            border: "none",
            padding: "12px",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "700"
          }}
        >
          Register
        </button>

        <button
          onClick={login}
          style={{
            background: "black",
            color: "white",
            border: "none",
            padding: "12px",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "700"
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}
