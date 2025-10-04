import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDepartment, fetchDepartment, deleteDepartment } from "../features/departmentSlice";
import { Building2, Trash2, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const Departments = () => {
  const dispatch = useDispatch();
  const { departments, loading } = useSelector((state) => state.department);
  const [data, setData] = useState({ department: "", description: "" });

  const handleData = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.department) return;
    dispatch(addDepartment(data));
    setData({ department: "", description: "" });
  };

  const handleDelete = (id) => {
    dispatch(deleteDepartment(id));
  };

  useEffect(() => {
    dispatch(fetchDepartment());
  }, [dispatch]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 space-y-10">
      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] shadow-xl rounded-2xl p-8 w-full backdrop-blur-md border border-blue-600/30"
      >
        <h2 className="text-3xl font-bold text-center text-[#38bdf8] mb-6">
          Create New Department
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            onChange={handleData}
            type="text"
            name="department"
            value={data.department}
            placeholder="Enter Department Name"
            className="w-full px-4 py-3 rounded-lg bg-[#1e293b] text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            onChange={handleData}
            type="text"
            name="description"
            value={data.description}
            placeholder="Enter role of the Department"
            className="w-full px-4 py-3 rounded-lg bg-[#1e293b] text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#38bdf8] text-white py-3 rounded-lg font-semibold hover:bg-[#0ea5e9] transition flex items-center justify-center"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              "Add Department"
            )}
          </button>
        </form>
      </motion.div>

      {/* Department Table */}
      <div className="overflow-x-auto w-full">
        {loading ? (
          <div className="flex justify-center items-center mt-10">
            <Loader2 className="w-10 h-10 text-[#38bdf8] animate-spin" />
          </div>
        ) : !departments || departments.length === 0 ? (
          <p className="text-[#38bdf8] text-center text-lg">
            There are no departments. Create one above.
          </p>
        ) : (
          <table className="min-w-full bg-[#1e293b] text-white rounded-lg shadow-md overflow-hidden">
            <thead className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] border-b border-gray-600">
              <tr>
                <th className="px-6 py-3 text-left">#</th>
                <th className="px-6 py-3 text-left">Department</th>
                <th className="px-6 py-3 text-left">Action</th>
                
              </tr>
            </thead>
            <tbody>
              {departments.map((dep, idx) => (
                <tr
                  key={dep._id}
                  className="border-b border-gray-700 hover:bg-gray-800 transition-colors duration-200"
                >
                  <td className="px-6 py-3">{idx + 1}</td>
                  <td className="px-6 py-3 font-semibold">{dep.department}</td>
                  
                 
                  <td className="px-6 py-3 flex gap-2">
                    <button
                      onClick={() => handleDelete(dep._id)}
                      className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                      <Trash2 size={18} />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      
    </div>
  );
};

export default Departments;


