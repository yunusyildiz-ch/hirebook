// src/components/FolderColorModal.jsx
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { saveFolderColor } from "@utils/folderActions";
import { Check } from "lucide-react";

const colors = ["#9e9e9e", "#2196f3", "#4caf50", "#ffeb3b", "#f44336"];

export default function FolderColorModal({ folder, onClose }) {
  const dispatch = useDispatch();
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  useEffect(() => {
    if (folder?.color) {
      setSelectedColor(folder.color);
    }
  }, [folder]);

  const handleSave = async () => {
    await saveFolderColor(dispatch, folder.id, selectedColor);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl w-full max-w-sm space-y-4">
        <h2 className="text-lg font-semibold">Change Folder Color</h2>
        <div className="flex gap-2">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-150 ${
                selectedColor === color ? "shadow-md" : "shadow-sm"
              }`}
              style={{ backgroundColor: color }}
            >
              {selectedColor === color && (
                <Check size={18} className="text-white" />
              )}
            </button>
          ))}
        </div>
        <div className="flex justify-end gap-2">
          <button 
            onClick={onClose} 
            className="text-sm px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave} 
            className="text-sm px-4 py-1 rounded-lg bg-skyBorder text-white hover:bg-skyBlue transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}



