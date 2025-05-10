import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { saveFolderColor } from "@utils/folderActions";

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
              className={`w-8 h-8 rounded-full ${selectedColor === color ? "ring-2 ring-blue-500" : ""}`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded-md bg-gray-300">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 rounded-md bg-blue-600 text-white">Save</button>
        </div>
      </div>
    </div>
  );
}


