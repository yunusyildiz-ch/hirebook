import { Menu } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import ThemeToggle from "@/components/ThemeToggle";

export default function AdminHeader({ onToggleSidebar }) {
  const { user } = useAuth();
  const location = useLocation();

  const getTitle = () => {
    if (location.pathname.includes("/admin/users")) return "User Management";
    return "Admin Dashboard";
  };

  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      {/* Left side: Toggle & Page title */}
      <div className="flex items-center gap-4">
        {/* 🍔 Show toggle on mobile only */}
        <button
          onClick={onToggleSidebar}
          className="md:hidden p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-xl font-semibold">{getTitle()}</h1>
      </div>

      {/* Right side: Theme toggle & user */}
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <div className="w-8 h-8 bg-blue-500 text-white flex items-center justify-center rounded-full text-sm font-bold">
          {user?.email?.charAt(0).toUpperCase() || "?"}
        </div>
      </div>
    </header>
  );
}