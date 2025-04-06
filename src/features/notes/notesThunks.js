// src/features/notes/notesThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addNote,
  updateNote,
  deleteNote,
  subscribeToNotes,
} from "@/services/notesService";

// ✅ Load notes from Firestore (real-time)
export const loadNotes = createAsyncThunk(
  "notes/loadNotes",
  async (userId, { rejectWithValue }) => {
    try {
      return await new Promise((resolve, reject) => {
        const unsubscribe = subscribeToNotes(userId, (notes) => {
          resolve(notes);
        });
        // Not: unsubscribe referansını burada saklayabilirsin, ileri düzey temizlik için
      });
    } catch (error) {
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
      return { id: docRef.id, text }; // Optionally return for optimistic update
    } catch (error) {
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
      return { id, text };
    } catch (error) {
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
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);