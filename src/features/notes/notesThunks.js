import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addNote,
  updateNote,
  deleteNote,
  subscribeToNotes,
} from "@/services/notesService";
import {
  showSuccess,
  showError,
} from "@/utils/toastUtils";

// ✅ Load notes from Firestore (real-time)
export const loadNotes = createAsyncThunk(
  "notes/loadNotes",
  async (userId, { rejectWithValue }) => {
    try {
      return await new Promise((resolve, reject) => {
        const unsubscribe = subscribeToNotes(userId, (notes) => {
          resolve(notes);
        });
        // Note: unsubscribe reference can be stored for cleanup if needed
      });
    } catch (error) {
      showError("Failed to load notes");
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Add new note
export const addNoteThunk = createAsyncThunk(
  "notes/addNote",
  async (text, { rejectWithValue }) => {
    try {
      const docRef = await addNote(text);
      showSuccess("Note added");
      return { id: docRef.id, text };
    } catch (error) {
      showError("Failed to add note");
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Update existing note
export const updateNoteThunk = createAsyncThunk(
  "notes/updateNote",
  async ({ id, text }, { rejectWithValue }) => {
    try {
      await updateNote(id, text);
      showSuccess("Note updated");
      return { id, text };
    } catch (error) {
      showError("Failed to update note");
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Delete note
export const deleteNoteThunk = createAsyncThunk(
  "notes/deleteNote",
  async (id, { rejectWithValue }) => {
    try {
      await deleteNote(id);
      showSuccess("Note deleted");
      return id;
    } catch (error) {
      showError("Failed to delete note");
      return rejectWithValue(error.message);
    }
  }
);