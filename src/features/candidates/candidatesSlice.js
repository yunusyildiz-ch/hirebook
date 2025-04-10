// features/candidates/candidatesSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  loadCandidates,
  addCandidateThunk,
  updateCandidateThunk,
  deleteCandidateThunk,
} from "./candidatesThunks";

const initialState = {
  candidates: [],
  loading: false,
  error: null,
  selectedCandidate: null,
  activeTab: "All",
  viewMode: "list",
};

const candidatesSlice = createSlice({
  name: "candidates",
  initialState,
  reducers: {
    setSelectedCandidate: (state, action) => {
      state.selectedCandidate = action.payload;
    },
    clearSelectedCandidate: (state) => {
      state.selectedCandidate = null;
    },
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCandidates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadCandidates.fulfilled, (state, action) => {
        state.loading = false;
        state.candidates = action.payload;
      })
      .addCase(loadCandidates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addCandidateThunk.fulfilled, (state, action) => {
        state.candidates.unshift(action.payload);
      })
      .addCase(updateCandidateThunk.fulfilled, (state, action) => {
        const index = state.candidates.findIndex(c => c.id === action.payload.id);
        if (index !== -1) state.candidates[index] = action.payload;
      })
      .addCase(deleteCandidateThunk.fulfilled, (state, action) => {
        state.candidates = state.candidates.filter(c => c.id !== action.payload);
      });
  },
});

export const {
  setSelectedCandidate,
  clearSelectedCandidate,
  setViewMode,
  setActiveTab,
} = candidatesSlice.actions;

export default candidatesSlice.reducer;
