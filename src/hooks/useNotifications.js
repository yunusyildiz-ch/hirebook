// 📁 src/features/notifications/useNotifications.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listenToNotifications,
  selectNotifications,
  selectNotificationsLoading,
  selectNotificationsError,
} from "./notificationsSlice";

export default function useNotifications(userId) {
  const dispatch = useDispatch();

  const notifications = useSelector(selectNotifications);
  const loading = useSelector(selectNotificationsLoading);
  const error = useSelector(selectNotificationsError);

  useEffect(() => {
    if (userId) {
      const unsubscribe = dispatch(listenToNotifications(userId));
      return () => unsubscribe && unsubscribe();
    }
  }, [dispatch, userId]);

  return { notifications, loading, error };
}
