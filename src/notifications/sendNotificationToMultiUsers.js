// 📂 notifications/sendNotificationToMultiUser.js
import { sendNotification } from "./sendNotification.js";
import { createMultiUserNotificationData } from "./notificationData.js";

// 📝 Çoklu Kullanıcıya Bildirim Gönderme
export const sendNotificationToMultiUser = (userIds) => {
  const notificationData = createMultiUserNotificationData(userIds);
  sendNotification("multiUserNotification.json", notificationData);
};

// Örnek Kullanım: Çoklu Kullanıcı
const userIds = [
  "2VIC9n52dqW8N3fp35XMBAlKoqp1",
  ""
];
sendNotificationToMultiUser(userIds);