import { createSlice } from "@reduxjs/toolkit";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/services/firebase/config";
import { setUnreadCount } from "@notifications/notificationBadgeSlice";

let unsubscribeFn = null;

// 🚀 Filtreleme Fonksiyonu
const isNotificationVisible = (notif, userId, userRole) => {
  const isGeneral = notif.to === "all";
  const isForAdmin = notif.to === "role:admin";
  const isForUser = Array.isArray(notif.to)
    ? notif.to.includes(`user:${userId}`)
    : notif.to === `user:${userId}`;
  const isDismissed = (notif.dismissedBy || []).includes(userId);

  if (userRole === "admin") {
    return !isDismissed && (isGeneral || isForAdmin || isForUser);
  }

  if (userRole === "viewer") {
    return !isDismissed && (isGeneral || isForUser);
  }

  return false;
};

// 📌 Global Bildirim Dinleyici
export const startGlobalNotificationsListener = (userId, userRole, dispatch) => {
  console.log("🚀 Start Global Notifications Listener");

  const q = query(
    collection(db, "notifications"),
    orderBy("createdAt", "desc")
  );

  unsubscribeFn = onSnapshot(q, (snapshot) => {
    console.log("📥 Snapshot received!");

    const notifs = snapshot.docs
      .map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toMillis?.() || Date.now(),
        };
      })
      .filter((notif) => isNotificationVisible(notif, userId, userRole));

    dispatch(setNotifications(notifs));

    const unreadCount = notifs.filter((n) => !n.readBy.includes(userId)).length;
    dispatch(setUnreadCount(unreadCount));
  });
};

export const stopGlobalNotificationsListener = () => {
  if (unsubscribeFn) {
    unsubscribeFn();
    unsubscribeFn = null;
    console.log("🛑 Global Notifications listener stopped.");
  }
};

// 🌟 Notifications Slice
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
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setNotifications, setLoading, setError } = notificationsSlice.actions;
export default notificationsSlice.reducer;

