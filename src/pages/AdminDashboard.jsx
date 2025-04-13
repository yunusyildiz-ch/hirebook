import { useAuth } from "@/contexts/AuthContext";

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div className="p-6 text-gray-900 dark:text-white">
      <h1 className="text-2xl font-bold mb-4">👑 Admin Dashboard</h1>
      <p className="mb-2">Welcome, <strong>{user?.email}</strong>!</p>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Here you can manage users, roles, and system settings.
      </p>
    </div>
  );
}