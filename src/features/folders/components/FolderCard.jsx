import { TbDotsVertical } from "react-icons/tb";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedFolder } from "../foldersSlice";
import { selectSelectedFolder, selectFolderViewMode } from "../foldersSelectors";
import FolderIcon from "./FolderIcon";
import FolderOptionsMenu from "./FolderOptionsMenu";

export default function FolderCard({ folder, onDelete }) {
  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const dispatch = useDispatch();
  const selectedFolder = useSelector(selectSelectedFolder);
  const viewMode = useSelector(selectFolderViewMode);

  const handleSelect = () => {
    dispatch(setSelectedFolder(folder));
  };

  const toggleMenu = (event) => {
    event.stopPropagation();
    const rect = event.currentTarget.getBoundingClientRect();
    setMenuPosition({ x: rect.left + window.scrollX, y: rect.bottom + window.scrollY });
    setShowMenu((prev) => !prev);
  };

  const handleOutsideClick = (event) => {
    if (!event.target.closest(".options-menu")) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div
      onClick={handleSelect}
      className={`group relative p-2 rounded-lg shadow hover:shadow-md transition-colors duration-150 border border-gray-200 dark:border-gray-700 cursor-pointer ${
        viewMode === "list" ? "flex items-center justify-between gap-4" : "p-4"
      } ${
        selectedFolder?.id === folder.id
          ? "bg-gray-100 dark:bg-gray-800"
          : "bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
      }`}
    >
      <button
        className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-150"
        onClick={toggleMenu}
      >
        <TbDotsVertical className="truncate  dark:text-white" size={18} />
      </button>

      <div className="flex items-center gap-2">
        <FolderIcon color={folder.color} />
        <span className="text-md truncate text-gray-900 dark:text-white">{folder.title}</span>
      </div>

      {showMenu && (
        <FolderOptionsMenu
          folder={folder}
          position={menuPosition}
          closeMenu={() => setShowMenu(false)}
          onDelete={onDelete}
        />
      )}
    </div>
  );
}

