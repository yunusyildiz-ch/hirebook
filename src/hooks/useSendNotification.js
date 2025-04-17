import { useState } from "react";
import axios from "axios";
import { showSuccess, showError } from "@/utils/toastUtils";

const endpoint = "https://us-central1-qatip-note-app.cloudfunctions.net/sendGeneralNotification";

export default function useSendGeneralNotification() {
  const [loading, setLoading] = useState(false);

  const sendNotification = async ({ title, message, type = "info" }) => {
    setLoading(true);
    try {
      await axios.post(endpoint, {
        title,
        message,
        type,
      });
      showSuccess("Notification sent!");
    } catch (err) {
      console.error("❌ Notification error:", err);
      showError("Failed to send notification.");
    } finally {
      setLoading(false);
    }
  };

  return { sendNotification, loading };
}