import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addFolder,
  updateFolder,
  deleteFolder,
  subscribeToFolders,
} from "@/services/foldersService";
import { setFolders } from "./foldersSlice"; 
import { showSuccess, showError } from "@/utils/toastUtils";

// 📌 Utility for consistent error handling
const handleThunkError = (error, rejectWithValue, fallbackMessage) => {
  const message = error.message || fallbackMessage;
  showError(message);
  return rejectWithValue(message);
};

// 🔄 Load Folders (with real-time subscription)
export const loadFolders = createAsyncThunk(
  "folders/loadFolders",
  async (userId, { dispatch, rejectWithValue }) => {
    if (!userId) {
      console.warn("Cannot load folders: No user ID provided");
      return []; 
    }

    try {
      return await new Promise((resolve) => {
        const unsubscribe = subscribeToFolders(userId, (folders) => {
          console.log("Loaded folders:", folders); // 🔥 Debugging line
          dispatch(setFolders(folders)); // ✅ Redux'a kaydet
          resolve(folders);
        });
      });
    } catch (error) {
      return rejectWithValue("Failed to load folders");
    }
  }
);

// ➕ Add Folder
export const addFolderThunk = createAsyncThunk(
  "folders/addFolder",
  async ({ title, color, userId }, { rejectWithValue }) => {
    try {
      const folderData = {
        title,
        color,
        userId,
        createdAt: new Date().toISOString(),
      };
      const docRef = await addFolder(folderData);
      showSuccess("Folder added");
      return { id: docRef.id, ...folderData };
    } catch (error) {
      return handleThunkError(error, rejectWithValue, "Failed to add folder");
    }
  }
);

// ✏️ Update Folder
export const updateFolderThunk = createAsyncThunk(
  "folders/updateFolder",
  async ({ id, title }, { rejectWithValue }) => {
    try {
      await updateFolder(id, { title });
      showSuccess("Folder updated");
      return { id, title };
    } catch (error) {
      return handleThunkError(error, rejectWithValue, "Failed to update folder");
    }
  }
);

// 🗑️ Delete Folder
export const deleteFolderThunk = createAsyncThunk(
  "folders/deleteFolder",
  async (id, { rejectWithValue }) => {
    try {
      await deleteFolder(id);
      showSuccess("Folder deleted");
      return id;
    } catch (error) {
      return handleThunkError(error, rejectWithValue, "Failed to delete folder");
    }
  }
);