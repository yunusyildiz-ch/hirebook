import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./common/Header";
import UserPanel from "./user.panel/UserPanel";
import CookieBanner from "@components/CookieBanner";
import useGlobalListeners from "@hooks/useGlobalListeners";

export default function Layout() {
  useGlobalListeners();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

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
    <div className="h-[100svh] w-full flex bg-white dark:bg-gray-900 transition-colors duration-300 overflow-hidden">
      {/* Sidebar */}
      {isSidebarOpen && <Sidebar onClose={closeSidebar} isMobile={isMobile} />}

      {/* Main Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
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
    </div>
  );
}

