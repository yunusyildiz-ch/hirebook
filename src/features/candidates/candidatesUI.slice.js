// src/features/candidates/candidatesUI.slice.js

import { createSlice } from "@reduxjs/toolkit";

// UI-related state for Candidates feature
const initialState = {
  activeTab: "All",              // Current active tab
  searchTerm: "",                // Search input value (used globally now)
  selectedCandidate: null,       // Currently selected candidate
  viewMode: "list",              // View mode: list | view | edit
};

const candidatesUISlice = createSlice({
  name: "candidatesUI",
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSelectedCandidate: (state, action) => {
      state.selectedCandidate = action.payload;
    },
    clearSelectedCandidate: (state) => {
      state.selectedCandidate = null;
    },
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    },
  },
});

export const {
  setActiveTab,
  setSearchTerm,
  setSelectedCandidate,
  clearSelectedCandidate,
  setViewMode,
} = candidatesUISlice.actions;

export default candidatesUISlice.reducer;