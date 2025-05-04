import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Loader from "../components/Loader";

const GuestRoute = ({ children }) => {
  const { user, loading, isEmailVerified } = useAuth();

  if (loading) return <Loader />;

  // Eğer user var ama doğrulanmamışsa => guest sayfalarına izin ver
  if (user && !isEmailVerified()) {
    return children;
  }

  return user ? <Navigate to="/dashboard" replace /> : children;
};

export default GuestRoute;