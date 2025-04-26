import { createSlice } from "@reduxjs/toolkit";

// UI-related state for Candidates feature
const initialState = {
  activeTab: "All",
  searchTerm: "",
  selectedCandidate: null,
  viewMode: "list",          // list | view | edit
  previousViewMode: "list", 
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
      state.previousViewMode = state.viewMode;
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