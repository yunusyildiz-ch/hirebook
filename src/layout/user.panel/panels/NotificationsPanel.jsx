// NotificationsPanel.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startNotificationsListener, stopNotificationsListener } from "@notifications/notificationsSlice";
import NotificationItem from "@notifications/NotificationItem";
import { useAuth } from "@/contexts/AuthContext";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "@/services/firebase/config";

export default function NotificationsPanel() {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { list: notifications, loading, error } = useSelector(
    (state) => state.notifications
  );

  useEffect(() => {
    if (user?.uid) {
      startNotificationsListener(user.uid, dispatch);
    }

    return () => {
      stopNotificationsListener(); // 🔁 Unsubscribe on unmount
    };
  }, [dispatch, user]);

  const handleClearAll = async () => {
    if (!user?.uid) return;

    try {
      await Promise.all(
        notifications.map((notification) => {
          const notifRef = doc(db, "notifications", notification.id);
          return updateDoc(notifRef, {
            dismissedBy: arrayUnion(user.uid),
          });
        })
      );
    } catch (err) {
      console.error("Clear all failed:", err);
    }
  };

  return (
    <div className="space-y-4 text-sm text-gray-800 dark:text-gray-200">
      {loading && <p>Loading notifications...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {notifications.length > 0 && (
        <div className="flex justify-end mb-2">
          <button
            onClick={handleClearAll}
            className="text-xs text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 underline"
          >
            Clear all
          </button>
        </div>
      )}

      {notifications.length === 0 && !loading && (
        <p>No new notifications.</p>
      )}

      {notifications.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </div>
  );
}
