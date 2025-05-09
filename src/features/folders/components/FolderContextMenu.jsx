import { useContext } from "react";
import { TbEdit, TbTrash, TbPalette, TbFolder } from "react-icons/tb";
import { FolderMenuContext } from "@/contexts/FolderMenuContext";
import { useDispatch } from "react-redux";
import { deleteFolderThunk } from "../foldersThunks";
import { showSuccess, showError } from "@/utils/toastUtils";
import "@/styles/folder-menu.css";

export default function FolderContextMenu({ onRename, onChangeColor }) {
  const dispatch = useDispatch();
  const { menuVisible, selectedFolder, closeMenu } = useContext(FolderMenuContext);

  if (!menuVisible || !selectedFolder) return null;

  const handleDelete = async () => {
    try {
      await dispatch(deleteFolderThunk(selectedFolder.id));
      showSuccess("Folder deleted");
      closeMenu();
    } catch (error) {
      showError("Failed to delete folder");
    }
  };

  return (
    <div className="dropdown-menu">
      <div className="menu-item" onClick={onRename}>
        <TbEdit className="mr-2" /> Rename
      </div>
      <div className="menu-item" onClick={onChangeColor}>
        <TbPalette className="mr-2" /> Change Color
      </div>
      <div className="menu-item text-red-600" onClick={handleDelete}>
        <TbTrash className="mr-2" /> Delete
      </div>
      <div className="menu-item" onClick={closeMenu}>
        <TbFolder className="mr-2" /> Open
      </div>
    </div>
  );
}