// 📂 notifications/sendNotification.js
import { exec } from "child_process";
import fs from "fs";
import path from "path";

export const sendNotification = (filePath, notificationData) => {
  const jsonFilePath = path.join(process.cwd(), filePath);
  fs.writeFileSync(jsonFilePath, JSON.stringify(notificationData, null, 2));

  const curlCommand = `
    curl -X POST https://us-central1-qatip-note-app.cloudfunctions.net/sendNotification \
    -H "Content-Type: application/json" \
    -d @${jsonFilePath}
  `;

  exec(curlCommand, (error, stdout, stderr) => {
    if (error) {
      console.error("❌ Error sending notification:", error.message);
      return;
    }
    if (stderr) {
      console.error("⚠️ Stderr:", stderr);
      return;
    }
    console.log("✅ Notification sent successfully:", stdout);
  });
};
