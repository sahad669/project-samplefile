import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import AdminProtectedRouter from "./components/AdminProtectedRouter";

const App = () => {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      {/* Admin only */}
      <Route
        path="/admin"
        element={
          <AdminProtectedRouter>
            <AdminDashboard />
          </AdminProtectedRouter>
        }
      />

      {/* Default employee route */}
      <Route path="/employee" element={<EmployeeDashboard />} />
    </Routes>
  );
};

export default App;
