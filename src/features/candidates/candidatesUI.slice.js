import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeTab: "All",            // All | Shortlisted | New
  viewMode: "list",
  selectedCandidate: null,
};

const candidatesUISlice = createSlice({
  name: "candidatesUI",
  initialState,
  reducers: {
    setActiveTab(state, action) {
      state.activeTab = action.payload;
    },
    setViewMode(state, action) {
      state.viewMode = action.payload;
    },
    setSelectedCandidate(state, action) {
      state.selectedCandidate = action.payload;
    },
    clearSelectedCandidate(state) {
      state.selectedCandidate = null;
    },
    resetCandidateUI(state) {
      state.activeTab = "All";
      state.viewMode = "list";
      state.selectedCandidate = null;
    },
  },
});

export const {
  setActiveTab,
  setViewMode,
  setSelectedCandidate,
  clearSelectedCandidate,
  resetCandidateUI,
} = candidatesUISlice.actions;

export default candidatesUISlice.reducer;