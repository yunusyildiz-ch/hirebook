// src/features/tasks/tasksSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Dummy data
const dummyTasks = [
  {
    id: 1,
    title: "Prepare onboarding documents",
    status: "In Progress",
  },
  {
    id: 2,
    title: "Schedule interview with Jane",
    status: "To Do",
  },
  {
    id: 3,
    title: "Review coding challenge submissions",
    status: "Done",
  },
];

// Thunk to simulate loading tasks
export const loadTasks = createAsyncThunk("tasks/loadTasks", async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(dummyTasks), 300);
  });
});

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(loadTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load tasks.";
      });
  },
});

export default tasksSlice.reducer;