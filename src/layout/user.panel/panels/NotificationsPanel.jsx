import { useSelector } from "react-redux";
import NotificationItem from "@notifications/NotificationItem";
import { useAuth } from "@contexts/AuthContext";
import { dismissNotifications } from "@notifications/notificationUtils";

export default function NotificationsPanel() {
  const { user } = useAuth();
  const { list: notifications, loading, error } = useSelector((state) => state.notifications);

  // 🧹 Tüm Bildirimleri Temizleme
  const handleClearAll = async () => {
    if (!user?.uid) return;
    const notificationIds = notifications.map((notification) => notification.id);
    await dismissNotifications(notificationIds, user.uid);
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
      {notifications.length === 0 && !loading && <p>No new notifications.</p>}
      {notifications.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </div>
  );
}








