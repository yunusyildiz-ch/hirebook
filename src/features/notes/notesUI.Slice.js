import { createSlice } from "@reduxjs/toolkit";
import { loadNotes } from "./notesThunks";

const initialState = {
  loading: false,
  error: null,
  activeTab: "All", // All | Folders | New
  viewMode: "list", // list | view | edit
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

export const { setViewMode, setActiveTab } = notesUISlice.actions;
export default notesUISlice.reducer;
