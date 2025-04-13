import { Navigate } from "react-router-dom";
import useRole from "@/hooks/useRole";

/**
 * A higher-order route component that protects pages by role.
 * @param {ReactNode} children - The component to render
 * @param {string[]} allowedRoles - Array of roles allowed to access this page
 */
export default function RoleProtectedRoute({ children, allowedRoles }) {
  const { role, loading } = useRole();

  if (loading) return <div className="text-center py-10">🔐 Checking permissions...</div>;

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}