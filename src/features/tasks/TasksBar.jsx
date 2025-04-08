import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "./tasksUI.slice"; // varsayılan dosya ismi
import { selectActiveTab } from "./tasksSelectors"; // varsayılan dosya ismi

const tabs = ["All", "In Progress", "New"];

export default function TasksBar() {
  const dispatch = useDispatch();
  const activeTab = useSelector(selectActiveTab);

  useEffect(() => {
    const savedTab = localStorage.getItem("lastTab_tasks");
    if (savedTab && tabs.includes(savedTab)) {
      dispatch(setActiveTab(savedTab));
    } else {
      dispatch(setActiveTab("All"));
    }
  }, [dispatch]);

  const handleTabClick = (tab) => {
    localStorage.setItem("lastTab_tasks", tab);
    dispatch(setActiveTab(tab));
  };

  return (
    <header className="h-14 w-full bg-white dark:bg-gray-900 border-b px-6 flex items-end">
      <div className="flex gap-6 pb-1 border-b-2 border-transparent">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={`text-sm pb-1 font-medium transition ${
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
}