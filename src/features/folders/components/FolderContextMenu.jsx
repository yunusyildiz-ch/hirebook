import { useContext } from "react";
import { TbEdit, TbTrash, TbPalette, TbFolder } from "react-icons/tb";
import { FolderMenuContext } from "@/contexts/FolderMenuContext";
import { useDispatch } from "react-redux";
import { deleteFolderThunk } from "../foldersThunks";
import { showSuccess, showError } from "@/utils/toastUtils";
import { createPortal } from "react-dom";

export default function FolderContextMenu({ onRename, onChangeColor }) {
  const dispatch = useDispatch();
  const { menuVisible, menuPosition, selectedFolder, closeMenu } = useContext(FolderMenuContext);

  if (!menuVisible || !selectedFolder) return null;

  const handleDelete = async () => {
    try {
      await dispatch(deleteFolderThunk(selectedFolder.id));
      closeMenu();
    } catch (error) {
      showError("Failed to delete folder");
    }
  };

  return createPortal(
    <div
      className="dropdown-menu fixed bg-white dark:bg-gray-800 rounded-md shadow-md p-1 z-50 text-sm"
      style={{ top: `${menuPosition.y}px`, left: `${menuPosition.x}px` }}
    >
      <div
        className="flex items-center gap-2 px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-all cursor-pointer"
        onClick={onRename}
      >
        <TbEdit className="text-gray-600 dark:text-gray-300" size={16} /> Rename
      </div>
      <div
        className="flex items-center gap-2 px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-all cursor-pointer"
        onClick={onChangeColor}
      >
        <TbPalette className="text-gray-600 dark:text-gray-300" size={16} /> Change Color
      </div>
      <div
        className="flex items-center gap-2 px-3 py-2 text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-all cursor-pointer"
        onClick={handleDelete}
      >
        <TbTrash className="text-red-600 dark:text-red-400" size={16} /> Delete
      </div>
      <div
        className="flex items-center gap-2 px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-all cursor-pointer"
        onClick={closeMenu}
      >
        <TbFolder className="text-gray-600 dark:text-gray-300" size={16} /> Open
      </div>
    </div>,
    document.body
  );
}