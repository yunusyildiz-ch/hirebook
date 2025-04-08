import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Loader from "../components/Loader";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Show loader while auth state is being determined
  if (loading) {
    return <Loader />;
  }

  // Redirect unauthenticated users to login
  if (!user) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  // Authenticated → render page
  return children;
};

export default ProtectedRoute;