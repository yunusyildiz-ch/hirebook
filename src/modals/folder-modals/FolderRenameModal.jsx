import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { saveRenamedFolder } from "@utils/folderActions";

export default function FolderRenameModal({ folder, onClose }) {
  const dispatch = useDispatch();
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    if (folder?.title) {
      setNewTitle(folder.title);
    }
  }, [folder]);

  const handleSave = async () => {
    if (!newTitle.trim()) return;
    await saveRenamedFolder(dispatch, folder.id, newTitle);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-md w-full max-w-xs">
        <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
          Rename Folder
        </h3>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="w-full p-2 border rounded-md mb-3 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter new folder name"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-400 dark:hover:bg-gray-700 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-3 py-1 bg-blue-500 dark:bg-blue-600 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-700 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}


