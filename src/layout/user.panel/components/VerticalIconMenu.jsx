import { Bell, Settings, LogOut } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { showSuccess, showError } from "@/utils/toastUtils";

export default function VerticalIconMenu({
  activePanel,
  onTogglePanel,
  isSidebar = false,
}) {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const userInitial =
    user?.displayName?.charAt(0)?.toUpperCase() ||
    user?.email?.charAt(0)?.toUpperCase() ||
    "?";

  const handleLogout = async () => {
    try {
      await logout();
      showSuccess("You’ve successfully logged out.");
      navigate("/");
    } catch (error) {
      showError("Logout failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-[100dvh] w-16 bg-gray-100 dark:bg-gray-800 border-r border-gray-300 dark:border-gray-700">
      <div className="flex flex-col items-center gap-6 mt-6">
        {/* ✅ Avatar Icon as Profile Button */}
        <IconButton
          icon={
            <div className="bg-trabzonBlue border border-trabzonBordo text-trabzonBordo rounded-full w-10 h-10 flex items-center justify-center text-sm font-semibold">
              {userInitial}
            </div>
          }
          active={activePanel === "profile"}
          onClick={() => onTogglePanel("profile")}
        />

        {/* 🔔 Notifications */}
        <IconButton
          icon={<Bell size={20} />}
          active={activePanel === "notifications"}
          onClick={() => onTogglePanel("notifications")}
        />

        {/* ⚙️ Settings */}
        <IconButton
          icon={<Settings size={20} />}
          active={activePanel === "settings"}
          onClick={() => onTogglePanel("settings")}
        />

        {/* 🚪 Logout */}
        <button
          onClick={handleLogout}
          className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition"
        >
          <LogOut size={20} />
        </button>
      </div>

      {/* 🌗 Theme Toggle */}
      <div className="mb-6">
        <ThemeToggle />
      </div>
    </div>
  );
}

function IconButton({ icon, onClick, active }) {
  return (
    <button
      onClick={onClick}
      className={`transition p-1 rounded-full ${
        active ? "text-blue-600 font-bold" : "text-gray-600 dark:text-gray-300"
      } hover:text-blue-600 dark:hover:text-blue-400`}
    >
      {icon}
    </button>
  );
}
