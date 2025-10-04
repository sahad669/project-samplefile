import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDepartment } from "../features/departmentSlice";
import { Building2, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const DepartmentCards = () => {
  const dispatch = useDispatch();
  const { departments, loading } = useSelector(
    (state) => state.department
  );

  useEffect(() => {
    dispatch(fetchDepartment());
  }, [dispatch]);

  if (loading)
    return (
      <div className="flex justify-center items-center mt-20">
        <Loader2 className="w-10 h-10 text-[#38bdf8] animate-spin" />
      </div>
    );

  if (departments.length === 0)
    return (
      <p className="text-[#38bdf8] text-center mt-10">
        No departments exist yet.
      </p>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
      {departments.map((dep) => (
        <motion.div
          key={dep._id}
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] text-white  rounded-2xl shadow-xl p-6 h-44 flex flex-col justify-center"
        >
          <div className="flex items-center gap-3">
            <Building2 size={28} className="text-white" />
            <h1 className="text-xl text-[#2176ff] font-bold">{dep.department}</h1>
          </div>
          <p className="text-white/80 mt-2">{dep.description}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default DepartmentCards;

