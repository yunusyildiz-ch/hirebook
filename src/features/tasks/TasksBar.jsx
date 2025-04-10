import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  selectActiveTab,
  selectSearchTerm,
} from "./tasksSelectors";
import {
  setActiveTab,
  setSearchTerm,
} from "./tasksUI.slice";

const tabs = [
  "All",
  "To-do",
  "In Progress",
  "In Review",
  "Done",
  "Archived",
  "New",
];

export default function TasksBar() {
  const dispatch = useDispatch();
  const activeTab = useSelector(selectActiveTab);
  const searchTerm = useSelector(selectSearchTerm);

  // 📌 Load active tab from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("lastTab_tasks");
    if (saved && tabs.includes(saved)) {
      dispatch(setActiveTab(saved));
    } else {
      dispatch(setActiveTab("All"));
    }
  }, [dispatch]);

  const handleClick = (tab) => {
    dispatch(setActiveTab(tab));
    localStorage.setItem("lastTab_tasks", tab);
  };

  const handleSearch = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  return (
    <header className="w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-3 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
      {/* 🔖 Task Tabs */}
      <div className="flex gap-4 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => handleClick(tab)}
            className={`text-sm font-medium transition pb-1 ${
              activeTab === tab
                ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 border-transparent"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 🔍 Search Input */}
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full md:w-64 p-2 text-sm border rounded dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-600"
      />
    </header>
  );
}