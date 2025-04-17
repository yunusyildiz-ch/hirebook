import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listenToNotifications } from "@/features/notifications/notificationsSlice";
import { useAuth } from "@/contexts/AuthContext";

export default function useNotifications() {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications.list);
  const loading = useSelector((state) => state.notifications.loading);
  const error = useSelector((state) => state.notifications.error);

  useEffect(() => {
    if (user) {
      dispatch(listenToNotifications(user.uid));
    }
  }, [user]);

  return { notifications, loading, error };
}
