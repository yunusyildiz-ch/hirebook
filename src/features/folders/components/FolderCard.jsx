import { TbDotsVertical } from "react-icons/tb";
import { useContext, useState } from "react";
import { FolderMenuContext } from "@/contexts/FolderMenuContext";
import FolderIcon from "./FolderIcon";
import FolderContextMenu from "./FolderContextMenu";

export default function FolderCard({ folder, viewMode }) {
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
    <div
      className={`group relative p-2 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-all duration-300 border border-gray-200 dark:border-gray-700 cursor-pointer ${
        viewMode === "list" ? "flex items-center justify-between gap-4" : "p-4"
      }`}
    >
      {/* Üç Nokta Menü - Sağ Üst Köşe */}
<button
  className={`absolute ${
    viewMode === "list" ? "top-1/2 -translate-y-1/2 right-2" : "top-2 right-2"
  } p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 z-10`}
  onClick={toggleMenu}
>
  <TbDotsVertical size={18} />
</button>

      <div
        className={`flex items-center gap-2 ${
          viewMode === "list" ? "flex-1" : "flex-col items-center text-center"
        }`}
      >
        <FolderIcon color={folder.color} />
        <div
          className={`flex flex-col ${
            viewMode === "grid" ? "items-center" : ""
          }`}
        >
          {/* Klasör Adı (Kısaltılmış ve Tooltip) */}
          <span
            className={`text-md text-gray-800 dark:text-white truncate ${
              viewMode === "list" ? "max-w-[300px]" : "max-w-[100px] text-center"
            }`}
            title={folder.title} // Tam klasör adını görmek için
          >
            {folder.title}
          </span>
          {/* Tarih Bilgisi */}
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {new Date(folder.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
      {showMenu && <FolderContextMenu />}
    </div>
  );
}