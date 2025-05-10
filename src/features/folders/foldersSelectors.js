// -------- FOLDER STATE -------- //
export const selectFoldersState = (state) => state.folders;
export const selectAllFolders = (state) => state.folders.folders;
export const selectSelectedFolder = (state) => state.folders.selectedFolder;

// -------- UI STATE -------- //
export const selectFoldersUIState = (state) => state.foldersUI;
export const selectFolderViewMode = (state) => state.foldersUI.viewMode;
export const selectActiveFolderTab = (state) => state.foldersUI.activeTab;
export const selectFoldersSearchTerm = (state) => state.foldersUI.searchTerm;
export const selectFoldersLoading = (state) => state.foldersUI.loading;
export const selectFoldersError = (state) => state.foldersUI.error;

// -------- MODAL STATE -------- //
export const selectRenameModalOpen = (state) => state.folders.renameModalOpen;
export const selectColorModalOpen = (state) => state.folders.colorModalOpen;
export const selectDeleteModalOpen = (state) => state.folders.deleteModalOpen; // ✅ Yeni selector
