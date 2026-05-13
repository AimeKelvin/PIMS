import Navbar from "../components/Navbar";

export default function DashboardLayout({ children }) {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#f8fafc",
      fontFamily: "Arial, sans-serif"
    }}>
      <Navbar />

      <main style={{
        padding: "40px",
        maxWidth: "1100px",
        margin: "0 auto"
      }}>
        {children}
      </main>
    </div>
  );
}
