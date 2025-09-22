import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div
      className="h-screen w-full bg-cover bg-center flex items-center justify-center px-4 sm:px-6 md:px-8"
      style={{
        backgroundImage:
          "url('https://static.vecteezy.com/system/resources/thumbnails/023/824/046/small_2x/businessman-hand-pressing-human-resources-button-human-resources-hr-management-employment-headhunting-concept-hand-holding-modern-social-buttons-on-virtual-background-photo.jpg')",
      }}
    >
      <div className="bg-[rgba(30,45,83,0.7)] p-6 sm:p-10 md:p-12 rounded-3xl text-center text-white max-w-xs sm:max-w-xl md:max-w-3xl shadow-2xl">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-6 sm:mb-8 md:mb-10 tracking-wide">
          Employee Management System
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl italic mb-6 sm:mb-8 md:mb-10 tracking-tight">
          "Great employees don’t just work for you, they grow with you."
        </p>
        <button
          className="px-6 py-3 sm:px-8 sm:py-4 bg-[#2176ff] hover:bg-[#1858c3] rounded-full text-base sm:text-xl font-semibold shadow-lg transition tracking-wide"
          onClick={() => navigate("/login")}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Home;


