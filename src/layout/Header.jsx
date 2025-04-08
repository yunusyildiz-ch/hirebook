import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "@/features/notes/notesUI.Slice";
import { selectActiveTab } from "@/features/notes/notesSelectors";

const Header = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const activeTab = useSelector(selectActiveTab);

  // Determine the current section
  let section = "";
  if (location.pathname.startsWith("/dashboard/notes")) section = "notes";
  if (location.pathname.startsWith("/dashboard/candidates")) section = "candidates";
  if (location.pathname.startsWith("/dashboard/tasks")) section = "tasks";

  const tabs = {
    notes: ["All", "Folders", "New"],
    candidates: ["All", "Shortlisted", "New"],
    tasks: ["All", "In Progress", "New"],
  };

  // On first load or section change: read from localStorage and set Redux
  useEffect(() => {
    const savedTab = localStorage.getItem(`lastTab_${section}`);
    if (savedTab && tabs[section]?.includes(savedTab)) {
      dispatch(setActiveTab(savedTab));
    } else {
      dispatch(setActiveTab("All"));
    }
  }, [section, dispatch]);

  const handleTabClick = (tab) => {
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
            className={`text-sm pb-1 transition font-medium  ${
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

