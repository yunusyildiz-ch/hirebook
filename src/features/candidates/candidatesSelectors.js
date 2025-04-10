import { createSelector } from "reselect";

export const selectCandidatesState = (state) => state.candidates;
export const selectCandidatesUIState = (state) => state.candidatesUI;

export const selectAllCandidates = createSelector(
  [selectCandidatesState],
  (candidatesState) => candidatesState.candidates
);

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
