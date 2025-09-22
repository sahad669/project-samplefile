
import { useEffect,useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchDepartments, addDepartment, deleteDepartment } from "../features/departmentSlice";
import { Toaster } from "react-hot-toast";

const Departments = () => {
  const dispatch = useDispatch();
  const { departments, loading } = useSelector(state => state.departments);

  const [department, setDepartment] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);

  const handleAdd = e => {
    e.preventDefault();
    dispatch(addDepartment({ department, description })).then(res => {
      if (res.meta.requestStatus === "fulfilled") {
        setDepartment("");
        setDescription("");
      }
    });
  };

  const handleDelete = id => {
    dispatch(deleteDepartment(id));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Departments</h2>

      <form onSubmit={handleAdd} className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="Department Name"
          value={department}
          onChange={e => setDepartment(e.target.value)}
          className="block w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Department Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="block w-full border p-2 rounded"
          required
        />
        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700" type="submit">
          Add Department
        </button>
      </form>

    {loading ? (
  <p>Loading...</p>
) : departments.length === 0 ? (
  <p className="text-gray-500 text-center mt-10">There is no department. Create departments.</p>
) : (
  <ul>
    {departments.map(dep => (
      <li
        key={dep._id}
        className="flex justify-between items-center bg-white rounded p-3 mb-2 shadow"
      >
        <span>
          <span className="font-semibold">{dep.department}</span> - {dep.description}
        </span>
        <button
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          onClick={() => handleDelete(dep._id)}
        >
          Delete
        </button>
      </li>
    ))}
  </ul>
)}

      <Toaster />
    </div>
  );
};

export default Departments;
