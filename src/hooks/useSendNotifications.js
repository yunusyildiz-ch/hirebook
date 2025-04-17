// 📁 src/hooks/useSendNotification.js
import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase/config";
import { showSuccess, showError } from "@/utils/toastUtils";

export default function useSendNotification() {
  const [sending, setSending] = useState(false);

  const sendNotification = async ({ title, message, type = "info", to = "all" }) => {
    setSending(true);
    try {
      const notification = {
        title,
        message,
        type,
        to, // "all" or userId
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "notifications"), notification);
      showSuccess("Notification sent successfully");
    } catch (err) {
      showError("Failed to send notification");
      console.error("Send notification error:", err);
    } finally {
      setSending(false);
    }
  };

  return { sendNotification, sending };
}