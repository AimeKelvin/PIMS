import DashboardLayout from "../layouts/DashboardLayout";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <section style={{
        background: "white",
        padding: "32px",
        borderRadius: "18px",
        border: "1px solid #e5e7eb",
        boxShadow: "0 1px 3px rgba(0,0,0,0.06)"
      }}>
        <p style={{
          color: "#2563EB",
          fontWeight: "700",
          marginBottom: "8px"
        }}>
          Ready to customize
        </p>

        <h1 style={{
          fontSize: "32px",
          marginBottom: "12px"
        }}>
          Welcome Dashboard
        </h1>

        <p style={{
          color: "#4b5563",
          lineHeight: "1.7"
        }}>
          Start building your own features from this page. Add your forms,
          tables, buttons, and API calls here.
        </p>
      </section>
    </DashboardLayout>
  );
}
