import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addTaskToFirestore,
  updateTaskInFirestore,
  deleteTaskFromFirestore,
  subscribeToTasks,
} from "@/services/tasksService";
import { setTasksFromSubscription } from "./tasksSlice";
import { showSuccess, showError } from "@/utils/toastUtils";

const handleError = (error, rejectWithValue, fallbackMessage) => {
  const message = error.message || fallbackMessage;
  showError(message);
  return rejectWithValue(message);
};

// 🔁 Realtime Fetch (Subscription)
export const fetchTasksThunk = createAsyncThunk(
  "tasks/fetchTasks",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const unsubscribe = subscribeToTasks((tasks) => {
        dispatch(setTasksFromSubscription(tasks));
      });
      return unsubscribe;
    } catch (error) {
      return handleError(error, rejectWithValue, "Failed to subscribe to tasks.");
    }
  }
);

// ➕ Add Task
export const addTaskThunk = createAsyncThunk(
  "tasks/addTask",
  async (task, { rejectWithValue }) => {
    try {
      const docRef = await addTaskToFirestore(task);
      return { id: docRef.id, ...task };
    } catch (error) {
      return handleError(error, rejectWithValue, "Failed to add task.");
    }
  }
);

// ✏️ Update Task
export const updateTaskThunk = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, ...data }, { rejectWithValue }) => {
    try {
      await updateTaskInFirestore(id, data);
      return { id, ...data };
    } catch (error) {
      return handleError(error, rejectWithValue, "Failed to update task.");
    }
  }
);

// ❌ Delete Task
export const deleteTaskThunk = createAsyncThunk(
  "tasks/deleteTask",
  async (id, { rejectWithValue }) => {
    try {
      await deleteTaskFromFirestore(id);
      return id;
    } catch (error) {
      return handleError(error, rejectWithValue, "Failed to delete task.");
    }
  }
);