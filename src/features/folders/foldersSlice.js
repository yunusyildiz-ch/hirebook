import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  folders: [],
  selectedFolder: null,
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
    clearSelectedFolder: (state) => {
      state.selectedFolder = null;
    },
  },
});

export const { setFolders, addFolder, clearSelectedFolder } = foldersSlice.actions;
export default foldersSlice.reducer;