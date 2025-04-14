import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Shield,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { useState } from "react";
import QatipQLogo from "@/assets/QatipQLogo";

export default function AdminSidebar({ isMobile, onClose }) {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => setCollapsed((prev) => !prev);

  const isCollapsed = collapsed && !isMobile;

  const linkClass = ({ isActive }) =>
    `flex items-center ${
      isCollapsed ? "justify-center" : "justify-start"
    } gap-3 px-4 py-2 rounded-md transition font-medium text-sm whitespace-nowrap
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
          ? "fixed top-0 left-0 w-full h-full z-50 bg-white dark:bg-gray-900"
          : isCollapsed
          ? "w-20"
          : "w-64"
      } flex flex-col text-gray-900 dark:text-white border-r border-gray-200 dark:border-gray-700 transition-all duration-300`}
    >
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <QatipQLogo className="w-6 h-6" />
          {!isCollapsed && !isMobile && (
            <span className="text-lg font-semibold">Admin</span>
          )}
        </div>

        {isMobile ? (
          <button
            onClick={onClose}
            className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
          >
            <X size={20} />
          </button>
        ) : (
          <button
            onClick={toggleCollapse}
            className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 mt-4 flex-1 overflow-y-auto px-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={linkClass}
            onClick={onClose}
          >
            {link.icon}
            {!isCollapsed && <span>{link.label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
