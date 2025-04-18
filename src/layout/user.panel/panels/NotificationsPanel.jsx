import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listenToNotifications } from "@notifications/notificationsSlice";
import NotificationItem from "@notifications/NotificationItem";
import { useAuth } from "@/contexts/AuthContext";

export default function NotificationsPanel() {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { list: notifications, loading, error } = useSelector(
    (state) => state.notifications
  );

  useEffect(() => {
    if (user?.uid) {
      dispatch(listenToNotifications(user.uid));
    }
  }, [dispatch, user]);

  return (
    <div className="space-y-4 text-sm text-gray-800 dark:text-gray-200">
      {loading && <p>Loading notifications...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {notifications.length === 0 && !loading && <p>No new notifications.</p>}

      {notifications.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </div>
  );
}
