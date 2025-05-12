import { sendNotification } from "./sendNotification.js";
import { createUserNotificationData } from "./notificationData.js";

export const sendNotificationToUser = (userId) => {
  const notificationData = createUserNotificationData(userId);
  sendNotification("userNotification.json", notificationData);
};

// Örnek Kullanım
const userId = "2VIC9n52dqW8N3fp35XMBAlKoqp1";
sendNotificationToUser(userId);

