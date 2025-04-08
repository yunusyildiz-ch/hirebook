import { createSelector } from "reselect";

export const selectTasksUIState = (state) => state.tasksUI;

export const selectActiveTab = createSelector(
  [selectTasksUIState],
  (uiState) => uiState.activeTab
);

export const selectViewMode = createSelector(
  [selectTasksUIState],
  (uiState) => uiState.viewMode
);

export const selectSelectedTask = createSelector(
  [selectTasksUIState],
  (uiState) => uiState.selectedTask
);

export const selectSelectedTaskId = createSelector(
  [selectTasksUIState],
  (uiState) => uiState.selectedTask?.id
);