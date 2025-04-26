// src/features/tasks/components/TasksBar.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab, setViewMode, clearSelectedTask } from "../tasksUI.slice";
import { selectActiveTab, selectViewMode as selectTaskViewMode } from "../tasksSelectors";
import { MdOutlineAddTask } from "react-icons/md";

const tabs = ["All", "To-do", "In Progress", "Done"];

export default function TasksBar() {
  const dispatch = useDispatch();
  const activeTab = useSelector(selectActiveTab);
  const viewMode = useSelector(selectTaskViewMode);

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
    dispatch(setViewMode("list"));
  };

  const handleNewTask = () => {
    dispatch(clearSelectedTask());
    dispatch(setViewMode("edit")); 
  };

  return (
    <div className="w-full px-6 bg-white transition-colors duration-300  dark:border-gray-700 border-b border-gray-200 dark:bg-gray-800">
      <div className="flex items-center justify-between max-w-7xl mx-auto py-3 flex-wrap gap-6">
        {/* Tabs */}
        <div className="flex gap-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`text-sm font-medium pb-1 transition border-b-2 hover:scale-[1.05] ${
                activeTab === tab && viewMode === "list"
                  ? "text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400"
                  : "border-transparent text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* + New Task Button */}
        <button
          onClick={handleNewTask}
          className={`flex items-center gap-2 text-sm font-medium p-1 rounded-full transition hover:scale-[1.02] ${
            viewMode === "edit"
              ? "bg-green-500 hover:bg-green-600 text-white border-green-500 border"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          <MdOutlineAddTask size={22} />
        </button>
      </div>
    </div>
  );
}