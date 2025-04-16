import { NavLink, Outlet } from "react-router-dom";
import QatipLogo from "@assets/QatipLogo";
import ThemeToggle from "@components/ThemeToggle";
import { ShieldCheck, Lock, Cookie } from "lucide-react";
import CookieBanner from "@components/CookieBanner";

export default function LegalLayout() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* 📦 Sidebar */}
      <aside className="w-full md:w-1/4 md:fixed md:h-screen md:overflow-y-auto bg-white dark:bg-gray-800 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700 shadow-md z-10">
        <div className="flex flex-col md:items-end md:p-4 space-y-2 text-right w-full">

          {/* 🔝 Header Area (Mobile: top — Desktop: top-right) */}
          <div className="flex justify-between items-center px-4 pt-4 pb-2 md:block md:space-y-2 md:px-0">
            {/* Logo & Slogan */}
            <NavLink to="/" className="flex items-center gap-2 md:flex-col md:items-end md:gap-0">
              <QatipLogo className="h-20 fill-current text-gray-900 dark:text-white" />
              <span className="hidden md:inline-block text-xs text-gray-500 dark:text-gray-400 mt-1">
                Your all-in-one hiring assistant.
              </span>
            </NavLink>

            {/* 🌗 Theme Toggle (Visible on mobile only) */}
            <div className="block md:hidden">
              <ThemeToggle />
            </div>
          </div>

          {/* 🧭 Navigation Links */}
          <nav className="flex flex-row md:flex-col justify-center md:justify-end md:space-y-3 gap-2 px-4 md:px-0 pb-2 md:pb-0 overflow-x-auto w-full text-right">
            <NavLink
              to="/legal/terms"
              className={({ isActive }) =>
                `flex items-center justify-end gap-2 px-3 py-2 rounded-md text-sm transition-all ${
                  isActive
                    ? "bg-red-100 dark:bg-red-900 text-red-600 dark:text-gray-400 font-semibold border-r-4 border-red-500 dark:border-red-400"
                    : "text-gray-600 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400"
                }`
              }
            >
              <span>Terms of Service</span>
              <ShieldCheck size={18} />
            </NavLink>

            <NavLink
              to="/legal/privacy"
              className={({ isActive }) =>
                `flex items-center justify-end gap-2 px-3 py-2 rounded-md text-sm transition-all ${
                  isActive
                    ? "bg-red-100 dark:bg-red-900 text-red-600 dark:text-gray-400 font-semibold border-r-4 border-red-500 dark:border-red-400"
                    : "text-gray-600 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400"
                }`
              }
            >
              <span>Privacy Policy</span>
              <Lock size={18} />
            </NavLink>

            <NavLink
              to="/legal/cookies"
              className={({ isActive }) =>
                `flex items-center justify-end gap-2 px-3 py-2 rounded-md text-sm transition-all ${
                  isActive
                    ? "bg-red-100 dark:bg-red-900 text-red-600 dark:text-gray-400 font-semibold border-r-4 border-red-500 dark:border-red-400"
                    : "text-gray-600 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400"
                }`
              }
            >
              <span>Cookie Use</span>
              <Cookie size={18} />
            </NavLink>
          </nav>

          {/* 💡 Theme Toggle (Visible on desktop only) */}
          <div className="hidden md:block pt-2">
            <ThemeToggle />
          </div>

          {/* 📄 Footer Info (Desktop only) */}
          <div className="hidden md:block pt-4 text-xs text-gray-400 text-right">
            <p>&copy; {new Date().getFullYear()} Qatip® App</p>
            <p className="text-[11px]">All rights reserved.</p>
          </div>
        </div>
      </aside>

      {/* 📃 Main Content Area */}
      <main className="w-full md:ml-[25%] flex-1 p-6 overflow-y-auto bg-white dark:text-gray-400 dark:bg-gray-900 h-screen">
        <Outlet />
        <CookieBanner />
      </main>
    </div>
  );
}