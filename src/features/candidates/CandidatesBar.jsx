import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setActiveTab, setSearchTerm } from "./candidatesUI.slice";
import {
  selectActiveTab,
  selectSearchTerm,
} from "./candidatesSelectors";

const tabs = ["All", "Pending", "Interviewed", "Rejected"];

export default function CandidatesBar() {
  const dispatch = useDispatch();
  const activeTab = useSelector(selectActiveTab);
  const searchTerm = useSelector(selectSearchTerm);

  //first upload from localstorage
  useEffect(() => {
    const saved = localStorage.getItem("lastTab_candidates");
    if (saved && tabs.includes(saved)) {
      dispatch(setActiveTab(saved));
    } else {
      dispatch(setActiveTab("All"));
    }
  }, [dispatch]);

  const handleClick = (tab) => {
    dispatch(setActiveTab(tab));
    localStorage.setItem("lastTab_candidates", tab);
  };

  const handleSearch = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  return (
    <header className="w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-3 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">

      <div className="flex gap-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => handleClick(tab)}
            className={`text-sm font-medium transition pb-1 ${
              activeTab === tab
                ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <input
        type="text"
        placeholder="Search candidates..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full md:w-64 p-2 text-sm border rounded dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-600"
      />
    </header>
  );
}