// 📂 src/features/folders/components/FolderViewToggle.jsx
import { useDispatch, useSelector } from "react-redux";
import { setGridView, setListView, selectFolderViewMode } from "../foldersUI.slice";
import { TbList, TbGridDots } from "react-icons/tb";

export default function FolderViewToggle() {
  const dispatch = useDispatch();
  const viewMode = useSelector(selectFolderViewMode);

  return (
    <div className="flex gap-2">
      <button
        className={`px-2 py-1 rounded-l-md border ${
          viewMode === "list" 
            ? "bg-skyBlue text-white" 
            : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
        }`}
        onClick={() => dispatch(setListView())}
      >
        <TbList size={20} />
      </button>
      <button
        className={`px-2 py-1 rounded-r-md border ${
          viewMode === "grid" 
            ? "bg-skyBlue text-white" 
            : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
        }`}
        onClick={() => dispatch(setGridView())}
      >
        <TbGridDots size={20} />
      </button>
    </div>
  );
}