import { createSlice } from "@reduxjs/toolkit";
import {
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
  reducers: {
    setTasksFromSubscription(state, action) {
      state.tasks = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTaskThunk.fulfilled, (state, action) => {
        state.tasks.unshift(action.payload);
      })
      .addCase(updateTaskThunk.fulfilled, (state, action) => {
        const index = state.tasks.findIndex((task) => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(deleteTaskThunk.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      });
  },
});

export const { setTasksFromSubscription } = tasksSlice.actions;
export default tasksSlice.reducer;