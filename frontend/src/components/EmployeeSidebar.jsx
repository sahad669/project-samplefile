import React from "react";

const EmployeeSidebar = ({
  activeSection,
  setActiveSection,
  handleLogin,
  handleLogout,
  user,
}) => {
  return (
    <aside
      className="flex fixed top-0 left-0 h-screen flex-col 
                     bg-gradient-to-r from-[#0f172a] to-[#1e293b] 
                     backdrop-blur-md w-64 px-5 py-6 z-30 mt-17"
    >
      <nav className="flex-1 flex flex-col space-y-3 mt-8">
        {/* Dashboard */}
        <button
          onClick={() => setActiveSection("dashboard")}
          className={`w-full text-white py-3 rounded-lg font-semibold transition 
            ${
              activeSection === "dashboard"
                ? "bg-[#38bdf8]"
                : "hover:bg-[#0ea5e9]"
            }`}
        >
          🏠 <span>Dashboard</span>
        </button>

        {/* View Profile */}
        <button
          onClick={() => setActiveSection("viewProfile")}
          className={`w-full text-white py-3 rounded-lg font-semibold transition 
            ${
              activeSection === "viewProfile"
                ? "bg-[#38bdf8]"
                : "hover:bg-[#0ea5e9]"
            }`}
        >
          👤 <span>View Profile</span>
        </button>

        {/* Edit Profile */}
        <button
          onClick={() => setActiveSection("editProfile")}
          className={`w-full text-white py-3 rounded-lg font-semibold transition 
            ${
              activeSection === "editProfile"
                ? "bg-[#38bdf8]"
                : "hover:bg-[#0ea5e9]"
            }`}
        >
          ✏️ <span>Edit Profile</span>
        </button>
        <button
          onClick={() => setActiveSection("attendance")}
          className={`w-full text-white py-3 rounded-lg font-semibold transition ${
            activeSection === "attendance"
              ? "bg-[#38bdf8]"
              : "hover:bg-[#0ea5e9]"
          }`}
        >
          📅 <span>Attendance</span>
        </button>

        {/* Auth Buttons */}
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

export default EmployeeSidebar;
