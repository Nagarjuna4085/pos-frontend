import { Navigate } from "react-router-dom";

import authStore from "../store/authStore";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = authStore((state) => state.token);

  const user = authStore((state) => state.user);

  // NOT LOGGED IN
  if (!token) {
    return <Navigate to="/login" />;
  }

  // ROLE CHECK
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
