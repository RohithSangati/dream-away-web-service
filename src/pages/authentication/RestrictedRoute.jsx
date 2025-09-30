import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../../utils/authUtil";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const RestrictedRoute = ({ element: Component }) => {
  const { user } = useContext(AuthContext);
  if (user && isAuthenticated(user)) {
    return <Navigate to="/" replace />;
  }
  return Component;
};

export default RestrictedRoute;