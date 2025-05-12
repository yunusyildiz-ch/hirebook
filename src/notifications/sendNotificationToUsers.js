import { sendNotification } from "./sendNotification.js";
import { createUsersNotificationData } from "./notificationData.js";

export const sendNotificationToUsers = (userId) => {
  const notificationData = createUsersNotificationData(userId);
  sendNotification("userNotifications.json", notificationData);
};

// Örnek Kullanım
const userIds = [
  "2VIC9n52dqW8N3fp35XMBAlKoqp1"
];
sendNotificationToUsers(userIds);

