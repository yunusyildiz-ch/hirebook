export const selectFoldersState = (state) => state.folders;

export const selectAllFolders = (state) => state.folders.folders;

export const selectSelectedFolder = (state) => state.folders.selectedFolder;

export const selectFolderViewMode = (state) => state.foldersUI.viewMode;

export const selectActiveFolderTab = (state) => state.foldersUI.activeTab;

export const selectFoldersSearchTerm = (state) => state.foldersUI.searchTerm;