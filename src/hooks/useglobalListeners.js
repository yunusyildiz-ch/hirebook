// src/hooks/useGlobalListeners.js
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAuth } from "@/contexts/AuthContext";
import { listenToNotifications } from "@notifications/notificationsSlice";

export default function useGlobalListeners() {
  const dispatch = useDispatch();
  const { user } = useAuth();

  useEffect(() => {
    if (user?.uid) {
      dispatch(listenToNotifications(user.uid));
    }
  }, [dispatch, user]);
}