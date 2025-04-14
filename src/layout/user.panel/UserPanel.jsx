// 📁 File: src/layout/user.panel/UserPanel.jsx

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Settings, Bell, Menu } from "lucide-react";
import { toast } from "react-hot-toast";
import { useAuth } from "@/contexts/AuthContext";
import ThemeToggle from "@/components/ThemeToggle";
import UserMenu from "./UserMenu";

export default function UserPanel() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Detect screen width
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  // Mobile full-screen overlay
  if (isMobile) {
    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-4 right-4 z-50 bg-blue-600 text-white p-2 rounded-full shadow-lg"
        >
          <Menu size={20} />
        </button>

        {isOpen && (
          <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 p-6 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-sm font-semibold">
                {userInitial}
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-black dark:text-gray-300 dark:hover:text-white"
              >
                Close
              </button>
            </div>

            <UserMenu onLogout={handleLogout} />

            <div className="mt-auto">
              <ThemeToggle />
            </div>
          </div>
        )}
      </>
    );
  }

  // Desktop Sidebar (fixed right)
  return (
    <aside className="w-16 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 flex flex-col items-center justify-between py-4 relative overflow-visible z-40">
      <div className="group relative">
        <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-sm font-semibold hover:scale-105 transition cursor-pointer">
          {userInitial}
        </div>
      </div>

      <UserMenu onLogout={handleLogout} />

      <div className="mt-auto">
        <ThemeToggle />
      </div>
    </aside>
  );
}
