import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Loader from "../components/Loader";

const GuestRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <Loader/>; 

  return user ? <Navigate to="/dashboard" replace /> : children;
};

export default GuestRoute;