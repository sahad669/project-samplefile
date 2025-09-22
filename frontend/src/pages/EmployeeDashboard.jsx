import React from 'react'
import { User, UserCog, FilePlus, LogIn, LogOut } from "lucide-react";


const EmployeeDashboard = () => {
  return (
    <div className="min-h-screen flex  ">
      {/* Sidebar */}
   <aside className="hidden md:flex flex-col bg-[#2176ff] text-white w-64 min-h-screen px-5 py-6">
  <div className="text-2xl font-bold tracking-wide mb-8 text-center">EMPLOYEE</div>

  <nav className="flex-1 space-y-3 mt-6">
    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border border-white/30 hover:bg-[#1a5edb] transition">
      <User size={20} /> <span>View Profile</span>
    </button>
    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border border-white/30 hover:bg-[#1a5edb] transition">
      <UserCog size={20} /> <span>Edit Profile</span>
    </button>
    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border border-white/30 hover:bg-[#1a5edb] transition">
      <FilePlus size={20} /> <span>Leave Application</span>
    </button>
    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border border-white/30 hover:bg-[#1a5edb] transition">
      <LogIn size={20} /> <span>Login</span>
    </button>
    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border border-white/30 hover:bg-[#1a5edb] transition">
      <LogOut size={20} /> <span>Logout</span>
    </button>
  </nav>
</aside>
      {/* Main Section */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="flex justify-between items-center bg-[#2176ff]  px-6 py-4">
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="font-semibold text-white">Abdul Cadre Hassamo</div>
              <div className="text-gray-300 text-sm">admin@admin.com</div>
            </div>
           
          </div>
        </header>

       
      </div>
    </div>
  )
}

export default EmployeeDashboard