import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setActiveTab } from "@/features/notes/notesSlice";

const Header = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  // Determine the active section based on the current route
  let section = "";
  if (location.pathname.startsWith("/dashboard/notes")) section = "notes";
  if (location.pathname.startsWith("/dashboard/candidates")) section = "candidates";
  if (location.pathname.startsWith("/dashboard/tasks")) section = "tasks";

  // Define tabs for each section
  const tabs = {
    notes: ["All", "Folders", "New"],
    candidates: ["All", "Shortlisted", "New"],
    tasks: ["All", "In Progress", "New"],
  };

  const [activeTab, setActiveTabState] = useState("All");

  // Load the last selected tab from localStorage (if any)
  useEffect(() => {
    const savedTab = localStorage.getItem(`lastTab_${section}`);
    if (savedTab && tabs[section]?.includes(savedTab)) {
      setActiveTabState(savedTab);
      dispatch(setActiveTab(savedTab));
    } else {
      setActiveTabState("All");
      dispatch(setActiveTab("All"));
    }
  }, [section, dispatch]);

  // Handle tab selection and persist it in localStorage + update redux
  const handleTabClick = (tab) => {
    setActiveTabState(tab);
    localStorage.setItem(`lastTab_${section}`, tab);
    dispatch(setActiveTab(tab));
  };

  return (
    <header className="h-14 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 flex items-end">
      <div className="flex gap-6 pb-1 border-b-2 border-transparent">
        {tabs[section]?.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={`text-sm pb-1 transition font-medium ${
              activeTab === tab
                ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </header>
  );
};

export default Header;

