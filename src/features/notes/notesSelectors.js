// -------- NOTE STATE -------- //
export const selectNotesState = (state) => state.notes;

export const selectAllNotes = (state) => state.notes.notes;

export const selectSelectedNote = (state) => state.notes.selectedNote;

export const selectSelectedNoteId = (state) =>
  state.notes.selectedNote?.id || null;

// -------- UI STATE -------- //
export const selectNotesUIState = (state) => state.notesUI;

export const selectViewMode = (state) => state.notesUI.viewMode;

export const selectActiveTab = (state) => state.notesUI.activeTab;

export const selectNotesLoading = (state) => state.notesUI.loading;

export const selectNotesError = (state) => state.notesUI.error;

export const selectSearchTerm = (state) => state.notesUI.searchTerm;

export const selectNewNoteActive = (state) => state.notesUI.newNoteActive;

export const selectPreviousViewMode = (state) => state.notesUI.previousViewMode;
