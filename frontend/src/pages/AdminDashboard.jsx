import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import AdminSidebar from "../components/AdminSidebar";

import { motion } from "framer-motion";
import { Users, ClipboardList, BarChart3 } from "lucide-react";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);


  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]">
      {/* Navbar */}
      <Navbar title="Admin Dashboard" />

      {/* Sidebar and Main section */}
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 shrink-0">
          <AdminSidebar
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            handleLogin={handleLogin}
            handleLogout={handleLogout}
            user={user}
          />
        </div>

        {/* Main section */}
        <main
          className="flex-1 min-h-screen p-6 flex flex-col items-center justify-start pt-20
                     bg-[url('https://shiftin.app/wp-content/uploads/2021/10/what-are-employee-management-systems.jpg')]
                     bg-cover bg-center"
        >
          {activeSection === "dashboard" && (
            <div className="flex flex-col items-center w-full gap-6 max-w-6xl">
             
              <motion.p
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center text-xl md:text-2xl text-[#38bdf8] italic font-semibold max-w-2xl"
              >
                “Great things in business are never done by one person.
                They’re done by a team of people.”
              </motion.p>

              {/* Dashboard Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                {/* Employees */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-br from-[#1e40af] to-[#3b82f6] text-white rounded-2xl shadow-lg p-8 h-52 flex flex-col items-center justify-center cursor-pointer"
                  onClick={() => setActiveSection("employeeCards")}
                >
                  <Users size={42} className="mb-3" />
                  <h1 className="text-lg font-bold">TOTAL EMPLOYEES</h1>
                  <span className="text-2xl font-semibold mt-1">0</span>
                </motion.div>

                {/* Departments */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-br from-[#047857] to-[#10b981] text-white rounded-2xl shadow-lg p-8 h-52 flex flex-col items-center justify-center cursor-pointer"
                  onClick={() => setActiveSection("departmentCards")}
                >
                  <ClipboardList size={42} className="mb-3" />
                  <h1 className="text-lg font-bold">TOTAL DEPARTMENTS</h1>
                  <span className="text-2xl font-semibold mt-1">0
                  </span>
                </motion.div>

                {/* Reports */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-br from-[#7c3aed] to-[#a855f7] text-white rounded-2xl shadow-lg p-8 h-52 flex flex-col items-center justify-center cursor-pointer"
                  onClick={() => setActiveSection("reports")}
                >
                  <BarChart3 size={42} className="mb-3" />
                  <h1 className="text-lg font-bold">REPORTS</h1>
                   <span className="text-2xl font-semibold mt-1">0</span>
                </motion.div>
              </div>
            </div>
          )}

          
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
