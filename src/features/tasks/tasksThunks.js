import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addTaskToFirestore,
  updateTaskInFirestore,
  deleteTaskFromFirestore,
  subscribeToTasks,
} from "@/services/tasksService";
import { showSuccess, showError } from "@/utils/toastUtils";

const handleThunkError = (error, rejectWithValue, fallbackMessage) => {
  const message = error.message || fallbackMessage;
  showError(message);
  return rejectWithValue(message);
};

export const loadTasks = createAsyncThunk(
  "tasks/loadTasks",
  async (userId, { rejectWithValue }) => {
    try {
      return await new Promise((resolve) => {
        subscribeToTasks(userId, resolve);
      });
    } catch (error) {
      return handleThunkError(error, rejectWithValue, "Failed to load tasks");
    }
  }
);

export const addTaskThunk = createAsyncThunk(
  "tasks/addTask",
  async (task, { rejectWithValue }) => {
    try {
      const docRef = await addTaskToFirestore(task);
      showSuccess("Task added");
      return { id: docRef.id, ...task };
    } catch (error) {
      return handleThunkError(error, rejectWithValue, "Failed to add task");
    }
  }
);

export const updateTaskThunk = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, ...data }, { rejectWithValue }) => {
    try {
      await updateTaskInFirestore(id, data);
      showSuccess("Task updated");
      return { id, ...data };
    } catch (error) {
      return handleThunkError(error, rejectWithValue, "Failed to update task");
    }
  }
);

export const deleteTaskThunk = createAsyncThunk(
  "tasks/deleteTask",
  async (id, { rejectWithValue }) => {
    try {
      await deleteTaskFromFirestore(id);
      showSuccess("Task deleted");
      return id;
    } catch (error) {
      return handleThunkError(error, rejectWithValue, "Failed to delete task");
    }
  }
);
