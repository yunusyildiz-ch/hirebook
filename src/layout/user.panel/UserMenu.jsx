import { LogOut, Settings, Bell, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "react-hot-toast";
import NotificationPanel from "./NotificationPanel";
import SettingsPanel from "./SettingsPanel";
import ProfileEditModal from "@/components/modals/ProfileEditModal";

// Tooltip-enabled button with optional label
function TooltipButton({ icon, label, onClick, showText = false }) {
  return (
    <div className="group relative flex flex-col items-center">
      <button
        onClick={onClick}
        className="text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white"
      >
        {icon}
      </button>
      <span className="absolute top-full mt-1 px-2 py-1 rounded text-xs bg-gray-300 text-black opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-50">
        {label}
      </span>
      {showText && <span className="text-xs mt-1">{label}</span>}
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
    <div className="flex flex-col gap-6 items-center mt-8 relative">
      <TooltipButton
        icon={<Bell size={20} />}
        label="Notifications"
        onClick={() => setShowNotifications(true)}
      />
      <TooltipButton
        icon={<Settings size={20} />}
        label="Settings"
        onClick={() => setShowSettings(true)}
      />
      <TooltipButton
        icon={<User size={20} />}
        label="Edit Profile"
        onClick={() => setShowProfileEdit(true)}
      />
      <TooltipButton
        icon={<LogOut size={20} />}
        label="Logout"
        onClick={handleLogout}
      />

      {/* Panels/Modals */}
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
