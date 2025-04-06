import { NavLink } from "react-router-dom";
import { StickyNote, Users, CheckSquare } from "lucide-react";

export default function Sidebar() {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-md transition font-medium text-sm ${
      isActive
        ? "bg-blue-100 dark:bg-gray-700 text-blue-600 dark:text-blue-300"
        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
    }`;

  return (
    <aside className="w-64 flex flex-col bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-r border-gray-200 dark:border-gray-700 shadow-lg overflow-y-auto">
      {/* 🔷 Logobar */}
      <div className="h-14 px-4 flex items-center gap-2 text-dark-600 dark:text-light-400 text-xl font-bold border-b border-gray-200 dark:border-gray-700">
        <img src="/new_logo.png" alt="HiReBOOK Logo" className="h-10 w-10 rounded" />
        HiRebook
      </div>

      {/* 🔗 Main Navigation Links */}
      <nav className="p-4 flex flex-col gap-2">
        <NavLink to="/dashboard/notes" className={linkClass}>
          <StickyNote size={18} />
          Notes
        </NavLink>
        <NavLink to="/dashboard/candidates" className={linkClass}>
          <Users size={18} />
          Candidates
        </NavLink>
        <NavLink to="/dashboard/tasks" className={linkClass}>
          <CheckSquare size={18} />
          Tasks
        </NavLink>
      </nav>
    </aside>
  );
}