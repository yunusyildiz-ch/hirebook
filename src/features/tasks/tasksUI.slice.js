import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeTab: "All",       // All | In Progress | New
  viewMode: "list",       // list | view | edit
  selectedTask: null,     // selected task data
};

const tasksUISlice = createSlice({
  name: "tasksUI",
  initialState,
  reducers: {
    setActiveTab(state, action) {
      state.activeTab = action.payload;
    },
    setViewMode(state, action) {
      state.viewMode = action.payload;
    },
    setSelectedTask(state, action) {
      state.selectedTask = action.payload;
    },
    clearSelectedTask(state) {
      state.selectedTask = null;
    },
    resetTaskUI(state) {
      state.activeTab = "All";
      state.viewMode = "list";
      state.selectedTask = null;
    },
  },
});

export const {
  setActiveTab,
  setViewMode,
  setSelectedTask,
  clearSelectedTask,
  resetTaskUI,
} = tasksUISlice.actions;

export default tasksUISlice.reducer;