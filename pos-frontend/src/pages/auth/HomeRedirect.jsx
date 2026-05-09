import { Navigate } from "react-router-dom";

import authStore from "../../store/authStore";

const HomeRedirect = () => {
  const user = authStore((state) => state.user);

  if (!user) {
    return <Navigate to="/login" />;
  }

  // ADMIN
  if (user.role === "ADMIN") {
    return <Navigate to="/dashboard" />;
  }

  // CASHIER
  if (user.role === "CASHIER") {
    return <Navigate to="/pos" />;
  }

  return <Navigate to="/login" />;
};

export default HomeRedirect;
