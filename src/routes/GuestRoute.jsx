import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const GuestRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return null; // or a loader if needed

  return user ? <Navigate to="/dashboard" replace /> : children;
};

export default GuestRoute;