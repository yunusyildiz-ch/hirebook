import { useState } from "react";
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
import QatipQLogo from "@/assets/QatipQLogo";

export default function Sidebar({ onClose, isMobile }) {
  const { user } = useAuth();
  const role = user?.role || "viewer";
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => setCollapsed((prev) => !prev);

  const linkClass = ({ isActive }) =>
    `flex items-center ${
      collapsed && !isMobile ? "justify-center" : "justify-start"
    } gap-3 px-4 py-2 rounded-md transition font-medium text-sm whitespace-nowrap
    ${isActive ? "bg-blue-100 dark:bg-gray-700 text-blue-600 dark:text-blue-300" : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"}`;

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
      className={`${
        isMobile ? "fixed w-full h-full z-50" : collapsed ? "w-20" : "w-64"
      } flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-r border-gray-200 dark:border-gray-700 transition-all duration-300`}
    >
      {/* Header: Logo & Buttons */}
      <div className="flex items-center justify-between h-14 px-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <QatipQLogo className="w-12 h-12" />
          {!collapsed && !isMobile && (
            <span className="text-lg font-semibold">Qatip</span>
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
      <nav className="flex flex-col gap-1 mt-4">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={linkClass}
            onClick={onClose}
          >
            {link.icon}
            {!collapsed && <span>{link.label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
