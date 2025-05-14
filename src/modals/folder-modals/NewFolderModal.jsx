// src/components/NewFolderModal.jsx
import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addFolderThunk } from "../../features/folders/foldersThunks";
import { toast } from "react-hot-toast";
import { auth } from "@/services/firebase/config";
import { Check } from "lucide-react";

// 📌 Folder Colors
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
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

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

        {/* 📝 Folder Name Input */}
        <input
          ref={inputRef}
          type="text"
          placeholder="Folder Name"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          className="w-full p-2 border-b-2 border-gray-300 dark:border-gray-600 bg-transparent text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-skyBorder transition"
        />

        <label className="text-sm">Choose Folder Color:</label>
        <div className="flex gap-2 mb-4">
          {folderColors.map((color) => (
            <button
              key={color.name}
              onClick={() => setSelectedColor(color.hex)}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-150 ${
                selectedColor === color.hex ? "shadow-md" : "shadow-sm"
              }`}
              style={{ backgroundColor: color.hex }}
            >
              {selectedColor === color.hex && (
                <Check size={18} className="text-white" />
              )}
            </button>
          ))}
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="text-sm px-4 py-1 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleAddFolder}
            className="text-sm px-4 py-1 rounded-lg bg-skyBorder text-white hover:bg-skyBlue transition"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
