import { useLocation } from "react-router-dom";
import { Menu, Search } from "lucide-react";

export default function Header({ onToggleSidebar }) {
  const location = useLocation();

  const getTitle = () => {
    const path = location.pathname;
    if (path.includes("/notes")) return "Notes";
    if (path.includes("/candidates")) return "Candidates";
    if (path.includes("/tasks")) return "Tasks";
    if (path.includes("/admin/users")) return "User Management";
    if (path.includes("/admin")) return "Admin Dashboard";
    return "Dashboard";
  };

  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      {/* Left: Toggle & Title */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="md:hidden p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-xl font-semibold">{getTitle()}</h1>
      </div>

      {/* Right: Tools */}
      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search..."
            className="rounded-lg px-3 py-1 bg-gray-100 dark:bg-gray-700 text-sm dark:text-white focus:outline-none"
          />
          <Search
            size={16}
            className="absolute top-1.5 right-2 text-gray-400 dark:text-gray-300"
          />
        </div>
      </div>
    </header>
  );
}
