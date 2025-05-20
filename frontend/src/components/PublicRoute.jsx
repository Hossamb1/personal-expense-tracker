import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

const PublicRoute = ({ children }) => {
  const { user } = useAuth();

  return !user ? children : <Navigate to="/dashboard" replace />;
};

export default PublicRoute;
