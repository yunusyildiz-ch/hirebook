// 📂 src/features/folders/foldersUI.slice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeTab: "All",
  viewMode: "grid",  // Default olarak grid görünümü
  searchTerm: "",
};

const foldersUISlice = createSlice({
  name: "foldersUI",
  initialState,
  reducers: {
    // 📂 Grid görünümünü ayarla
    setGridView(state) {
      state.viewMode = "grid";
    },
    // 📋 Liste görünümünü ayarla
    setListView(state) {
      state.viewMode = "list";
    },
    // 🔖 Aktif sekmeyi ayarla
    setActiveFolderTab(state, action) {
      state.activeTab = action.payload;
    },
    // 🔍 Arama terimini ayarla
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
  },
});

export const {
  setGridView,
  setListView,
  setActiveFolderTab,
  setSearchTerm,
} = foldersUISlice.actions;

export default foldersUISlice.reducer;

// 🌟 Seçiciler (Selectors)
export const selectActiveFolderTab = (state) => state.foldersUI.activeTab;
export const selectFolderViewMode = (state) => state.foldersUI.viewMode;
export const selectSearchTerm = (state) => state.foldersUI.searchTerm;