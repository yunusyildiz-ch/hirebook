// features/tasks/tasksUI.slice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  viewMode: "list", // list | view | edit
  previousViewMode: "list", // ⭐️ eklendi
  activeTab: "All", // All | To-do | In Progress | etc.
  selectedTask: null,
  searchTerm: "",
};

const tasksUISlice = createSlice({
  name: "tasksUI",
  initialState,
  reducers: {
    setViewMode: (state, action) => {
      state.previousViewMode = state.viewMode; // ⭐️ önceki mod kaydediliyor
      state.viewMode = action.payload;
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setSelectedTask: (state, action) => {
      state.selectedTask = action.payload;
    },
    clearSelectedTask: (state) => {
      state.selectedTask = null;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    resetUI: (state) => {
      state.viewMode = "list";
      state.previousViewMode = "list"; // ⭐️ sıfırlarken de unutulmadı
      state.activeTab = "All";
      state.selectedTask = null;
      state.searchTerm = "";
    },
  },
});

export const {
  setViewMode,
  setActiveTab,
  setSelectedTask,
  clearSelectedTask,
  setSearchTerm,
  resetUI,
} = tasksUISlice.actions;

export default tasksUISlice.reducer;