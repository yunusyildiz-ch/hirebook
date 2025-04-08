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
  activeTab: "All", // All | Folders | New (Header'dan gelir)
  viewMode: "list", // list | view | edit
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    // Seçili notu ayarla
    setSelectedNote(state, action) {
      state.selectedNote = action.payload;
    },

    // Seçimi kaldır
    clearSelectedNote(state) {
      state.selectedNote = null;
    },

    // Görüntüleme modunu ayarla
    setViewMode(state, action) {
      state.viewMode = action.payload;
    },

    // Aktif sekmeyi (All | Folders | New) ayarla
    setActiveTab(state, action) {
      state.activeTab = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder

      // 🔄 NOTLARI YÜKLE
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

      // ➕ YENİ NOT EKLE
      .addCase(addNoteThunk.fulfilled, (state, action) => {
        const newNote = {
          id: action.payload.id,
          text: action.payload.text || "",
          createdAt: new Date().toISOString(),
          updatedAt: null,
        };
        state.notes.unshift(newNote);
        state.selectedNote = newNote;
        state.viewMode = "edit";
      })

      // ✏️ NOTU GÜNCELLE
      .addCase(updateNoteThunk.fulfilled, (state, action) => {
        const index = state.notes.findIndex((n) => n.id === action.payload.id);
        if (index !== -1) {
          state.notes[index].text = action.payload.text;
          state.notes[index].updatedAt = new Date().toISOString();
          // Eğer güncellenen not seçiliyse, onu da güncelle
          if (state.selectedNote?.id === action.payload.id) {
            state.selectedNote = {
              ...state.notes[index],
            };
          }
        }
      })

      // 🗑️ NOTU SİL
      .addCase(deleteNoteThunk.fulfilled, (state, action) => {
        state.notes = state.notes.filter((note) => note.id !== action.payload);
        if (state.selectedNote?.id === action.payload) {
          state.selectedNote = null;
          state.viewMode = "list";
        }
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
