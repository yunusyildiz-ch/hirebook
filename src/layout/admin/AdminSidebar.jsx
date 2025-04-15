import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Shield,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import QatipCatLogo from "@/assets/QatipCatLogo";

export default function AdminSidebar({ isMobile, onClose }) {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => setCollapsed((prev) => !prev);
  const isCollapsed = collapsed && !isMobile;

  const linkClass = ({ isActive }) =>
    `cursor-pointer flex items-center ${
      isCollapsed ? "justify-center" : "justify-start"
    } gap-3 px-4 py-2 rounded-md transition-all duration-300 font-medium text-sm whitespace-nowrap
    ${
      isActive
        ? "bg-blue-100 dark:bg-gray-700 text-blue-600 dark:text-blue-300"
        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
    }`;

  const links = [
    { to: "/admin", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { to: "/admin/users", label: "User Management", icon: <Users size={18} /> },
    { to: "/dashboard", label: "Back to App", icon: <Shield size={18} /> },
  ];

  return (
    <aside
      className={`${
        isMobile
          ? "fixed top-0 left-0 w-full h-full z-50"
          : collapsed
          ? "w-16"
          : "w-52"
      } flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out`}
    >
      {/* Header */}
      <div className="flex items-center justify-between h-14 px-2 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 overflow-hidden transition-all duration-300">
          <QatipCatLogo className="w-12 h-12 shrink-0" />
          {!collapsed && !isMobile && (
            <span className="text-lg font-semibold whitespace-nowrap transition-opacity duration-300">
              Admin
            </span>
          )}
        </div>
        {isMobile && (
          <button
            onClick={onClose}
            className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Scrollable content */}
      <div className="flex flex-col flex-grow overflow-y-auto">
        {/* Navigation links */}
        <nav className="flex flex-col gap-1 mt-4 px-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={linkClass}
              end
              onClick={onClose}
            >
              {({ isActive }) => (
                <>
                  {link.icon}
                  {!collapsed && (
                    <span className="transition-all duration-300 relative">
                      {link.label}
                      {isActive && (
                        <span className="absolute -right-3 top-1/2 -translate-y-1/2 w-2 h-2 bg-red-500 dark:bg-red-400 rounded-full" />
                      )}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Chevron Toggle – Responsive Positioning */}
        {!isMobile && (
          <>
            {/* ChevronRight – top center when collapsed */}
            {collapsed && (
              <div
                onClick={toggleCollapse}
                className="flex flex-grow items-start justify-center mt-4 cursor-pointer border-t border-gray-200 dark:border-gray-700"
                title="Expand Sidebar"
              >
                <div className="p-2 rounded-full transition transform hover:scale-105">
                  <ChevronRight
                    size={20}
                    className="transition-transform duration-300"
                  />
                </div>
              </div>
            )}

            {/* ChevronLeft – bottom right when expanded */}
            {!collapsed && (
              <div
                onClick={toggleCollapse}
                className="flex flex-grow items-end justify-end pr-2 mt-4 pb-4 cursor-pointer border-t border-gray-200 dark:border-gray-700"
                title="Collapse Sidebar"
              >
                <div className="p-2 rounded-full transition transform hover:scale-105">
                  <ChevronLeft
                    size={20}
                    className="transition-transform duration-300"
                  />
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </aside>
  );
}
