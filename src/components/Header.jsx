import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { User2 } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const { user } = useAuth();

  return (
    <header className="w-full bg-white dark:bg-gray-900 shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-blue-600 dark:text-blue-400">HiReBOOK</h1>

      <nav className="flex gap-6 items-center">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `text-sm font-medium transition hover:text-blue-600 ${
              isActive ? "text-blue-600 dark:text-blue-400 font-semibold" : "text-gray-700 dark:text-gray-300"
            }`
          }
        >
          Notes
        </NavLink>
        <NavLink
          to="/dashboard/candidates"
          className={({ isActive }) =>
            `text-sm font-medium transition hover:text-blue-600 ${
              isActive ? "text-blue-600 dark:text-blue-400 font-semibold" : "text-gray-700 dark:text-gray-300"
            }`
          }
        >
          Candidates
        </NavLink>
        <NavLink
          to="/dashboard/tasks"
          className={({ isActive }) =>
            `text-sm font-medium transition hover:text-blue-600 ${
              isActive ? "text-blue-600 dark:text-blue-400 font-semibold" : "text-gray-700 dark:text-gray-300"
            }`
          }
        >
          Tasks
        </NavLink>
        <ThemeToggle />
        {user && (
          <div className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300">
            <User2 size={18} />
            <span>{user.email}</span>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;