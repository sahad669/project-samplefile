import React, { useState, useEffect } from "react";
import {
  addEmployee,
  fetchEmployee,
  deleteEmployee,
  editEmployee,
} from "../features/employeeSlice";
import { fetchDepartment } from "../features/departmentSlice";
import { useDispatch, useSelector } from "react-redux";
import { Trash2, Loader2, Edit2 } from "lucide-react";

const Employees = () => {
  const { employees, loading } = useSelector((state) => state.employee);
  const { departments } = useSelector((state) => state.department);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "",
    department: "",
  });
  const [image, setImage] = useState(null);
  const [editId, setEditId] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEmployee());
    dispatch(fetchDepartment());
  }, [dispatch]);

  const resetForm = () => {
    setData({
      name: "",
      email: "",
      password: "",
      phone: "",
      role: "",
      department: "",
    });
    setImage(null);
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(data).forEach((key) => formData.append(key, data[key]));
    if (image) formData.append("image", image);

    if (editId) {
      await dispatch(editEmployee({ id: editId, data: formData }));
    } else {
      await dispatch(addEmployee(formData));
    }

    dispatch(fetchEmployee());
    resetForm();
  };

  const handleEdit = (emp) => {
    setEditId(emp._id);
    setData({
      name: emp.name,
      email: emp.email,
      password: "",
      phone: emp.phone,
      role: emp.role,
      department: emp.department?._id || "",
    });
    setImage(null);
  };

  const handleDelete = async (id) => {
    await dispatch(deleteEmployee(id));
    dispatch(fetchEmployee());
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 space-y-10">
      {/* Employee Form */}
      <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] shadow rounded-xl p-6 md:p-10">

        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={handleSubmit}
        >
          <h2 className="md:col-span-2 text-2xl font-bold text-[#38bdf8] mb-4">
            {editId ? "Edit Employee" : "Add New Employee"}
          </h2>

          <input
            name="name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            placeholder="Full Name"
            className="p-3 border bg-[#1e293b] text-white rounded-lg"
          />
          <input
            name="email"
            type="email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            placeholder="Email"
            className="p-3 border bg-[#1e293b] text-white rounded-lg"
          />
          <input
            name="phone"
            value={data.phone}
            onChange={(e) => setData({ ...data, phone: e.target.value })}
            placeholder="Phone"
            className="p-3 border bg-[#1e293b] text-white rounded-lg"
          />
          <input
            name="password"
            type="password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            placeholder={
              editId ? " password" : "Password"
            }
            className="p-3 border bg-[#1e293b] text-white rounded-lg"
          />
          <select
            name="role"
            value={data.role}
            onChange={(e) => setData({ ...data, role: e.target.value })}
            className="p-3 border bg-[#1e293b] text-white rounded-lg"
          >
            <option value="">Select Role</option>
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
          </select>
          <select
            name="department"
            value={data.department}
            onChange={(e) => setData({ ...data, department: e.target.value })}
            className="p-3 border bg-[#1e293b] text-white rounded-lg"
          >
            <option value="">Select Department</option>
            {departments?.map((dep) => (
              <option key={dep._id} value={dep._id}>
                {dep.department}
              </option>
            ))}
          </select>
          <input
            type="file"
            className="p-3 border bg-[#1e293b] text-white rounded-lg md:col-span-2"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <div className="md:col-span-2 flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#38bdf8] hover:bg-[#0ea5e9] text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              {loading ? (
                <Loader2 className="animate-spin w-5 h-5 mx-auto" />
              ) : editId ? (
                "Update Employee"
              ) : (
                "Add Employee"
              )}
            </button>

            {editId && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 py-2 px-4 rounded font-semibold text-white hover:bg-gray-600"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Employee Table */}
      <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] shadow rounded-xl p-6">
        <h2 className="text-3xl font-bold text-[#38bdf8] mb-4">Employees</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm text-gray-300">
            <thead className="bg-[#0f172a] text-gray-200 uppercase text-xs">
              <tr>
                <th className="px-6 py-3">Image</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Department</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees?.map((emp) => (
                <tr
                  key={emp._id}
                  className="border-b border-gray-700 hover:bg-[#1e293b] transition"
                >
                  <td className="px-4 py-2">
                    <img
                      src={emp.imageurl || "https://via.placeholder.com/80"}
                      alt={emp.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="px-4 py-2">{emp.name}</td>
                  <td className="px-4 py-2">{emp.email}</td>
                  <td className="px-4 py-2">
                    {emp.department?.department || "No Department"}
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      onClick={() => handleEdit(emp)}
                      className="bg-blue-500 hover:bg-blue-600 transition-colors duration-300 text-white px-3 py-1 rounded shadow-md flex items-center gap-1"
                    >
                      <Edit2 size={16} /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(emp._id)}
                      className="bg-red-500 hover:bg-red-600 transition-colors duration-300 text-white px-3 py-1 rounded shadow-md flex items-center gap-1"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </td>
                </tr>
              ))}
              {employees?.length === 0 && (
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
    </div>
  );
};

export default Employees;
