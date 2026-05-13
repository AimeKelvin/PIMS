import DashboardLayout from "../layouts/DashboardLayout";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <section className="bg-white p-4 border border-gray-400 rounded-xl shadow-md">
        <p className="text-blue-500 font-bold mb-2">
          Dashboard
        </p>
    

        <h1 style={{
          fontSize: "32px",
          marginBottom: "12px"
        }}>
          Welcome Dashboard
        </h1>

       
      </section>
    </DashboardLayout>
  );
}
