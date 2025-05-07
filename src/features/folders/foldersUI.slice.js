import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeTab: "All",
  viewMode: "list", // list | edit
  searchTerm: "", 
};

const foldersUISlice = createSlice({
  name: "foldersUI",
  initialState,
  reducers: {
    setFolderViewMode(state, action) {
      state.viewMode = action.payload;
    },
    setActiveFolderTab(state, action) {
      state.activeTab = action.payload;
    },
    setSearchTerm(state, action) {  
      state.searchTerm = action.payload;
    },
  },
});

export const { setFolderViewMode, setActiveFolderTab, setSearchTerm } = foldersUISlice.actions;
export default foldersUISlice.reducer;