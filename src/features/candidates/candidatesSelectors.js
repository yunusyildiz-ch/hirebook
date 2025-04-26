import { createSelector } from "reselect";

// 🔹 Base selectors
export const selectCandidatesState = (state) => state.candidates;
export const selectCandidatesUIState = (state) => state.candidatesUI;

// 🔹 Candidates data
export const selectAllCandidates = createSelector(
  [selectCandidatesState],
  (candidatesState) => candidatesState.candidates
);

// 🔹 UI state selectors
export const selectSelectedCandidate = createSelector(
  [selectCandidatesUIState],
  (uiState) => uiState.selectedCandidate
);

export const selectActiveTab = createSelector(
  [selectCandidatesUIState],
  (uiState) => uiState.activeTab
);

export const selectSearchTerm = createSelector(
  [selectCandidatesUIState],
  (uiState) => uiState.searchTerm
);

export const selectViewMode = createSelector(
  [selectCandidatesUIState],
  (uiState) => uiState.viewMode
);

export const selectPreviousViewMode = createSelector( // ⭐️ ekledik
  [selectCandidatesUIState],
  (uiState) => uiState.previousViewMode
);