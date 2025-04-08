import { createSelector } from "reselect";

export const selectCandidatesUIState = (state) => state.candidatesUI;

export const selectActiveTab = createSelector(
  [selectCandidatesUIState],
  (uiState) => uiState.activeTab
);

export const selectViewMode = createSelector(
  [selectCandidatesUIState],
  (uiState) => uiState.viewMode
);

export const selectSelectedCandidate = createSelector(
  [selectCandidatesUIState],
  (uiState) => uiState.selectedCandidate
);

export const selectSelectedCandidateId = createSelector(
  [selectCandidatesUIState],
  (uiState) => uiState.selectedCandidate?.id
);