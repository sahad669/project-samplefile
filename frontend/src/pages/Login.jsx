import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/authSlice";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await dispatch(login(form)).unwrap();
      toast.success("Login successful");
      if(data.user.role === "admin"){
        navigate("/admin") 
      }else{
        navigate("/employee")
      }
    } catch (err) {
      const errorMessage = 
      err?.response?.data?.message || err?.message || "login failed"
      toast.error(errorMessage)
    }
  };

  return (
    <div
      className="h-screen flex items-center justify-center bg-cover bg-center px-4 sm:px-6 md:px-8"
      style={{
        backgroundImage:
          "url('https://media.istockphoto.com/id/1830042746/photo/document-management-system-dms-with-arrange-folder-and-files-icons-man-setup-storage-backup.jpg?s=612x612&w=0&k=20&c=t8oAAO16j6fMhleAYJEXm5pSXFIDZrEG6sYJkv_Sdos=')",
      }}
    >
      <div className="bg-[rgba(30,45,83,0.7)] p-6 sm:p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg text-white">
        <h2 className="text-3xl font-bold text-center mb-6 tracking-tight">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter Your Email"
            required
            className="w-full px-4 py-3 rounded-lg bg-[#f0f4fa] text-[#1e2d53] font-medium focus:ring-2 focus:ring-[#2176ff] outline-none transition"
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter Your Password"
            required
            className="w-full px-4 py-3 rounded-lg bg-[#f0f4fa] text-[#1e2d53] font-medium focus:ring-2 focus:ring-[#2176ff] outline-none transition"
          />
          <button
            type="submit"
            className="w-full py-3 bg-[#2176ff] hover:bg-[#1858c3] rounded-lg font-semibold text-lg transition tracking-wide shadow-lg"
          >
            Login
          </button>
        </form>
        <p className="text-center text-gray-300 mt-4 sm:mt-5 text-sm sm:text-base">
      Don't have an account?{" "}
      <span
        className="text-[#2176ff] hover:underline cursor-pointer"
        onClick={() => navigate("/register")}
      >
        Register
      </span>
    </p>
      </div>
      <Toaster />
    </div>
     
  );
};

export default Login;

