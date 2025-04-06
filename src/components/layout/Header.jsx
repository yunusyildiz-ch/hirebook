// src/components/layout/Header.jsx
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  let section = "";
  if (location.pathname.startsWith("/dashboard/notes")) section = "notes";
  if (location.pathname.startsWith("/dashboard/candidates")) section = "candidates";
  if (location.pathname.startsWith("/dashboard/tasks")) section = "tasks";

  const tabs = {
    notes: ["All", "Folders", "New"],
    candidates: ["All", "Shortlisted", "New"],
    tasks: ["All", "In Progress", "New"],
  };

  return (
    <header className="h-14 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 flex items-center">
      <div className="flex gap-4">
        {tabs[section]?.map((tab) => (
          <button
            key={tab}
            className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            {tab}
          </button>
        ))}
      </div>
    </header>
  );
};

export default Header;
