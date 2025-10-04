
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import EmployeeSidebar from "../components/EmployeeSidebar";
import ViewEmployeeProfile from "../components/ViewEmployeeProfile";
import EditEmployeeProfile from "../components/EditEmployeeProfile"; 
import { motion } from "framer-motion";

const EmployeeDashboard = () => {
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
      <Navbar title="Employee Dashboard" />

      {/* Sidebar and Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 shrink-0">
          <EmployeeSidebar
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
            bg-[url('https://akriviahcm.com/blog/wp-content/uploads/2024/01/features-of-employee-management-system.png')]
            bg-cover bg-center"
        >
          {activeSection === "dashboard" && (
            <div className="flex flex-col items-center w-full gap-6 max-w-6xl">
              {/* Quote */}
              <motion.p
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center text-xl md:text-2xl text-[#38bdf8] italic font-semibold max-w-2xl"
              >
                "Success is the sum of small efforts, repeated day in and day out."
              </motion.p>

              
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-2xl bg-[#1e293b] p-5 rounded-lg shadow-lg mb-8"
              >
                <h2 className="text-lg md:text-xl font-semibold text-[#38bdf8] mb-3">
                  Recent Announcements
                </h2>
                <ul className="space-y-3">
                  <li className="text-base text-white border-b border-[#38bdf8] pb-2">
                    🚀 Company launches new benefits program effective October 1st.
                  </li>
                  <li className="text-base text-white border-b border-[#38bdf8] pb-2">
                    📰 Q3 townhall scheduled for October 16th – join on Teams at 4pm.
                  </li>
                  <li className="text-base text-white pb-2">
                    🎉 Welcome new team members in the Engineering and HR departments!
                  </li>
                </ul>
              </motion.div>
            </div>
          )}

          {/* View Profile Section */}
          {activeSection === "viewProfile" && <ViewEmployeeProfile />}

          {/* Edit Profile Section */}
          {activeSection === "editProfile" && <EditEmployeeProfile />}

         
        </main>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
