import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import Navbar from "../components/Navbar";
import AdminSidebar from "../components/AdminSidebar";
import Departments from "../components/Departments";
import DepartmentCards from "../components/DepartmentCard";
import EmployeeList from "../components/EmployeeList";
import Employees from "../components/Employees";

import EmployeeDetails from "../components/EmployeeDetails";
import { fetchDepartment } from "../features/departmentSlice";
import { fetchEmployee } from "../features/employeeSlice";

import { motion } from "framer-motion";
import { Users, ClipboardList, BarChart3 } from "lucide-react";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { departments } = useSelector((state) => state.department);
  const { employees } = useSelector((state) => state.employee);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };
    useEffect(() => {
  dispatch(fetchDepartment()); 
  dispatch(fetchEmployee());   
}, [dispatch]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]">
      {/* Navbar */}
      <Navbar title="Admin Dashboard" />

      {/* Sidebar and Main Content */}
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
                     bg-[url('https://akriviahcm.com/blog/wp-content/uploads/2024/01/features-of-employee-management-system.png')]
                     bg-cover bg-center"
        >
          {/* Dashboard */}
          {activeSection === "dashboard" && (
            <div className="flex flex-col items-center w-full gap-6 max-w-6xl">
              {/* Quote */}
              <motion.p
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center text-xl md:text-2xl text-[#38bdf8] italic font-semibold max-w-2xl"
              >
                “Great things in business are never done by one person. They’re
                done by a team of people.”
              </motion.p>

              {/* Dashboard Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                {/* Employees */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-br from-[#1e40af] to-[#3b82f6] text-white rounded-2xl shadow-lg p-8 h-52 flex flex-col items-center justify-center cursor-pointer"
                  onClick={() => setActiveSection("employeelist")}
                >
                  <Users size={42} className="mb-3" />
                  <h1 className="text-lg font-bold">TOTAL EMPLOYEES</h1>
                  <span className="text-2xl font-semibold mt-1">
                    {employees?.length}
                  </span>
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
                  <span className="text-2xl font-semibold mt-1">
                    {departments.length}
                  </span>
                </motion.div>

                {/* Reports */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-br from-[#7c3aed] to-[#a855f7] text-white rounded-2xl shadow-lg p-8 h-52 flex flex-col items-center justify-center cursor-pointer"
                  onClick={() => setActiveSection("attendance")}
                >
                  <BarChart3 size={42} className="mb-3" />
                  <h1 className="text-lg font-bold">ATTENDANCE</h1>
                </motion.div>
              </div>
            </div>
          )}

          {/* Other Sections */}
          {activeSection === "addDepartment" && <Departments />}
          {activeSection === "departmentCards" && <DepartmentCards />}
          {activeSection === "employeelist" && (
            <EmployeeList
              onViewEmployee={(id) => {
                setSelectedEmployeeId(id);
                setActiveSection("employeeDetails");
              }}
            />
          )}
          {activeSection === "employeeDetails" && selectedEmployeeId && (
            <EmployeeDetails
              id={selectedEmployeeId}
              onBack={() => setActiveSection("employeelist")}
            />
          )}
          {activeSection === "addEmployees" && <Employees />}

        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
