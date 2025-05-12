// 📂 notifications/sendGeneralNotification.js
import { sendNotification } from "./sendNotification.js";
import { generalNotificationData } from "./notificationData.js";

sendNotification("generalNotifications.json", generalNotificationData);
