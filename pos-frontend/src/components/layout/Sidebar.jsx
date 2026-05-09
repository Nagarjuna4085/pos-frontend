import { Link } from "react-router-dom";
import authStore from "../../store/authStore"; // Import your store

const Sidebar = () => {
  // Get user data from your Zustand store
  const user = authStore((state) => state.user);
  console.log("sss", user);

  return (
    <div className="w-64 h-screen bg-slate-900 text-white p-5 flex flex-col">
      {/* Top Section */}
      <div className="flex-1 space-y-4">
        <h1 className="text-2xl font-bold mb-10 text-blue-400">POS SYSTEM</h1>

        {user?.role === "ADMIN" && (
          <ul className="space-y-4">
            <li>
              <Link to="/" className="hover:text-blue-400 block py-1">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-blue-400 block py-1">
                Products
              </Link>
            </li>
            {/* categories */}
            <li>
              <Link to="/categories" className="hover:text-blue-400 block py-1">
                Categories
              </Link>
            </li>
            {/* Inventory */}
            <li>
              <Link to="/inventory" className="hover:text-blue-400 block py-1">
                Inventory
              </Link>
            </li>
            <li>
              <Link
                to="/staff/register"
                className="hover:text-blue-400 block py-1"
              >
                Register Staff
              </Link>
            </li>
          </ul>
        )}

        <ul className="space-y-4">
          {/* pos */}
          <li>
            <Link to="/pos" className="hover:text-blue-400 block py-1">
              POS
            </Link>
          </li>

          <li>
            <Link to="/orders" className="hover:text-blue-400 block py-1">
              Orders
            </Link>
          </li>
          {/* <li>
            <Link to="/customers" className="hover:text-blue-400 block py-1">
              Customers
            </Link>
          </li> */}
        </ul>
      </div>

      {/* Bottom Section: User Profile */}
      <div className="border-t border-slate-700 pt-5 mt-auto">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-lg font-bold">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-medium truncate">
              {user?.username || "User Name"}
            </p>
            <p className="text-xs text-slate-400 uppercase tracking-wider">
              {user?.role || "Role"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
