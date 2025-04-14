import { LogOut, Settings, Bell, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "react-hot-toast";
import NotificationPanel from "./NotificationPanel";
import SettingsPanel from "./SettingsPanel";
import ProfileEditModal from "@/components/modals/ProfileEditModal";
import ThemeToggle from "@components/ThemeToggle";

// Tooltip-enabled button with optional label
function TooltipButton({ icon, label, onClick, showText = false }) {
  return (
    <div className="group relative flex items-center">
      <button
        onClick={onClick}
        className="text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white"
      >
        {icon}
      </button>
      {/* Tooltip metni solda görünür */}
      <span className="absolute right-full mr-2 px-2 py-1 rounded text-xs bg-gray-300 text-black opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-50">
        {label}
      </span>
    </div>
  );
}

export default function UserMenu() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showProfileEdit, setShowProfileEdit] = useState(false);

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
    <div className="flex flex-col items-center justify-between h-full py-6 relative">
      {/* Üst kısım: sık kullanılanlar */}
      <div className="flex flex-col gap-6 items-center">
        <TooltipButton
          icon={<Bell size={20} />}
          label="Notifications"
          direction="up"
          onClick={() => setShowNotifications(true)}
        />
        <TooltipButton
          icon={<User size={20} />}
          label="Edit Profile"
          direction="down"
          onClick={() => setShowProfileEdit(true)}
        />
        <TooltipButton
          icon={<Settings size={20} />}
          label="Settings"
          direction="up"
          onClick={() => setShowSettings(true)}
        />
        <TooltipButton
          icon={<LogOut size={20} />}
          label="Logout"
          direction="down"
          onClick={handleLogout}
        />
      </div>

      {/* Alt kısım: daha az kullanılanlar */}
      <div className="flex flex-col gap-6 items-center">
        <ThemeToggle />
      </div>

      {/* Modals */}
      {showNotifications && (
        <NotificationPanel onClose={() => setShowNotifications(false)} />
      )}
      {showSettings && <SettingsPanel onClose={() => setShowSettings(false)} />}
      {showProfileEdit && (
        <ProfileEditModal onClose={() => setShowProfileEdit(false)} />
      )}
    </div>
  );
}
