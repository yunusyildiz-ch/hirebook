import { createContext, useState, useCallback, useEffect } from "react";

export const FolderMenuContext = createContext();

export function FolderMenuProvider({ children }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [selectedFolder, setSelectedFolder] = useState(null);

  const openMenu = useCallback((event, folder) => {
    event.preventDefault();

    const buttonRect = event.currentTarget.getBoundingClientRect();
    const x = buttonRect.left + window.scrollX;
    const y = buttonRect.bottom + window.scrollY;

    setMenuPosition({ x, y });
    setMenuVisible(true);
    setSelectedFolder(folder);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuVisible(false);
  }, []);

  // Menü dışına tıklanınca kapat
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-menu")) {
        closeMenu();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeMenu]);

  return (
    <FolderMenuContext.Provider
      value={{ menuVisible, menuPosition, selectedFolder, openMenu, closeMenu }}
    >
      {children}
    </FolderMenuContext.Provider>
  );
}