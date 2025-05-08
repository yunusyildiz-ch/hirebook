// 📂 src/features/folders/components/FolderCard.jsx
import { TbFolder, TbEdit, TbTrash } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { deleteFolderThunk } from "../foldersThunks";
import { showSuccess, showError } from "@/utils/toastUtils";

export default function FolderCard({ folder }) {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      await dispatch(deleteFolderThunk(folder.id));
      showSuccess("Folder deleted");
    } catch (error) {
      showError("Failed to delete folder");
    }
  };

  return (
    <div
      className={`group relative p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-all duration-300 border border-gray-200 dark:border-gray-700`}
    >
      <div className="flex items-center gap-3">
        <TbFolder size={40} className={`text-${folder.color}-500`} />
        <div className="flex flex-col">
          <span className="text-lg font-semibold text-gray-800 dark:text-white">
            {folder.title}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {new Date(folder.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          title="Edit Folder"
        >
          <TbEdit size={20} />
        </button>
        <button
          className="p-1 rounded text-red-600 hover:bg-gray-200 dark:hover:bg-gray-700"
          title="Delete Folder"
          onClick={handleDelete}
        >
          <TbTrash size={20} />
        </button>
      </div>
    </div>
  );
}