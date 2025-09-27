import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  

  return (
    <div
      className="h-screen w-full flex items-center justify-center px-4 sm:px-6 md:px-8 bg-center bg-cover relative"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=1500&q=80')" }}>
    
     
      <div className="absolute -top-8 right-8 w-64 h-64 bg-blue-500 opacity-20 rounded-full blur-2xl pointer-events-none hidden md:block"></div>
      <div className="absolute bottom-0 left-8 w-52 h-52 bg-indigo-800 opacity-20 rounded-full blur-2xl pointer-events-none hidden md:block"></div>
   
      <div className="relative  p-6 sm:p-10 md:p-14  text-center text-white max-w-xs sm:max-w-xl md:max-w-2xl  transition-all duration-300">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-6 sm:mb-8 md:mb-12 tracking-wide drop-shadow-lg">
          Employee Management System
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl italic mb-6 sm:mb-8 md:mb-10 tracking-tight opacity-90">
          "Great employees don’t just work for you, they grow with you."
        </p>
        <button
          className="px-7 py-3 sm:px-10 sm:py-4 bg-gradient-to-r from-blue-500 to-[#2176ff] hover:from-[#1858c3] hover:to-blue-600 rounded-full text-base sm:text-xl font-semibold shadow-lg transition transform hover:scale-105 duration-200"
          onClick={() => navigate("/login")}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Home;






