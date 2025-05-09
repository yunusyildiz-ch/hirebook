import { TbDotsVertical } from "react-icons/tb";
import { useContext, useState } from "react";
import { FolderMenuContext } from "@/contexts/FolderMenuContext";
import FolderIcon from "./FolderIcon";
import FolderContextMenu from "./FolderContextMenu";

export default function FolderCard({ folder }) {
  const { openMenu, closeMenu } = useContext(FolderMenuContext);
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
    if (showMenu) {
      closeMenu();
    } else {
      openMenu(folder);
    }
  };

  return (
    <div className="group relative p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-all duration-300 border border-gray-200 dark:border-gray-700 cursor-pointer">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FolderIcon color={folder.color} />
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-gray-800 dark:text-white">
              {folder.title}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {new Date(folder.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
        {/* Üç Nokta Menü */}
        <button className="p-1 rounded hover:bg-gray-200" onClick={toggleMenu}>
          <TbDotsVertical size={20} />
        </button>
      </div>
      {/* Dropdown Menü */}
      {showMenu && <FolderContextMenu />}
    </div>
  );
}