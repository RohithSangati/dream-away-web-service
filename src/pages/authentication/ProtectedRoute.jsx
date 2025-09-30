import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { hasAccess } from "../../utils/authUtil";

const ProtectedRoute = ({ element: Component, roles }) => {
  const location = useLocation();
  const { user } = useContext(AuthContext);
  if (!user || (roles.length > 0 && !hasAccess(user.roles, roles))) {
    return <Navigate to="/auth/login" replace state={{ from: location }} />;
  }
  return Component;
};

export default ProtectedRoute;
