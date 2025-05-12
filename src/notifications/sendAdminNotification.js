// 📂 notifications/sendAdminNotification.js
import { sendNotification } from "./sendNotification.js";
import { adminNotificationData } from "./notificationData.js";

sendNotification("adminNotification.json", adminNotificationData);
