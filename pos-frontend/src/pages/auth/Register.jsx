import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { registerApi } from "./authApi";
import MainLayout from "../../layouts/MainLayout";

const Register = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "CASHIER",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await registerApi(formData);

      alert("User Registered Successfully");

      navigate("/login");
    } catch (error) {
      console.log(error);

      alert("Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className=" flex items-center justify-center bg-slate-100">
        <div className="bg-white p-8 rounded shadow w-[400px]">
          <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* USERNAME */}
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />

            {/* EMAIL */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />

            {/* PASSWORD */}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />

            {/* ROLE */}
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            >
              <option value="ADMIN">ADMIN</option>
              <option value="CASHIER">CASHIER</option>
            </select>

            {/* BUTTON */}
            <button
              disabled={loading}
              className="w-full bg-slate-900 text-white p-3 rounded"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default Register;
