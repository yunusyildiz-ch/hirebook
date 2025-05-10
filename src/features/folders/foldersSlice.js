// foldersSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  folders: [],
  selectedFolder: null,
  renameModalOpen: false,
  colorModalOpen: false,  // ✅ Renk modalı açık mı?
  deleteModalOpen: false, // ✅ Silme modalı açık mı?
};

const foldersSlice = createSlice({
  name: "folders",
  initialState,
  reducers: {
    setFolders: (state, action) => {
      state.folders = action.payload;
    },
    setSelectedFolder: (state, action) => {
      state.selectedFolder = action.payload;
    },
    setRenameModalOpen: (state, action) => {
      state.renameModalOpen = action.payload;
    },
    setColorModalOpen: (state, action) => {
      state.colorModalOpen = action.payload;
    },
    setDeleteModalOpen: (state, action) => {
      state.deleteModalOpen = action.payload;
    },
  },
});

export const {
  setFolders,
  setSelectedFolder,
  setRenameModalOpen,
  setColorModalOpen,
  setDeleteModalOpen,
} = foldersSlice.actions;

export default foldersSlice.reducer;



