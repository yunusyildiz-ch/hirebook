import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeTab: "All",
  viewMode: "list", // list | view | edit
  previousViewMode: "list", // ⭐️ 
  searchTerm: "",
  loading: false,
  error: null,
};

const notesUISlice = createSlice({
  name: "notesUI",
  initialState,
  reducers: {
    setViewMode(state, action) {
      state.previousViewMode = state.viewMode;
      state.viewMode = action.payload;
    },
    setActiveTab(state, action) {
      state.activeTab = action.payload;
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    resetUI(state) {
      state.viewMode = "list";
      state.previousViewMode = "list";
      state.activeTab = "All";
      state.searchTerm = "";
    },
  },
});

export const { setViewMode, setActiveTab, setSearchTerm, resetUI } = notesUISlice.actions;
export default notesUISlice.reducer;