// src/features/candidates/candidatesSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Dummy data
const dummyCandidates = [
  {
    name: "Alice Morgan",
    position: "Frontend Developer",
    status: "Pending",
    tags: ["remote", "junior"],
  },
  {
    name: "Liam Chen",
    position: "UI/UX Designer",
    status: "Interviewed",
    tags: ["full-time", "hybrid"],
  },
  {
    name: "Noah Müller",
    position: "Backend Developer",
    status: "Rejected",
    tags: ["contract", "onsite"],
  },
];

// ✅ Async thunk (simulate API delay)
export const loadCandidates = createAsyncThunk(
  "candidates/loadCandidates",
  async (_, { rejectWithValue }) => {
    try {
      await new Promise((res) => setTimeout(res, 500)); // simulate delay
      return dummyCandidates;
    } catch (error) {
      return rejectWithValue("Failed to load candidates.");
    }
  }
);

const candidatesSlice = createSlice({
  name: "candidates",
  initialState: {
    candidates: [],
    loading: false,
    error: null,
  },
  reducers: {},
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
      });
  },
});

export default candidatesSlice.reducer;