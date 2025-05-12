import { createSlice } from "@reduxjs/toolkit";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/services/firebase/config";
import { setUnreadCount } from "@notifications/notificationBadgeSlice";

let unsubscribeFn = null;

// 🚀 Start Notifications Listener
export const startNotificationsListener = (userId, userRole, dispatch) => {
  console.log("🚀 Start Notifications Listener");
  console.log("User ID:", userId);
  console.log("User Role:", userRole);

  const q = query(
    collection(db, "notifications"),
    orderBy("createdAt", "desc")
  );

  unsubscribeFn = onSnapshot(q, (snapshot) => {
    console.log("📥 Snapshot received!");
    const notifs = snapshot.docs
      .map((doc) => {
        const data = doc.data();
        console.log("🔄 Notification Data:", data);
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toMillis?.() || Date.now(),
        };
      })
      .filter((notif) => {
        // 📝 Bildirim görünürlük kontrolü
        const isGeneral = notif.to === "all"; // Genel bildirim
        const isForUser = notif.userId === userId; // Kullanıcıya özel bildirim

        // 🔥 Admin rolü varsa tüm bildirimleri gör
        if (userRole === "admin") {
          console.log(`🔍 Visibility Check for ${notif.title}: true (Admin Role)`);
          return true;
        }

        // 🛠️ Viewer ise sadece kendi veya genel bildirimleri gör
        const isVisible = isGeneral || isForUser;
        console.log(`🔍 Visibility Check for ${notif.title}: ${isVisible} (Viewer Role)`);
        return isVisible && !(notif.dismissedBy || []).includes(userId);
      });

    console.log("🔔 Final Notifications:", notifs);

    // ✅ Bildirimleri Redux Store'a gönder
    dispatch(setNotifications(notifs));
    console.log("✅ Notifications set in slice:", notifs);

    // 🛎️ Okunmamış bildirimleri say
    const unreadCount = notifs.filter((n) => !n.readBy.includes(userId)).length;
    console.log("🔢 Unread Count:", unreadCount);
    dispatch(setUnreadCount(unreadCount));
  });
};

// 🔥 Stop Notifications Listener
export const stopNotificationsListener = () => {
  if (unsubscribeFn) {
    unsubscribeFn();
    unsubscribeFn = null;
    console.log("🛑 Notifications listener stopped.");
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
      console.log("✅ Notifications set in slice:", action.payload);
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
