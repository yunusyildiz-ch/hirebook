import { createSlice } from "@reduxjs/toolkit";
import { loadNotes } from "./notesThunks";

const initialState = {
  activeTab: "All",
  viewMode: "list", // list | view | edit
  searchTerm: "",   // ✅ NEW
  loading: false,
  error: null,
};

const notesUISlice = createSlice({
  name: "notesUI",
  initialState,
  reducers: {
    setViewMode(state, action) {
      state.viewMode = action.payload;
    },
    setActiveTab(state, action) {
      state.activeTab = action.payload;
    },
    setSearchTerm(state, action) {     // ✅ NEW
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadNotes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadNotes.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(loadNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load notes";
      });
  },
});

export const { setViewMode, setActiveTab, setSearchTerm } = notesUISlice.actions;
export default notesUISlice.reducer;