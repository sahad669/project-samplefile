
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../features/authSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleData = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    dispatch(register(data));
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat" 
         style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')" }}>
      
      <div className="bg-[rgba(30,45,83,0.7)] shadow-xl rounded-2xl p-8 w-full max-w-md backdrop-blur-md">
        <h2 className="text-3xl font-bold text-center text-[#2176ff] mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            onChange={handleData}
            type="text"
            name="name"
            value={data.name}
            placeholder="Enter Full Name"
            className="w-full px-4 py-3 mb-4 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            onChange={handleData}
            type="email"
            name="email"
            value={data.email}
            placeholder="Enter Email Address"
           className="w-full px-4 py-3 mb-4 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            onChange={handleData}
            type="password"
            name="password"
            value={data.password}
            placeholder="Enter Password"
         className="w-full px-4 py-3 mb-4 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            onChange={handleData}
            type="password"
            name="confirmPassword"
            value={data.confirmPassword}
            placeholder="Confirm Password"
          className="w-full px-4 py-3 mb-4 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            className="w-full bg-[#2176ff] text-white py-3 rounded-lg font-semibold hover:bg-[#1a5edb] transition"
          >
            Register
          </button>
        </form>

        <p className="text-center text-white mt-4 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-[#2176ff] font-medium hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
