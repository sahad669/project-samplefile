import { useSelector } from "react-redux";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ title }) => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <header className="flex justify-between items-center bg-gradient-to-r from-[#0f172a] to-[#1e293b] bg-opacity-95 backdrop-blur py-4 px-6 w-full sticky top-0 z-40 shadow-lg border-b border-blue-700/30">
      <h1 className="text-2xl font-bold text-[#38bdf8] tracking-wide">
        {title}
      </h1>
      <div className="flex items-center gap-6">
        {user && user.email ? (
          <div className="text-right">
            <div className="font-semibold text-white">{user.email}</div>
            <div className="text-sm font-semibold text-gray-400 capitalize">
              {user.role}
            </div>
          </div>
        ) : (
          <div className="text-right">
            <div className="font-semibold text-white">Admin</div>
            <div className="text-sm font-semibold text-gray-400 capitalize">
              Not logged in
            </div>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/40 transition"
        >
          <LogOut size={20} className="text-red-400" />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
