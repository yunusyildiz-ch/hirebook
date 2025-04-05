import { NavLink, useNavigate } from "react-router-dom";
import {
  StickyNote,
  Users,
  CheckSquare,
  LogOut,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export default function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <aside className="w-64 min-h-screen bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-lg">
      <div className="p-6 text-2xl font-bold text-blue-600 dark:text-blue-400">
        HiReBOOK
      </div>
      <nav className="flex flex-col gap-4 px-4">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 rounded hover:bg-blue-100 dark:hover:bg-gray-700 ${
              isActive ? "bg-blue-100 dark:bg-gray-700 font-semibold" : ""
            }`
          }
        >
          <StickyNote size={18} /> Notes
        </NavLink>

        <NavLink
          to="/dashboard/candidates"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 rounded hover:bg-blue-100 dark:hover:bg-gray-700 ${
              isActive ? "bg-blue-100 dark:bg-gray-700 font-semibold" : ""
            }`
          }
        >
          <Users size={18} /> Candidates
        </NavLink>

        <NavLink
          to="/dashboard/tasks"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 rounded hover:bg-blue-100 dark:hover:bg-gray-700 ${
              isActive ? "bg-blue-100 dark:bg-gray-700 font-semibold" : ""
            }`
          }
        >
          <CheckSquare size={18} /> Tasks
        </NavLink>

        <button
          onClick={handleLogout}
          className="mt-8 flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
        >
          <LogOut size={18} /> Logout
        </button>
      </nav>
    </aside>
  );
}