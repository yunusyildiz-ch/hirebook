import { createContext, useState, useCallback } from "react";

export const FolderMenuContext = createContext();

export function FolderMenuProvider({ children }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(null);

  const openMenu = useCallback((folder) => {
    setMenuVisible(true);
    setSelectedFolder(folder);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuVisible(false);
  }, []);

  return (
    <FolderMenuContext.Provider
      value={{ menuVisible, selectedFolder, openMenu, closeMenu }}
    >
      {children}
    </FolderMenuContext.Provider>
  );
}