import { useNavigate } from "react-router-dom";
import { LogOut, Settings, Bell } from "lucide-react";
import { toast } from "react-hot-toast";
import { useAuth } from "@/contexts/AuthContext";
import ThemeToggle from "@/components/ThemeToggle";

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

  const userInitial = user?.email?.charAt(0).toUpperCase() || "?";
  const userFullName = user?.firstName + user?.lastName || "John Doe";
  const userEmail = user?.email || "unknown@example.com";

  return (
    <aside className="w-16 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 flex flex-col items-center justify-between py-4 relative overflow-visible z-50">
      {/* Top - Avatar with Tooltip */}
      <div className="group relative">
        <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-sm font-semibold hover:scale-105 transition cursor-pointer">
          {userInitial}
        </div>

        <div className="absolute right-full mr-2 top-1/5 -translate-y-1/2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 shadow-md rounded-md px-4 py-3 w-56 opacity-0 group-hover:opacity-100 transition z-50 text-sm">
          <p className="text-xs font-bold text-red-600 dark:text-red-400 mb-1">
            Qatip Account:
          </p>
          <p className="font-medium truncate">{userFullName}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
            {userEmail}
          </p>
        </div>
      </div>

      {/* Tooltips */}
      <div className="flex flex-col gap-6 items-center mt-8">
        <TooltipButton icon={<Bell size={20} />} label="Notifications" />
        <TooltipButton icon={<Settings size={20} />} label="Settings" />
        <TooltipButton
          icon={<LogOut size={20} />}
          label="Logout"
          onClick={handleLogout}
        />
      </div>

      {/* Bottom - Theme Toggle */}
      <div className="mt-auto">
        <ThemeToggle />
      </div>
    </aside>
  );
}

function TooltipButton({ icon, label, onClick }) {
  return (
    <div className="group relative">
      <button onClick={onClick}>{icon}</button>
      <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-gray-300 text-black text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition z-50 whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}
