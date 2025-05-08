// 📂 src/features/folders/components/FoldersList.jsx
import { useSelector } from "react-redux";
import FolderCard from "./FolderCard";
import { selectAllFolders } from "../foldersSelectors";

export default function FoldersList() {
  const folders = useSelector(selectAllFolders);

  if (folders.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500 dark:text-gray-300">
        No folders found. Create a new folder to get started.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
      {folders.map((folder) => (
        <FolderCard key={folder.id} folder={folder} />
      ))}
    </div>
  );
}