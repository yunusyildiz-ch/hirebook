import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@services/firebase/config";

export const listenToNotifications = createAsyncThunk(
  "notifications/listen",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const q = query(collection(db, "notifications"), orderBy("createdAt", "desc"));

      onSnapshot(q, (snapshot) => {
        const notifs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        dispatch(setNotifications(notifs));
      });

      return;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    list: [],
    loading: true,
    error: null,
  },
  reducers: {
    setNotifications: (state, action) => {
      state.list = action.payload;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listenToNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(listenToNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setNotifications } = notificationsSlice.actions;
export default notificationsSlice.reducer;