import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./common/Header";
import UserPanel from "./user.panel/UserPanel";
import CookieBanner from "@components/CookieBanner";
import useGlobalListeners from "@hooks/useGlobalListeners";
import ComingSoonModal from "@modals/ComingSoonModal";

let setComingSoonOpen;

export default function Layout() {
  useGlobalListeners();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);

  useEffect(() => {
    setComingSoonOpen = setIsComingSoonOpen;
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsSidebarOpen(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => {
    if (isMobile) setIsSidebarOpen(false);
  };

  return (
    <div className="h-[100svh] w-full flex bg-white dark:bg-gray-900 transition duration-300 overflow-hidden">
      {/* Sidebar */}
      {isSidebarOpen && <Sidebar onClose={closeSidebar} isMobile={isMobile} />}

      {/* Main Area */}
      <div className="flex-1 flex flex-col overflow-hidden bg-gray-100 dark:bg-gray-900 transition duration-300">
        {/* Unified Sticky Header (includes tab bar if /notes) */}
        <Header onToggleSidebar={toggleSidebar} />

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <Outlet />
          <CookieBanner />
        </div>
      </div>

      {/* Right User Panel */}
      <UserPanel />
        {/* 📢 Coming Soon Modal */}
        <ComingSoonModal
        isOpen={isComingSoonOpen}
        onClose={() => setIsComingSoonOpen(false)}
      />
    </div>
  );
}

export const openComingSoonModal = () => {
  if (setComingSoonOpen) setComingSoonOpen(true);
};
