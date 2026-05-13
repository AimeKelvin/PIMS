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
    <nav style={{
      background: "white",
      borderBottom: "1px solid #e5e7eb",
      padding: "18px 32px",
      display: "flex",
      gap: "24px",
      alignItems: "center"
    }}>
      <strong style={{ marginRight: "12px" }}>Parachute</strong>

      <Link to="/">Dashboard</Link>
      <Link to="/page1">Page 1</Link>
      <Link to="/page2">Page 2</Link>
      <Link to="/page3">Page 3</Link>

      <span style={{
        marginLeft: "auto",
        color: "#6b7280",
        fontSize: "14px"
      }}>
        {user?.Username}
      </span>

      <button
        onClick={logout}
        style={{
          background: "#2563EB",
          color: "white",
          border: "none",
          padding: "10px 16px",
          borderRadius: "10px",
          cursor: "pointer"
        }}
      >
        Logout
      </button>
    </nav>
  );
}
