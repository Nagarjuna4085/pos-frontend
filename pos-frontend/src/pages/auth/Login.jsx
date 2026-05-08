import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginApi } from "./authApi";
import authStore from "../../store/authStore";

const Login = () => {
  const navigate = useNavigate();

  const login = authStore((state) => state.login);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

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

      const data = await loginApi(formData);
      console.log("data", data.token);
      localStorage.setItem("token", data.token);

      login(data);

      navigate("/");
    } catch (error) {
      console.log(error);

      alert("Invalid Credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-10 rounded shadow w-96">
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <button
            disabled={loading}
            className="w-full bg-slate-900 text-white p-3 rounded"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
