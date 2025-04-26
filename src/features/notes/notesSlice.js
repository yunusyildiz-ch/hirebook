import { createSlice } from "@reduxjs/toolkit";
import {
  loadNotes,
  addNoteThunk,
  updateNoteThunk,
  deleteNoteThunk,
} from "./notesThunks";
import { createEmptyNote } from "./noteModel";

const initialState = {
  notes: [],
  loading: false,
  error: null,
  selectedNote: null,
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
  },

  extraReducers: (builder) => {
    builder
      // Load notes
      .addCase(loadNotes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = action.payload;
      })
      .addCase(loadNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load notes";
      })

      // Add note
      .addCase(addNoteThunk.fulfilled, (state, action) => {
        const newNote = createEmptyNote({
          title: action.payload.title,
          text: action.payload.text || "",
        });
        newNote.id = action.payload.id;
        state.notes.unshift(newNote);
        state.selectedNote = newNote;
      })

      // Update note
      .addCase(updateNoteThunk.fulfilled, (state, action) => {
        const index = state.notes.findIndex((n) => n.id === action.payload.id);
        if (index !== -1) {
          state.notes[index].title = action.payload.title;
          state.notes[index].text = action.payload.text;
          state.notes[index].updatedAt = new Date().toISOString();

          if (state.selectedNote?.id === action.payload.id) {
            state.selectedNote = {
              ...state.notes[index],
            };
          }
        }
      })

      // Delete note
      .addCase(deleteNoteThunk.fulfilled, (state, action) => {
        state.notes = state.notes.filter((note) => note.id !== action.payload);
        if (state.selectedNote?.id === action.payload) {
          state.selectedNote = null;
        }
      });
  },
});

export const { setSelectedNote, clearSelectedNote } = notesSlice.actions;

export default notesSlice.reducer;