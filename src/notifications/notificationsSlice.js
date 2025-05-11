// notificationsSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/services/firebase/config";
import { setUnreadCount } from "./notificationBadgeSlice";

let unsubscribeFn = null; // 🔑 Global unsubscribe

export const startNotificationsListener = (userId, dispatch) => {
  const q = query(
    collection(db, "notifications"),
    orderBy("createdAt", "desc")
  );

  unsubscribeFn = onSnapshot(q, (snapshot) => {
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
          (notif.to === "all" || 
           notif.userId === userId || 
           (notif.to === "targeted" && notif.role && notif.role === "admin")) && // 💡 Role-based kontrol
          !(notif.dismissedBy || []).includes(userId)
      );

    dispatch(setNotifications(notifs));
    const unread = notifs.filter((n) => !n.readBy.includes(userId)).length;
    dispatch(setUnreadCount(unread));
  });
};


export const stopNotificationsListener = () => {
  if (unsubscribeFn) {
    unsubscribeFn(); // 🔥 Temizle
    unsubscribeFn = null;
  }
};

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
});

export const { setNotifications } = notificationsSlice.actions;
export default notificationsSlice.reducer;