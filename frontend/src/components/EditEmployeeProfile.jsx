import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeById, editEmployee } from "../features/employeeSlice";
import { Loader2 } from "lucide-react";

const EditEmployeeProfile = () => {
  const dispatch = useDispatch();
  const { employeeDetails, loading } = useSelector((state) => state.employee);

  const user = JSON.parse(localStorage.getItem("user"));
  const id = user?._id;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (id) dispatch(getEmployeeById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (employeeDetails) {
      setFormData({
        name: employeeDetails.name,
        email: employeeDetails.email,
        phone: employeeDetails.phone,
        password: "",
      });
    }
  }, [employeeDetails]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.keys(formData).forEach((key) => fd.append(key, formData[key]));
    if (image) fd.append("image", image);

    await dispatch(editEmployee({ id, data: fd }));
    dispatch(getEmployeeById(id));
  };

  if (!employeeDetails)
    return <Loader2 className="animate-spin w-10 h-10 mx-auto mt-20" />;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 space-y-10 bg-gradient-to-br from-[#1e293b] to-[#0f172a] text-white rounded-xl shadow-xl p-8 ">
      <form
        onSubmit={handleSubmit}
        className=""
      >
        <h2 className="text-3xl font-bold mb-8 text-cyan-400 text-center">
          Edit your Profile
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Full Name"
            className="p-4 rounded-lg bg-[#1e293b] border border-gray-700 text-white focus:ring-2 focus:ring-cyan-500"
          />
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="Email"
            className="p-4 rounded-lg bg-[#1e293b] border border-gray-700 text-white focus:ring-2 focus:ring-cyan-500"
          />
          <input
            type="text"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            placeholder="Phone"
            className="p-4 rounded-lg bg-[#1e293b] border border-gray-700 text-white focus:ring-2 focus:ring-cyan-500"
          />
          <input
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            placeholder="Password"
            className="p-4 rounded-lg bg-[#1e293b] border border-gray-700 text-white focus:ring-2 focus:ring-cyan-500"
          />
        </div>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="p-4 rounded-lg bg-[#1e293b] border border-gray-700 text-white w-full mb-6"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white text-lg font-semibold py-3 rounded-lg transition"
        >
          {loading ? (
            <Loader2 className="animate-spin w-5 h-5 mx-auto" />
          ) : (
            "Update Profile"
          )}
        </button>
      </form>
    </div>
  );
};

export default EditEmployeeProfile;

