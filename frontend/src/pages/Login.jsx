import { login } from "../features/authSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });

  const handleData = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await dispatch(login(data)).unwrap()
    if (res.user.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/employee");
    }
  } catch (error) {
    console.error("Login failed:", error);
  }
};

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center px-4"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1350&q=80')",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-[rgba(30,45,83,0.7)] backdrop-blur-lg p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-[#2176ff] mb-6">
          Login
        </h2>

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
          className="w-full px-4 py-3 mb-6 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition"
        >
          Login
        </button>
         <p className="text-center text-gray-300 mt-4 sm:mt-5 text-sm sm:text-base">
        Don't have an account?{" "}
        <span
          className="text-[#2176ff] hover:underline cursor-pointer"
          onClick={() => navigate("/register")}
        >
          Register
        </span>
      </p>
      </form>

     
    </div>
  );
};

export default Login;
