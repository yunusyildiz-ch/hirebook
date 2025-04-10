import { createSlice } from "@reduxjs/toolkit";
import {
  fetchTasksThunk,
  addTaskThunk,
  updateTaskThunk,
  deleteTaskThunk,
} from "./tasksThunks";

const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 🔄 Fetch Tasks
      .addCase(fetchTasksThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasksThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasksThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ➕ Add Task
      .addCase(addTaskThunk.fulfilled, (state, action) => {
        state.tasks.unshift(action.payload);
      })

      // 📝 Update Task
      .addCase(updateTaskThunk.fulfilled, (state, action) => {
        const index = state.tasks.findIndex((task) => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })

      // ❌ Delete Task
      .addCase(deleteTaskThunk.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      });
  },
});

export default tasksSlice.reducer;