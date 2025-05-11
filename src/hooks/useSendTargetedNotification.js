const targetedEndpoint = "https://us-central1-qatip-note-app.cloudfunctions.net/sendTargetedNotification";

export default function useSendTargetedNotification() {
  const [loading, setLoading] = useState(false);

  const sendTargetedNotification = async ({ title, message, type = "info", isHtml = false }) => {
    setLoading(true);
    try {
      await axios.post(targetedEndpoint, {
        title,
        message,
        type,
        isHtml,  // 💡 HTML olarak gönderme bayrağı
      });
      showSuccess("Notification sent!");
    } catch (err) {
      console.error("❌ Notification error:", err);
      showError("Failed to send notification.");
    } finally {
      setLoading(false);
    }
  };

  return { sendTargetedNotification, loading };
}
