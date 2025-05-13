import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAuth } from "@/contexts/AuthContext";
import {
  startGlobalNotificationsListener,
  stopGlobalNotificationsListener,
} from "@notifications/notificationsSlice";

export default function useGlobalListeners() {
  const dispatch = useDispatch();
  const { user } = useAuth();

  useEffect(() => {
    if (user?.uid) {
      const userRole = user.role || "viewer";
      startGlobalNotificationsListener(user.uid, userRole, dispatch);
    }

    return () => {
      stopGlobalNotificationsListener();
    };
  }, [dispatch, user]);
}
