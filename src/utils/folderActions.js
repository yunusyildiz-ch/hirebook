import { showSuccess, showError } from "@utils/toastUtils";
import { deleteFolderThunk, updateFolderThunk } from "@folders/foldersThunks";
import { setSelectedFolder, setRenameModalOpen, setColorModalOpen } from "@folders/foldersSlice";

// 📝 Rename Folder
export const handleRename = (dispatch, folder, closeMenu) => {
  if (closeMenu) closeMenu();
  dispatch(setSelectedFolder({ ...folder }));
  dispatch(setRenameModalOpen(true));
};

// 🎨 Change Folder Color
export const handleChangeColor = (dispatch, folder, closeMenu) => {
  if (closeMenu) closeMenu();
  dispatch(setSelectedFolder(folder));
  dispatch(setColorModalOpen(true));
};

// ❌ Delete Folder
export const handleDelete = async (dispatch, folder) => {
  if (!folder || !folder.id) {
    console.warn("⚠️ [handleDelete] Invalid folder data:", folder);
    return;
  }
  try {
    const result = await dispatch(deleteFolderThunk(folder.id));
    if (result.error) {
      showError("Failed to delete folder.");
      return;
    }
    showSuccess("Folder deleted.");
  } catch (error) {
    showError("Failed to delete folder.");
  }
};

// 📂 Open Folder
export const handleOpen = async (dispatch, folder, closeMenu) => {
  if (closeMenu) closeMenu();
  try {
    showSuccess(`Opening folder: ${folder.title}`);
  } catch (error) {
    showError("Failed to open folder.");
  }
};

// ✅ Save Renamed Folder
export const saveRenamedFolder = async (dispatch, folderId, newTitle) => {
  try {
    const result = await dispatch(updateFolderThunk({ id: folderId, title: newTitle }));
    if (result.error) throw new Error(result.error.message);
    showSuccess("Folder renamed successfully.");
  } catch (error) {
    showError("Failed to rename folder.");
  }
};

// 🌈 Save Changed Color
export const saveFolderColor = async (dispatch, folderId, newColor) => {
    try {
      await dispatch(updateFolderThunk({ id: folderId, color: newColor }));
      showSuccess("Folder color updated successfully.");
    } catch (error) {
      showError("Failed to change folder color.");
    }
  };
  

