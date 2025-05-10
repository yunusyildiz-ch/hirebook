import { TbEdit, TbTrash, TbPalette, TbFolder } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { createPortal } from "react-dom";
import {
  handleRename,
  handleChangeColor,
  handleDelete,
  handleOpen,
} from "@utils/folderActions";

export default function FolderOptionsMenu({ folder, position, closeMenu }) {
  const dispatch = useDispatch();

  return createPortal(
    <div
      className="options-menu fixed bg-white dark:bg-gray-800 rounded-md shadow-md p-1 z-50 text-sm"
      style={{ top: `${position.y}px`, left: `${position.x}px` }}
    >
      <div
        className="flex items-center gap-2 px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-all cursor-pointer"
        onClick={() => handleRename(dispatch, folder, closeMenu)}
      >
        <TbEdit size={16} /> Rename
      </div>
      <div
        className="flex items-center gap-2 px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-all cursor-pointer"
        onClick={() => handleChangeColor(dispatch, folder, closeMenu)}
      >
        <TbPalette size={16} /> Change Color
      </div>
      <div
        className="flex items-center gap-2 px-3 py-2 text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-all cursor-pointer"
        onClick={() => handleDelete(dispatch, folder, closeMenu)}
      >
        <TbTrash size={16} /> Delete
      </div>
      <div
        className="flex items-center gap-2 px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-all cursor-pointer"
        onClick={() => handleOpen(dispatch, folder, closeMenu)}
      >
        <TbFolder size={16} /> Open
      </div>
    </div>,
    document.body
  );
}

