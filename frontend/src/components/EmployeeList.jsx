

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployee,deleteEmployee } from "../features/employeeSlice";
import { Loader2 } from "lucide-react";


const EmployeeList = ({ onViewEmployee }) => {
  const dispatch = useDispatch();
  const { employees, loading } = useSelector((state) => state.employee);

  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");

  useEffect(() => {
    dispatch(fetchEmployee());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-20">
        <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
      </div>
    );
  }
const handleDelete = async (id) => {
    await dispatch(deleteEmployee(id));
    dispatch(fetchEmployee());
};

  // Filtering logic
  const filteredEmployees = (employees || [])
    .filter((emp) =>
      emp.name?.toLowerCase().includes(search.toLowerCase())
    )
    .filter((emp) =>
      departmentFilter ? emp.department?.department === departmentFilter : true
    );

  return (
    <div className="w-5xl mx-auto p-6 bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-xl shadow-lg text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl text-[#2176ff] font-bold">Employee List</h2>
      </div>

      {/* Search + Filter */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-3 border border-blue-500 rounded-lg flex-1 bg-[#1e293b] text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          className="p-3 border border-blue-500 rounded-lg bg-[#1e293b] text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">All Departments</option>
          {[...new Set((employees || []).map((e) => e.department?.department))].map(
            (dep, i) =>
              dep && (
                <option key={i} value={dep}>
                  {dep}
                </option>
              )
          )}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="w-full border-collapse text-white">
          <thead className="bg-gradient-to-br from-[#0f172a] to-[#1e293b]">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Department</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
  {filteredEmployees?.map((emp) => (
    <tr key={emp._id} className="border-t hover:bg-blue-900 transition-colors">
      <td className="p-3">{emp.name}</td>
      <td className="p-3">{emp.email}</td>
      <td className="p-3">{emp.role}</td>
      <td className="p-3">{emp.department?.department || "N/A"}</td>
      <td className="p-3 flex gap-2">
        {/* View Button */}
        <button
          onClick={() => onViewEmployee(emp._id)}
          className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-white transition"
        >
          View
        </button>
        

        {/* Delete Button */}
        <button
          onClick={() => handleDelete(emp._id)}
          className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-white transition"
        >
          Delete
        </button>
      </td>
    </tr>
  ))}
   {filteredEmployees?.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center text-md py-4 text-red-400">
                    No employees found
                  </td>
                </tr>
              )}
</tbody>

        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
