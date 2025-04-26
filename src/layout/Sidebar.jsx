import { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  StickyNote,
  CheckSquare,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import QatipLogo from "@/assets/QatipQLogo";

export default function Sidebar({ onClose, isMobile }) {
  const { user } = useAuth();
  const role = user?.role || "viewer";
  const [collapsed, setCollapsed] = useState(false);
  const sidebarRef = useRef();

  const toggleCollapse = () => setCollapsed((prev) => !prev);

  const linkClass = ({ isActive }) =>
    `flex items-center ${
      collapsed && !isMobile ? "justify-center" : "justify-start"
    } gap-3 px-4 py-2 rounded-md transition-all duration-300 font-medium text-sm whitespace-nowrap
    ${
      isActive
        ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
    }`;

  const sharedLinks = [
    { to: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { to: "/dashboard/notes", label: "Notes", icon: <StickyNote size={18} /> },
    { to: "/dashboard/candidates", label: "Candidates", icon: <Users size={18} /> },
    { to: "/dashboard/tasks", label: "Tasks", icon: <CheckSquare size={18} /> },
  ];

  const adminLinks = role === "admin"
    ? [{ to: "/admin", label: "Admin Access", icon: <ShieldCheck size={18} /> }]
    : [];

  const links = [...sharedLinks, ...adminLinks];

  return (
    <aside
      ref={sidebarRef}
      className={`${
        isMobile ? "fixed w-full h-full z-50" : collapsed ? "w-16" : "w-52"
      } flex flex-col bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out`}
    >
      {/* Logo Area */}
      <div className="flex items-center justify-between h-14 px-2 border-b border-gray-200 dark:border-gray-700 ">
        <div className="flex items-center gap-2 overflow-hidden ">
          <QatipLogo className="w-12 h-12 shrink-0 " />
          {!collapsed && !isMobile && (
            <span className="text-lg font-semibold whitespace-nowrap transition-all duration-300">
              Qatip
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

      {/* Scrollable Links */}
      <div className="flex flex-col flex-grow overflow-y-auto">
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

        {/* Collapse Button */}
        {!isMobile && (
          <>
            {collapsed ? (
              <div
                onClick={toggleCollapse}
                className="flex flex-grow items-start justify-center mt-4 cursor-pointer border-t border-gray-200 dark:border-gray-700 transition-all duration-300"
                title="Expand Sidebar"
              >
                <div className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300">
                  <ChevronRight size={20} />
                </div>
              </div>
            ) : (
              <div
                onClick={toggleCollapse}
                className="flex flex-grow items-end justify-end pr-2 mt-4 pb-6 cursor-pointer border-t border-gray-200 dark:border-gray-700 transition-all duration-300"
                title="Collapse Sidebar"
              >
                <div className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300">
                  <ChevronLeft size={20} />
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </aside>
  );
}
