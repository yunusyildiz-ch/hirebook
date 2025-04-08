import { createSelector } from "reselect";

// ----------- NOTE STATE SELECTORS ----------- //

export const selectNotesState = (state) => state.notes;

export const selectAllNotes = createSelector(
  [selectNotesState],
  (notesState) => notesState.notes
);

export const selectSelectedNote = createSelector(
  [selectNotesState],
  (notesState) => notesState.selectedNote
);

export const selectSelectedNoteId = createSelector(
  [selectNotesState],
  (notesState) => notesState.selectedNote?.id
);

export const selectNotesByFolder = (folderId) =>
  createSelector([selectAllNotes], (notes) =>
    notes.filter((note) => note.folderId === folderId)
  );

// ----------- UI STATE SELECTORS ----------- //

export const selectNotesUIState = (state) => state.notesUI;

export const selectViewMode = createSelector(
  [selectNotesUIState],
  (uiState) => uiState.viewMode
);

export const selectActiveTab = createSelector(
  [selectNotesUIState],
  (uiState) => uiState.activeTab
);

export const selectNotesLoading = createSelector(
  [selectNotesUIState],
  (uiState) => uiState.loading
);

export const selectNotesError = createSelector(
  [selectNotesUIState],
  (uiState) => uiState.error
);