import { createSelector } from "reselect";

export const selectCandidatesState = (state) => state.candidates;
export const selectUIState = (state) => state.candidatesUI;

export const selectAllCandidates = createSelector(
  [selectCandidatesState],
  (candidates) => candidates
);

export const selectSelectedCandidate = createSelector(
  [selectUIState],
  (ui) => ui.selectedCandidate
);

export const selectActiveTab = createSelector(
  [selectUIState],
  (ui) => ui.activeTab
);

export const selectSearchTerm = createSelector(
  [selectUIState],
  (ui) => ui.searchTerm
);

export const selectViewMode = createSelector(
  [selectUIState],
  (ui) => ui.viewMode
);