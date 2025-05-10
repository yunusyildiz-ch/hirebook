import { createSlice } from "@reduxjs/toolkit";
import { updateFolderThunk } from "./foldersThunks";

const initialState = {
  folders: [],
  selectedFolder: null,
  renameModalOpen: false,
  colorModalOpen: false,
};

const foldersSlice = createSlice({
  name: "folders",
  initialState,
  reducers: {
    setFolders: (state, action) => {
      state.folders = action.payload;
    },
    addFolder: (state, action) => {
      state.folders.push(action.payload);
    },
    setSelectedFolder: (state, action) => {
      if (action.payload && action.payload.id) {
        state.selectedFolder = action.payload;
      }
    },
    clearSelectedFolder: (state) => {
      state.selectedFolder = null;
    },
    setRenameModalOpen: (state, action) => {
      state.renameModalOpen = action.payload;
    },
    setColorModalOpen: (state, action) => {
      state.colorModalOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateFolderThunk.fulfilled, (state, action) => {
      const index = state.folders.findIndex((f) => f.id === action.payload.id);
      if (index !== -1) {
        state.folders[index] = { ...state.folders[index], ...action.payload };
      }
    });
  },
});

export const {
  setFolders,
  addFolder,
  setSelectedFolder,
  clearSelectedFolder,
  setRenameModalOpen,
  setColorModalOpen,
} = foldersSlice.actions;

export default foldersSlice.reducer;
