// 🔥 Bildirim Güncelleme Yardımcı Fonksiyonu
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "@/services/firebase/config";

// 🚀 Bildirim Temizleme (Tek veya Çoklu)
export const dismissNotifications = async (notificationIds, userUid) => {
  try {
    await Promise.all(
      notificationIds.map((id) => {
        const notifRef = doc(db, "notifications", id);
        return updateDoc(notifRef, {
          dismissedBy: arrayUnion(userUid),
        });
      })
    );
    console.log("✅ Notifications dismissed:", notificationIds);
  } catch (err) {
    console.error("❌ Dismiss failed:", err);
  }
};

// 📖 Bildirim Okuma
export const markNotificationAsRead = async (id, userUid) => {
  try {
    const notifRef = doc(db, "notifications", id);
    await updateDoc(notifRef, {
      readBy: arrayUnion(userUid),
    });
    console.log(`✅ Notification marked as read: ${id}`);
  } catch (err) {
    console.error("❌ Mark as read failed:", err);
  }
};
