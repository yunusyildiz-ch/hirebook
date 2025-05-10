import { useSelector } from "react-redux";
import FolderCard from "./FolderCard";
import { selectAllFolders } from "../foldersSelectors";
import { selectFolderViewMode } from "../foldersUI.slice";

export default function FoldersList() {
  const folders = useSelector(selectAllFolders);
  const viewMode = useSelector(selectFolderViewMode);

  if (folders.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500 dark:text-gray-300">
        No folders found. Create a new folder to get started.
      </div>
    );
  }

  return (
    <div
      className={`p-6 ${
        viewMode === "grid"
          ? "grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4"
          : "flex flex-col gap-2"
      }`}
    >
      {folders.map((folder) => (
        <FolderCard key={folder.id} folder={folder} viewMode={viewMode} />
      ))}
    </div>
  );
}