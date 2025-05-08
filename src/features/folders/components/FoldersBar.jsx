import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearSelectedFolder } from "../foldersSlice";
import { setActiveFolderTab, setFolderViewMode } from "../foldersUI.slice";
import { selectActiveFolderTab, selectFolderViewMode } from "../foldersSelectors";
import { TbFolderPlus } from "react-icons/tb";
import FolderModal from "./FolderModal";

const tabs = ["All"];

export default function FoldersBar() {
  const dispatch = useDispatch();
  const activeTab = useSelector(selectActiveFolderTab);
  const viewMode = useSelector(selectFolderViewMode);
  const [showFolderModal, setShowFolderModal] = useState(false);

  useEffect(() => {
    const savedTab = localStorage.getItem("lastTab_folders");
    if (savedTab && tabs.includes(savedTab)) {
      dispatch(setActiveFolderTab(savedTab));
    } else {
      dispatch(setActiveFolderTab("All"));
    }
  }, [dispatch]);

  const handleTabClick = (tab) => {
    localStorage.setItem("lastTab_folders", tab);
    dispatch(setActiveFolderTab(tab));
    dispatch(setFolderViewMode("list"));
  };

  const handleNewFolder = () => {
    setShowFolderModal(true);
  };

  return (
    <>
      <div className="w-full px-6 bg-white transition-colors duration-300 dark:border-gray-700 border-b border-gray-200 dark:bg-gray-800">
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

          {/* + New Folder Button */}
        <button
          onClick={handleNewFolder}
          className={`flex items-center gap-2 text-sm font-medium p-1 rounded-full transition hover:scale-[1.02] ${
            viewMode === "edit"
              ? "bg-greenPrimary hover:bg-greenHover text-white border-greenPrimary border"
              : "bg-skyBlue border border-skyBorder hover:bg-skyBorder text-white"
          }`}
        >
          <TbFolderPlus size={22} />
        </button>
        </div>
      </div>

      {/* Folder Modal */}
      {showFolderModal && (
        <FolderModal isOpen={showFolderModal} onClose={() => setShowFolderModal(false)} />
      )}
    </>
  );
}