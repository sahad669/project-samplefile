
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeById } from "../features/employeeSlice";
import { Loader2 } from "lucide-react";

const ViewEmployeeProfile = () => {
  const dispatch = useDispatch();
  const { employeeDetails, loading, error } = useSelector((state) => state.employee);

  const user = JSON.parse(localStorage.getItem("user"));
  const id = user?._id;

  useEffect(() => {
    if (id) dispatch(getEmployeeById(id));
  }, [dispatch, id]);

  if (loading) return <Loader2 className="animate-spin w-10 h-10 mx-auto mt-20" />;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!employeeDetails) return <p className="text-gray-500 text-center">No profile found</p>;

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 py-10 space-y-6 bg-gradient-to-br from-[#1e293b] to-[#0f172a] text-white rounded-2xl shadow-2xl overflow-hidden">

      {/* Background stickers */}
      <span className="absolute top-10 left-[-50px] w-40 h-40 bg-cyan-500 rounded-full opacity-20 animate-pulse"></span>
      <span className="absolute bottom-10 right-[-60px] w-56 h-56 bg-purple-500 rounded-full opacity-20 animate-pulse"></span>
      <span className="absolute top-20 right-[-30px] w-32 h-32 bg-pink-500 rounded-full opacity-10 animate-bounce"></span>

      {/* Welcome message */}
      <h2 className="text-4xl font-extrabold text-cyan-400 mb-6 animate-fade-in text-center p-5">
        Welcome, {user?.name || "Employee"}!
      </h2>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-10 animate-fade-in-up">

        {/* Employee Image */}
        <div className="relative group">
          <img
            src={employeeDetails.imageurl || "https://via.placeholder.com/200"}
            alt={employeeDetails.name}
            className="w-56 h-56 md:w-64 md:h-64 rounded-xl shadow-xl object-cover border-4 border-cyan-400 transform transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-cyan-400 text-black px-3 py-1 rounded-full text-sm opacity-70">
            {employeeDetails.role.toUpperCase()}
          </div>
        </div>

        {/* Employee Details */}
        <div className="flex-1 space-y-4 text-lg animate-fade-in-up delay-200">
          <p><span className="font-semibold text-cyan-300">Name:</span> {employeeDetails.name}</p>
          <p><span className="font-semibold text-cyan-300">Email:</span> {employeeDetails.email}</p>
          <p><span className="font-semibold text-cyan-300">Phone:</span> {employeeDetails.phone}</p>
          <p><span className="font-semibold text-cyan-300">Role:</span> {employeeDetails.role}</p>
          <p><span className="font-semibold text-cyan-300">Department:</span> {employeeDetails.department?.department || "N/A"}</p>
        </div>

      </div>
    </div>
  );
};

export default ViewEmployeeProfile;
