import { createSlice } from "@reduxjs/toolkit";

const candidatesSlice = createSlice({
  name: "candidates",
  initialState: [], 
  reducers: {
    setCandidates: (_, action) => action.payload,
    addCandidate: (state, action) => {
      state.unshift(action.payload);
    },
    updateCandidate: (state, action) => {
      const index = state.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) state[index] = action.payload;
    },
    deleteCandidate: (state, action) => {
      return state.filter((c) => c.id !== action.payload);
    },
  },
});

export const {
  setCandidates,
  addCandidate,
  updateCandidate,
  deleteCandidate,
} = candidatesSlice.actions;

export default candidatesSlice.reducer;