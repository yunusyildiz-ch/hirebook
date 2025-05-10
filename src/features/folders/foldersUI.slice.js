// 📂 src/features/folders/foldersUI.slice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeTab: "All",
  viewMode: "grid",  // Default olarak grid görünümü
  searchTerm: "",
  loading: false,
  error: null,
};

const foldersUISlice = createSlice({
  name: "foldersUI",
  initialState,
  reducers: {
    setGridView(state) {
      state.viewMode = "grid";
    },
    setListView(state) {
      state.viewMode = "list";
    },
    setActiveFolderTab(state, action) {
      state.activeTab = action.payload;
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const {
  setGridView,
  setListView,
  setActiveFolderTab,
  setSearchTerm,
  setLoading,
  setError,
} = foldersUISlice.actions;

export default foldersUISlice.reducer;