import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addTaskToFirestore,
  updateTaskInFirestore,
  deleteTaskFromFirestore,
  subscribeToTasks,
} from "@/services/tasksService";
import { showSuccess, showError } from "@/utils/toastUtils";

// 🔁 Load tasks with real-time updates
export const loadTasks = createAsyncThunk(
  "tasks/loadTasks",
  async (userId, { rejectWithValue }) => {
    try {
      return await new Promise((resolve) => {
        subscribeToTasks(userId, resolve);
      });
    } catch (error) {
      const message = error.message || "Failed to load tasks";
      showError(message);
      return rejectWithValue(message);
    }
  }
);

// ➕ Add new task
export const addTaskThunk = createAsyncThunk(
  "tasks/addTask",
  async (task, { rejectWithValue }) => {
    try {
      const docRef = await addTaskToFirestore(task);
      showSuccess("Task added");
      return { id: docRef.id, ...task };
    } catch (error) {
      const message = error.message || "Failed to add task";
      showError(message);
      return rejectWithValue(message);
    }
  }
);

// ✏️ Update existing task
export const updateTaskThunk = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, ...data }, { rejectWithValue }) => {
    try {
      await updateTaskInFirestore(id, data);
      showSuccess("Task updated");
      return { id, ...data };
    } catch (error) {
      const message = error.message || "Failed to update task";
      showError(message);
      return rejectWithValue(message);
    }
  }
);

// 🗑️ Delete task
export const deleteTaskThunk = createAsyncThunk(
  "tasks/deleteTask",
  async (id, { rejectWithValue }) => {
    try {
      await deleteTaskFromFirestore(id);
      showSuccess("Task deleted");
      return id;
    } catch (error) {
      const message = error.message || "Failed to delete task";
      showError(message);
      return rejectWithValue(message);
    }
  }
);
