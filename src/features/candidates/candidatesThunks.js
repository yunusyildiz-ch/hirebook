import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addCandidate,
  updateCandidate,
  deleteCandidate,
  subscribeToCandidates,
} from "@/services/candidatesService";
import { showSuccess, showError } from "@/utils/toastUtils";

const handleThunkError = (error, rejectWithValue, fallbackMessage) => {
  const message = error.message || fallbackMessage;
  showError(message);
  return rejectWithValue(message);
};

export const loadCandidates = createAsyncThunk(
  "candidates/loadCandidates",
  async (_, { rejectWithValue }) => {
    try {
      const user = (await import("firebase/auth")).getAuth().currentUser;
      if (!user) throw new Error("You must be logged in.");

      return await new Promise((resolve) => {
        subscribeToCandidates(user.uid, resolve);
      });
    } catch (error) {
      return handleThunkError(error, rejectWithValue, "Failed to load candidates");
    }
  }
);

export const addCandidateThunk = createAsyncThunk(
  "candidates/addCandidate",
  async (candidate, { rejectWithValue }) => {
    try {
      const docRef = await addCandidate(candidate);
      showSuccess("Candidate added");
      return { id: docRef.id, ...candidate };
    } catch (error) {
      return handleThunkError(error, rejectWithValue, "Failed to add candidate");
    }
  }
);

export const updateCandidateThunk = createAsyncThunk(
  "candidates/updateCandidate",
  async ({ id, ...data }, { rejectWithValue }) => {
    try {
      await updateCandidate(id, data);
      showSuccess("Candidate updated");
      return { id, ...data };
    } catch (error) {
      return handleThunkError(error, rejectWithValue, "Failed to update candidate");
    }
  }
);

export const deleteCandidateThunk = createAsyncThunk(
  "candidates/deleteCandidate",
  async (id, { rejectWithValue }) => {
    try {
      await deleteCandidate(id);
      showSuccess("Candidate deleted");
      return id;
    } catch (error) {
      return handleThunkError(error, rejectWithValue, "Failed to delete candidate");
    }
  }
);