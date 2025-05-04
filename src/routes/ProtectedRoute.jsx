import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Loader from "@/components/Loader";
import { toast } from "react-hot-toast";

const ProtectedRoute = ({ children }) => {
  const { user, loading, isEmailVerified } = useAuth();
  const location = useLocation();

  if (loading) return <Loader />;

  if (!user) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  if (!isEmailVerified()) {
    toast.error("Please verify your email to access the dashboard.");
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;