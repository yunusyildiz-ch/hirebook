import { createSlice } from "@reduxjs/toolkit";
// ✅ Dummy task list
const initialState = {
  tasks: [
    {
      id: "t1",
      title: "Design login page",
      description: "Create a responsive login form with dark mode support.",
      status: "To-do",
      tags: ["frontend", "ui"],
      project: "UI Design",
      createdAt: "2025-04-01T10:00:00.000Z",
    },
    {
      id: "t2",
      title: "Implement authentication",
      description: "Set up Firebase auth for login & register.",
      status: "In Progress",
      tags: ["firebase", "auth"],
      project: "Backend",
      createdAt: "2025-04-02T09:30:00.000Z",
    },
    {
      id: "t3",
      title: "Create task detail component",
      description: "Display full task info with edit/delete options.",
      status: "In Review",
      tags: ["react", "component"],
      project: "Frontend",
      createdAt: "2025-04-03T11:00:00.000Z",
    },
    {
      id: "t4",
      title: "Write unit tests for Notes feature",
      description: "Ensure all Note reducers and UI actions are covered.",
      status: "Done",
      tags: ["testing"],
      project: "QA",
      createdAt: "2025-04-04T15:45:00.000Z",
    },
    {
      id: "t5",
      title: "Cleanup unused assets",
      description: "Remove all test assets, images and unused styles.",
      status: "Archived",
      tags: ["cleanup", "refactor"],
      project: "Maintenance",
      createdAt: "2025-04-05T14:00:00.000Z",
    },
  ],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask(state, action) {
      state.tasks.unshift(action.payload);
    },
    updateTask(state, action) {
      const index = state.tasks.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = { ...state.tasks[index], ...action.payload };
      }
    },
    deleteTask(state, action) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
  },
});

export const { addTask, updateTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;