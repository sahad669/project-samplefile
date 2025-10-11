
import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import AdminProtectedRouter from "./components/AdminProtectedRouter";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <AdminProtectedRouter>
              <AdminDashboard />
            </AdminProtectedRouter>
          }
        />
        <Route path="/employee" element={<EmployeeDashboard />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
