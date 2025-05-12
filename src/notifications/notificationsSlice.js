import { createSlice } from "@reduxjs/toolkit";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/services/firebase/config";
import { setUnreadCount } from "@notifications/notificationBadgeSlice";

let unsubscribeFn = null;

// 🚀 Filtreleme Fonksiyonu
const isNotificationVisible = (notif, userId, userRole) => {
  const isGeneral = notif.to === "all";              // Genel bildirim
  const isForAdmin = notif.to === "role:admin";       // Sadece adminler için
  const isForUser = notif.userId === userId;          // Kullanıcıya özel
  const isMultiUser = Array.isArray(notif.to) && notif.to.includes(`user:${userId}`);  // Çoklu kullanıcı bildirimi
  const isDismissed = (notif.dismissedBy || []).includes(userId);  // Bildirimden çıkış yapmışsa

  // 🔥 Admin: Admin veya genel bildirimleri görür
  if (userRole === "admin") {
    return !isDismissed && (isGeneral || isForAdmin || isForUser || isMultiUser);
  }

  // 👥 Viewer: Sadece genel veya kendi bildirimlerini görür
  if (userRole === "viewer") {
    return !isDismissed && (isGeneral || isForUser || isMultiUser);
  }

  return false;  // Hiçbir rol eşleşmezse görünmesin
};

// 📌 Bildirim Alma ve Filtreleme
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
      .filter((notif) => isNotificationVisible(notif, userId, userRole));  // 🔥 Filtreleme

    console.log("🔔 Final Notifications:", notifs);

    // ✅ Bildirimleri Redux Store'a gönder
    dispatch(setNotifications(notifs));
    console.log("✅ Notifications set in slice:", notifs);

    // 🛎️ Okunmamış bildirim sayısını hesapla
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

