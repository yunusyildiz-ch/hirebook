import { createSelector } from "reselect";

export const selectNotesState = (state) => state.notes;

export const selectAllNotes = createSelector(
  [selectNotesState],
  (notesState) => notesState.notes
);

export const selectSelectedNote = createSelector(
  [selectNotesState],
  (notesState) => notesState.selectedNote
);

export const selectNotesLoading = createSelector(
  [selectNotesState],
  (notesState) => notesState.loading
);

export const selectNotesError = createSelector(
  [selectNotesState],
  (notesState) => notesState.error
);

export const selectNotesByFolder = (folderId) =>
    createSelector([selectAllNotes], (notes) =>
      notes.filter((note) => note.folderId === folderId)
    );

export const selectSelectedNoteId = createSelector(
        [selectNotesState],
        (notesState) => notesState.selectedNote?.id
      );