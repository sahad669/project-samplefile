import React from "react";

const AdminSidebar = ({
  activeSection,
  setActiveSection,
  handleLogin,
  handleLogout,
  user,
}) => {
  return (
    <aside className="flex fixed top-0 left-0 h-screen flex-col bg-gradient-to-r from-[#0f172a] to-[#1e293b] backdrop-blur-md  w-64  px-5 py-6 z-30 mt-17">
      <nav className="flex-1 flex flex-col space-y-3 mt-8">
        <button
          onClick={() => setActiveSection("dashboard")}
          className={`w-full bg-[#38bdf8] text-white py-3 rounded-lg font-semibold hover:bg-[#0ea5e9] transition ${
            activeSection === "dashboard" ? "bg-[#38bdf8]" : ""
          }`}
        >
          🏠 <span>Dashboard</span>
        </button>

        <button
          onClick={() => setActiveSection("employees")}
          className={`w-full bg-[#38bdf8] text-white py-3 rounded-lg font-semibold hover:bg-[#0ea5e9] transition ${
            activeSection === "employees" ? "bg-[#38bdf8]" : ""
          }`}
        >
          👥 <span>View Profile</span>
        </button>

        <button
          onClick={() => setActiveSection("addDepartment")}
          className={`w-full bg-[#38bdf8] text-white py-3 rounded-lg font-semibold hover:bg-[#0ea5e9] transition${
            activeSection === "addDepartment" ? "bg-[#38bdf8]" : ""
          }`}
        >
          👥 <span>Edit Profile</span>
        </button>

       

      
        {!user ? (
          <button
            onClick={handleLogin}
            className="w-full bg-[#38bdf8] text-white py-3 rounded-lg font-semibold hover:bg-[#0ea5e9] transition"
          >
            🔐 <span>Login</span>
          </button>
        ) : (
          <button
            onClick={handleLogout}
            className="w-full bg-[#38bdf8] text-white py-3 rounded-lg font-semibold hover:bg-[#0ea5e9] transition"
          >
            🚪 <span>Logout</span>
          </button>
        )}
      </nav>
    </aside>
  );
};

export default AdminSidebar;