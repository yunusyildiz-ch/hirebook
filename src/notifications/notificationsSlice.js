import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/services/firebase/config";
import { setUnreadCount } from "./notificationBadgeSlice";

// 🎧 Firestore'dan notification'ları dinleme
export const listenToNotifications = createAsyncThunk(
  "notifications/listen",
  async (userId, { dispatch, rejectWithValue }) => {
    try {
      const q = query(
        collection(db, "notifications"),
        orderBy("createdAt", "desc")
      );

      // Realtime dinleme
      onSnapshot(q, (snapshot) => {
        const notifs = snapshot.docs
          .map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              ...data,
              createdAt: data.createdAt?.toMillis?.() || Date.now(),
            };
          })
          .filter(
            (notif) =>
              (notif.to === "all" || notif.userId === userId) &&
              !(notif.dismissedBy || []).includes(userId)
          );
          dispatch(setNotifications(notifs));
          const unread = notifs.filter((n) => !n.readBy.includes(userId)).length;
          dispatch(setUnreadCount(unread));
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