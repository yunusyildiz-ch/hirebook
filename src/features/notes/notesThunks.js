import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addNote,
  updateNote,
  deleteNote,
  subscribeToNotes,
} from "@/services/notesService";
import { showSuccess, showError } from "@/utils/toastUtils";

// Load Notes
export const loadNotes = createAsyncThunk(
  "notes/loadNotes",
  async (userId, { rejectWithValue }) => {
    try {
      return await new Promise((resolve) => {
        const unsubscribe = subscribeToNotes(userId, (notes) => {
          resolve(notes);
        });
      });
    } catch (error) {
      showError("Failed to load notes");
      return rejectWithValue(error.message);
    }
  }
);

// Add Note
export const addNoteThunk = createAsyncThunk(
  "notes/addNote",
  async ({ title, text }, { rejectWithValue }) => {
    try {
      const docRef = await addNote({ title, text });
      showSuccess("Note added");
      return { id: docRef.id, title, text };
    } catch (error) {
      showError("Failed to add note");
      return rejectWithValue(error.message);
    }
  }
);

// Update Note
export const updateNoteThunk = createAsyncThunk(
  "notes/updateNote",
  async ({ id, title, text }, { rejectWithValue }) => {
    try {
      await updateNote(id, { title, text });
      showSuccess("Note updated");
      return { id, title, text };
    } catch (error) {
      showError("Failed to update note");
      return rejectWithValue(error.message);
    }
  }
);

// Delete Note
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