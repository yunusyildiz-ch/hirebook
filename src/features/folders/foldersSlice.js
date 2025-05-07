import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  folders: [],
  selectedFolder: null,
};

const foldersSlice = createSlice({
  name: "folders",
  initialState,
  reducers: {
    addFolder: (state, action) => {
      state.folders.push(action.payload);
    },
    clearSelectedFolder: (state) => {
      state.selectedFolder = null;
    },
  },
});

export const { addFolder, clearSelectedFolder } = foldersSlice.actions;
export default foldersSlice.reducer;