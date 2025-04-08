import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addNote,
  updateNote,
  deleteNote,
  subscribeToNotes,
} from "@/services/notesService";
import { showSuccess, showError } from "@/utils/toastUtils";

// 📌 Utility for consistent error handling
const handleThunkError = (error, rejectWithValue, fallbackMessage) => {
  const message = error.message || fallbackMessage;
  showError(message);
  return rejectWithValue(message);
};

// 🔄 Load Notes (with real-time subscription)
export const loadNotes = createAsyncThunk(
  "notes/loadNotes",
  async (userId, { rejectWithValue }) => {
    try {
      return await new Promise((resolve) => {
        const unsubscribe = subscribeToNotes(userId, (notes) => {
          resolve(notes); // Note: we ignore unsubscribe for now
        });
      });
    } catch (error) {
      return handleThunkError(error, rejectWithValue, "Failed to load notes");
    }
  }
);

// ➕ Add Note
export const addNoteThunk = createAsyncThunk(
  "notes/addNote",
  async ({ title, text }, { rejectWithValue }) => {
    try {
      const docRef = await addNote({ title, text });
      showSuccess("Note added");
      return { id: docRef.id, title, text };
    } catch (error) {
      return handleThunkError(error, rejectWithValue, "Failed to add note");
    }
  }
);

// ✏️ Update Note
export const updateNoteThunk = createAsyncThunk(
  "notes/updateNote",
  async ({ id, title, text }, { rejectWithValue }) => {
    try {
      await updateNote(id, { title, text });
      showSuccess("Note updated");
      return { id, title, text };
    } catch (error) {
      return handleThunkError(error, rejectWithValue, "Failed to update note");
    }
  }
);

// 🗑️ Delete Note
export const deleteNoteThunk = createAsyncThunk(
  "notes/deleteNote",
  async (id, { rejectWithValue }) => {
    try {
      await deleteNote(id);
      showSuccess("Note deleted");
      return id;
    } catch (error) {
      return handleThunkError(error, rejectWithValue, "Failed to delete note");
    }
  }
);
