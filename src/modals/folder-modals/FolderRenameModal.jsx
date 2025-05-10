import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { saveRenamedFolder } from "@utils/folderActions";

export default function FolderRenameModal({ folder, onClose }) {
  const dispatch = useDispatch();
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    if (folder && folder.title) {
      setNewTitle(folder.title);  
    }
  }, [folder]);

  const handleSave = async () => {
    if (newTitle.trim() === "") return;
    console.log("Handle Save: ", folder?.id, newTitle);
    if (!folder?.id) {
      console.error("Error: Folder ID is undefined!");
      return;
    }
    await saveRenamedFolder(dispatch, folder.id, newTitle);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-md w-full max-w-xs">
        <h3 className="text-lg font-semibold mb-2">Rename Folder</h3>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="w-full p-2 border rounded-md mb-3"
          placeholder="Enter new folder name"
        />
        <div className="flex justify-end gap-2">
          <button className="px-3 py-1 bg-gray-300 rounded" onClick={onClose}>Cancel</button>
          <button className="px-3 py-1 bg-blue-500 text-white rounded" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
}