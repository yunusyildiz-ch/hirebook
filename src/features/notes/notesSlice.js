import { createSlice } from "@reduxjs/toolkit";
import {
  loadNotes,
  addNoteThunk,
  updateNoteThunk,
  deleteNoteThunk,
} from "./notesThunks";

const initialState = {
  notes: [],
  loading: false,
  error: null,
  selectedNote: null,
  activeTab: "All",
  viewMode: "list",
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setSelectedNote(state, action) {
      state.selectedNote = action.payload;
    },
    clearSelectedNote(state) {
      state.selectedNote = null;
    },
    setActiveTab(state, action) {
      state.activeTab = action.payload;
    },
    setViewMode(state, action) {
      state.viewMode = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // 🔄 Load Notes
      .addCase(loadNotes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = action.payload; // timestamps already formatted in service
      })
      .addCase(loadNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load notes";
      })

      // ➕ Add Note
      .addCase(addNoteThunk.fulfilled, (state, action) => {
        state.notes.unshift({
          id: action.payload.id,
          text: action.payload.text,
          createdAt: new Date().toISOString(), // ✅ serialized
        });
      })

      // ✏️ Update Note
      .addCase(updateNoteThunk.fulfilled, (state, action) => {
        const index = state.notes.findIndex(
          (note) => note.id === action.payload.id
        );
        if (index !== -1) {
          state.notes[index].text = action.payload.text;
          state.notes[index].updatedAt = new Date().toISOString(); // ✅ serialized
        }
      })

      // 🗑️ Delete Note
      .addCase(deleteNoteThunk.fulfilled, (state, action) => {
        state.notes = state.notes.filter((note) => note.id !== action.payload);
      });
  },
});

export const {
  setSelectedNote,
  clearSelectedNote,
  setViewMode,
  setActiveTab,
} = notesSlice.actions;

export default notesSlice.reducer;
