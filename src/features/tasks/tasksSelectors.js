import { createSelector } from "reselect";

// 🔍 Task State
export const selectTasksState = (state) => state.tasks;
export const selectAllTasks = createSelector(
  [selectTasksState],
  (tasksState) => tasksState.tasks
);

// 🔍 UI State
export const selectTasksUIState = (state) => state.tasksUI;

export const selectViewMode = createSelector(
  [selectTasksUIState],
  (ui) => ui.viewMode
);

export const selectActiveTab = createSelector(
  [selectTasksUIState],
  (ui) => ui.activeTab
);

export const selectSelectedTask = createSelector(
  [selectTasksUIState],
  (ui) => ui.selectedTask
);

export const selectSearchTerm = createSelector(
  [selectTasksUIState],
  (ui) => ui.searchTerm
);