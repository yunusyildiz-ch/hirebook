import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Loader from "@/components/Loader";

const ProtectedRoute = ({ children }) => {
  const { user, loading, isEmailVerified } = useAuth();
  const location = useLocation();

  if (loading) return <Loader />;

  if (!user) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  if (!isEmailVerified()) {
    return <Navigate to="/verify-email-info" replace />;
  }

  return children;
};

export default ProtectedRoute;