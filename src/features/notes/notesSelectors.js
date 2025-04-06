// src/features/notes/notesSelectors.js

// 🔍 Seçili notu global state'ten al
export const selectSelectedNote = (state) => state.notes.selectedNote;

// 🔍 Tüm notları al
export const selectAllNotes = (state) => state.notes.notes;

// 🔍 Yüklenme durumunu al
export const selectNotesLoading = (state) => state.notes.loading;

// 🔍 Hata varsa al
export const selectNotesError = (state) => state.notes.error;