// src/components/layout/user.panel/UserPanel.jsx
import { LogOut, Settings, Bell, User2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import ThemeToggle from "@/components/ThemeToggle";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function UserPanel() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully.");
      navigate("/");
    } catch (error) {
      toast.error("Logout failed.");
    }
  };

  return (
    <aside className="w-16 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 flex flex-col items-center justify-between py-4">
      {/* Top - Avatar */}
      <div className="flex flex-col items-center gap-2">
        <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">
          {user?.email?.charAt(0).toUpperCase()}
        </div>
      </div>

      {/* Middle - Actions */}
      <div className="flex flex-col gap-6 items-center mt-8">
        <IconButton icon={<Bell size={20} />} />
        <IconButton icon={<Settings size={20} />} />
        <IconButton icon={<LogOut size={20} />} onClick={handleLogout} />
      </div>

      {/* Bottom - Theme */}
      <div className="mt-auto">
        <ThemeToggle />
      </div>
    </aside>
  );
}

function IconButton({ icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
    >
      {icon}
    </button>
  );
}