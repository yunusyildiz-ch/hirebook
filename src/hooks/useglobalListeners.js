// src/hooks/useGlobalListeners.js
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAuth } from "@/contexts/AuthContext";
import {
  startNotificationsListener,
  stopNotificationsListener,
} from "@notifications/notificationsSlice";

export default function useGlobalListeners() {
  const dispatch = useDispatch();
  const { user } = useAuth();

  useEffect(() => {
    if (user?.uid) {
      startNotificationsListener(user.uid, dispatch);
    }

    return () => {
      stopNotificationsListener(); // ✅ logout veya user null olursa dinleyici durur
    };
  }, [dispatch, user]);
}