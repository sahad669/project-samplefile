import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const userData = {
      name: form.name,
      email: form.email,
      password: form.password,
    };

    dispatch(register(userData))
  .unwrap()
  .then(() => toast.success("Registered successfully!"))
  navigate("/login")
  .catch((err) => toast.error(err?.response?.data?.message || err.message));
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
    <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 tracking-tight">
      Register
    </h2>
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
      <input
        name="name"
        onChange={handleChange}
        value={form.name}
        placeholder="Enter Your Name"
        className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg bg-[#f0f4fa] text-[#1e2d53] font-medium focus:ring-2 focus:ring-[#2176ff] outline-none transition"
      />
      <input
        name="email"
        type="email"
        onChange={handleChange}
        value={form.email}
        placeholder="Enter Your Email"
        className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg bg-[#f0f4fa] text-[#1e2d53] font-medium focus:ring-2 focus:ring-[#2176ff] outline-none transition"
      />
      <input
        type="password"
        name="password"
        onChange={handleChange}
        value={form.password}
        placeholder="Password"
        className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg bg-[#f0f4fa] text-[#1e2d53] font-medium focus:ring-2 focus:ring-[#2176ff] outline-none transition"
      />
      <input
        type="password"
        name="confirmPassword"
        onChange={handleChange}
        value={form.confirmPassword}
        placeholder="Confirm Password"
        className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg bg-[#f0f4fa] text-[#1e2d53] font-medium focus:ring-2 focus:ring-[#2176ff] outline-none transition"
      />
      <button
        type="submit"
        className="w-full py-2 sm:py-3 mt-2 bg-[#2176ff] hover:bg-[#1858c3] rounded-lg font-semibold text-base sm:text-lg transition tracking-wide shadow-lg"
      >
        Register
      </button>
    </form>
    <p className="text-center text-gray-300 mt-4 sm:mt-5 text-sm sm:text-base">
      Already have an account?{" "}
      <span
        className="text-[#2176ff] hover:underline cursor-pointer"
        onClick={() => navigate("/login")}
      >
        Login
      </span>
    </p>
  </div>
  <Toaster/>
</div>

  );
};

export default Register;
