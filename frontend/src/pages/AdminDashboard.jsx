import  { useState } from "react";
import Departments from "../components/Departments";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard"); // default section

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col bg-[#2176ff] text-white w-64 min-h-screen px-5 py-6">
        <div className="text-2xl font-bold tracking-wide mb-8 text-center">
          ADMIN
        </div>

        <nav className="flex-1 space-y-3 mt-6">
           <button
            onClick={() => setActiveSection("dashboard")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border border-white/30 hover:bg-[#1a5edb] transition"
          >
            🏠 <span>Dashboard</span>
          </button>
          <button
            onClick={() => setActiveSection("employees")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border border-white/30 hover:bg-[#1a5edb] transition"
          >
            👥 <span>Employees</span>
          </button>
          <button
            onClick={() => setActiveSection("departments")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border border-white/30 hover:bg-[#1a5edb] transition"
          >
            📋 <span>Departments</span>
          </button>
          <button
            onClick={() => setActiveSection("addDepartment")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border border-white/30 hover:bg-[#1a5edb] transition"
          >
            ➕📋 <span>Add Departments</span>
          </button>
          <button
            onClick={() => setActiveSection("reports")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border border-white/30 hover:bg-[#1a5edb] transition"
          >
            📊 <span>Reports</span>
          </button>
        </nav>
      </aside>

      {/* Main Section */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="flex justify-between items-center bg-[#2176ff]  px-6 py-4">
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="font-semibold text-white">
                Abdul Cadre Hassamo
              </div>
              <div className="text-gray-300 text-sm">admin@admin.com</div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6">
          {activeSection === "dashboard" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {/* Card 1 */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-500 text-white rounded-xl shadow-lg p-4 h-60 flex flex-col items-center justify-center hover:scale-105 transition">
                <h1 className="text-5xl mb-1">👥</h1>
                <h1 className="text-lg font-bold">TOTAL EMPLOYEES</h1>
              </div>

              {/* Card 2 */}
              <div className="bg-gradient-to-r from-green-500 to-teal-400 text-white rounded-xl shadow-lg p-4 h-60 flex flex-col items-center justify-center hover:scale-105 transition">
                <h1 className="text-5xl mb-1">📋</h1>
                <h1 className="text-lg font-bold">TOTAL DEPARTMENTS</h1>
              </div>

              {/* Card 3 */}
              <div className="bg-gradient-to-r from-pink-500 to-red-400 text-white rounded-xl shadow-lg p-4 h-60 flex flex-col items-center justify-center hover:scale-105 transition">
                <h1 className="text-5xl mb-1">📊</h1>
                <h1 className="text-lg font-bold">REPORTS</h1>
              </div>
            </div>
          )}

          {activeSection === "addDepartment" && <Departments />}
          {activeSection === "departments" && <h2>Show Department List Here</h2>}
          {activeSection === "employees" && <h2>Show Employees Here</h2>}
          {activeSection === "reports" && <h2>Reports Section</h2>}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
