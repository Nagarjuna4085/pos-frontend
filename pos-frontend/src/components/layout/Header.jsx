import { useNavigate } from "react-router-dom";

import authStore from "../../store/authStore";

const Header = () => {
  const navigate = useNavigate();

  const logout = authStore((state) => state.logout);

  const handleLogout = () => {
    logout();

    navigate("/login");
  };

  return (
    <div className="h-16 bg-white shadow flex items-center justify-between px-5">
      <h2 className="text-xl font-semibold">Dashboard</h2>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Header;
