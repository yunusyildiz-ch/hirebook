import { useState } from "react";
import { useDispatch } from "react-redux";
import { addFolderThunk } from "../foldersThunks";
import { toast } from "react-hot-toast";
import { auth } from "@/services/firebase/config";

// 📌 Folders Colors
const folderColors = [
  { name: "Gray", hex: "#9e9e9e" },
  { name: "Blue", hex: "#2196f3" },
  { name: "Green", hex: "#4caf50" },
  { name: "Yellow", hex: "#ffeb3b" },
  { name: "Red", hex: "#f44336" },
  
];

export default function NewFolderModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const [folderName, setFolderName] = useState("");
  const [selectedColor, setSelectedColor] = useState(folderColors[0].hex); // default: gray

  const handleAddFolder = async () => {
    if (!folderName.trim()) {
      toast.error("Folder name cannot be empty.");
      return;
    }

    try {
      const userId = auth.currentUser?.uid;
      if (!userId) throw new Error("User not authenticated");

      await dispatch(addFolderThunk({ title: folderName, color: selectedColor, userId }));
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
        <div className="flex gap-2 mb-4">
          {folderColors.map((color) => (
            <div
              key={color.name}
              onClick={() => setSelectedColor(color.hex)}
              className={`w-8 h-8 rounded-full cursor-pointer border-2 ${
                selectedColor === color.hex
                  ? "border-blue-500 shadow-md"
                  : "border-gray-300"
              }`}
              style={{ backgroundColor: color.hex }}
            />
          ))}
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleAddFolder}
            className="px-4 py-2 bg-skyBlue text-white rounded-md hover:bg-blue-600"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}