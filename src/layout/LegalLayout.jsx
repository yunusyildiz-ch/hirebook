import { NavLink, Outlet } from "react-router-dom";
import QatipLogo from "@assets/QatipLogo";

export default function LegalLayout() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar / Topbar */}
      <aside className="w-full md:w-1/4 md:fixed md:h-screen md:overflow-y-auto bg-white dark:bg-gray-800 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700 shadow-md z-10">
        <div className="flex flex-col md:items-start md:p-6 space-y-4 md:space-y-6">
          {/* Logo + Slogan: Both Mobile & Desktop */}
          <div className="flex items-center gap-3 px-4 py-2 md:px-0 md:py-0">
            <NavLink to="/" className="flex items-center gap-2">
              <QatipLogo className="h-10 w-auto" />
              <span className="hidden md:inline-block text-sm text-gray-500 dark:text-gray-400">
                Your all-in-one hiring assistant.
              </span>
            </NavLink>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-row md:flex-col justify-center md:justify-start md:space-y-4 gap-4 px-4 md:px-0 pb-2 md:pb-0 overflow-x-auto">
            <NavLink
              to="/legal/terms"
              className={({ isActive }) =>
                isActive
                  ? "text-red-600 font-semibold whitespace-nowrap"
                  : "text-gray-600 hover:text-red-500 whitespace-nowrap"
              }
            >
              Terms
            </NavLink>
            <NavLink
              to="/legal/privacy"
              className={({ isActive }) =>
                isActive
                  ? "text-red-600 font-semibold whitespace-nowrap"
                  : "text-gray-600 hover:text-red-500 whitespace-nowrap"
              }
            >
              Privacy
            </NavLink>
            <NavLink
              to="/legal/cookies"
              className={({ isActive }) =>
                isActive
                  ? "text-red-600 font-semibold whitespace-nowrap"
                  : "text-gray-600 hover:text-red-500 whitespace-nowrap"
              }
            >
              Cookies
            </NavLink>
          </nav>

          {/* Footer Info - Desktop Only */}
          <div className="hidden md:block mt-auto pt-6 text-xs text-gray-400">
            <p>&copy; {new Date().getFullYear()} Qatip® App</p>
            <p className="text-[11px]">All rights reserved.</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="w-full md:ml-[25%] flex-1 p-6 overflow-y-auto bg-white dark:bg-gray-900 h-screen">
        <Outlet />
      </main>
    </div>
  );
}
