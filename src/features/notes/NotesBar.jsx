import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "./notesUI.slice";
import { selectActiveTab } from "./notesSelectors";

const tabs = ["All", "Folders", "New"];

export default function NotesBar() {
  const dispatch = useDispatch();
  const activeTab = useSelector(selectActiveTab);

  // İlk yüklemede localStorage kontrolü ve Redux güncellemesi
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