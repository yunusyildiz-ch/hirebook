import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "../notesUI.slice";
import { selectActiveTab } from "../notesSelectors";

const tabs = ["All", "Folders", "New"];

export default function NotesBar() {
  const dispatch = useDispatch();
  const activeTab = useSelector(selectActiveTab);

  useEffect(() => {
    const savedTab = localStorage.getItem("lastTab_notes");
    if (savedTab && tabs.includes(savedTab)) {
      dispatch(setActiveTab(savedTab));
    } else {
      dispatch(setActiveTab("All"));
    }
  }, [dispatch]);

  const handleTabClick = (tab) => {
    localStorage.setItem("lastTab_notes", tab);
    dispatch(setActiveTab(tab));
  };

  return (
    <div className="w-full px-6">
      <div className="flex flex-wrap gap-6 py-3 max-w-7xl mx-auto border-b border-gray-200 dark:border-gray-700">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={`text-sm font-medium pb-1 transition border-b-2 ${
              activeTab === tab
                ? "text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400"
                : "border-transparent text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}