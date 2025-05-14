import { useState, useEffect,useRef } from "react";
import { useDispatch } from "react-redux";
import { saveRenamedFolder } from "@utils/folderActions";

export default function FolderRenameModal({ folder, onClose }) {
  const dispatch = useDispatch();
  const [newTitle, setNewTitle] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (folder?.title) {
      setNewTitle(folder.title);
    }
    inputRef.current?.focus();
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
        ref={inputRef}
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
           className="w-full p-1 border-b-2 border-gray-300 dark:border-gray-600 bg-transparent text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-skyBorder transition"
          placeholder="Enter new folder name"
        />
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
           className="text-sm px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className=" text-sm  px-4 py-1 rounded-lg bg-skyBorder text-white hover:bg-skyBlue transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}


