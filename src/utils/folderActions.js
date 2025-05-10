import { showSuccess, showError } from "@utils/toastUtils";
import { deleteFolderThunk, updateFolderThunk } from "@folders/foldersThunks";
import { setSelectedFolder, setRenameModalOpen, setColorModalOpen } from "@folders/foldersSlice";

// 📝 Rename Folder
export const handleRename = (dispatch, folder, closeMenu) => {
  closeMenu();
  dispatch(setSelectedFolder({ ...folder }));
  dispatch(setRenameModalOpen(true));
};

// 🎨 Change Folder Color
export const handleChangeColor = (dispatch, folder, closeMenu) => {
  closeMenu();
  dispatch(setSelectedFolder(folder));
  dispatch(setColorModalOpen(true));
};

// ❌ Delete Folder (Confirmed)
export const handleDelete = async (dispatch, folder, closeMenu, openConfirmModal) => {
  closeMenu();
  const confirm = await openConfirmModal("Delete Folder", "Are you sure you want to delete this folder?");
  if (confirm) {
    try {
      await dispatch(deleteFolderThunk(folder.id));
      showSuccess("Folder deleted.");
    } catch (error) {
      showError("Failed to delete folder.");
    }
  }
};

// 📂 Open Folder (Console Log for now)
export const handleOpen = async (dispatch, folder) => {
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