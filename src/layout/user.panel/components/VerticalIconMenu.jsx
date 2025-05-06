import { Bell, Settings, LogOut } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { showSuccess, showError } from "@/utils/toastUtils";
import { useSelector } from "react-redux";
import UserAvatar from "@layout/user.panel/components/UserAvatar";

export default function VerticalIconMenu({ activePanel, onTogglePanel }) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const unreadCount = useSelector((state) => state.notificationBadge.unreadCount);

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
    <div className="flex flex-col items-center justify-between min-h-[100dvh] w-16 dark:bg-gray-800 border-r border-gray-300 dark:border-gray-700">
      <div className="flex flex-col items-center gap-6 mt-6">
        {/* 🧑 Avatar (özel buton) */}
        <AvatarIconButton
          isActive={activePanel === "profile"}
          onClick={() => onTogglePanel("profile")}
        />

        {/* 🔔 Notification */}
        <IconButton
          icon={
            <div className="relative">
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold px-1.5 py-[2px] rounded-full">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </div>
          }
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
        <IconButton
          icon={
            <LogOut
              size={20}
              className="text-red-600 dark:text-red-400 group-hover:text-red-700 dark:group-hover:text-red-300 transition"
            />
          }
          onClick={handleLogout}
        />
      </div>

      <div className="mb-6">
        <ThemeToggle />
      </div>
    </div>
  );
}

/**
 * 🧩 Normal ikon butonu
 */
function IconButton({ icon, onClick, active }) {
  return (
    <button
      onClick={onClick}
      className={`
        group transition 
        p-3 rounded-full border
        ${active
          ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
          : "text-gray-600 dark:text-gray-300 border-transparent"}
        hover:bg-gray-100 dark:hover:bg-gray-700
      `}
    >
      <div className="flex items-center justify-center">
        {icon}
      </div>
    </button>
  );
}

/**
 * 🧑 Avatar ikon butonu → özel stillendirilebilir
 */
function AvatarIconButton({ isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        transition rounded-full border
        ${isActive
          ? "bg-skyBlue  text-blue-600 dark:text-blue-300"
          : "text-gray-600 dark:text-gray-300 border-transparent"}
        hover:bg-skyBorder 
       p-1
      `}
    >
      <UserAvatar size={52} />
    </button>
  );
}

