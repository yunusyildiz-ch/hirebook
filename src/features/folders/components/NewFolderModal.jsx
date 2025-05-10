import { useState } from "react";
import { useDispatch } from "react-redux";
import { addFolderThunk } from "../foldersThunks";
import { toast } from "react-hot-toast";
import { auth } from "@/services/firebase/config";

export default function NewFolderModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const [folderName, setFolderName] = useState("");
  const [color, setColor] = useState("#2196f3"); // Default blue color

  const handleAddFolder = async () => {
    if (!folderName.trim()) {
      toast.error("Folder name cannot be empty.");
      return;
    }
  
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) throw new Error("User not authenticated");
  
      await dispatch(addFolderThunk({ title: folderName, color, userId }));
      onClose();
    } catch (error) {
      toast.error(error.message || "Error creating folder");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full shadow-xl space-y-4">
        <h2 className="text-lg font-semibold">Create New Folder</h2>

        <input
          type="text"
          placeholder="Folder Name"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          className="w-full px-3 py-2 rounded-md border dark:bg-gray-900"
        />

        <label className="text-sm">Choose Folder Color:</label>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-full h-10 p-0 border rounded-md cursor-pointer"
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 text-gray-600 dark:text-gray-300">
            Cancel
          </button>
          <button
            onClick={handleAddFolder}
            className="px-4 py-2 bg-skyBlue text-white rounded-md"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}