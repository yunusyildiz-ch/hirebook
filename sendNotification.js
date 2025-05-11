// 📂 sendNotification.js
import { exec } from "child_process";
import fs from "fs";
import path from "path";

const jsonFilePath = path.join(process.cwd(), "adminNotification.json");

// ✅ Function to send notification
export const sendNotification = () => {
  // 🌟 Create or overwrite the JSON file
  const notificationData = {
    title: "🚀 Exciting News for Admins!",
    message: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #333;">🚀 Welcome Admin!</h2>
        <p>As a valuable part of our <b>Qatip HR Productivity Assistant Tool</b>, your insights help us shape the future of our platform.</p>
        <hr style="margin: 10px 0;"/>
        <h3 style="color: #007BFF;">🔧 Latest Admin Features:</h3>
        <ul>
          <li>💼 Advanced candidate tracking with custom filters.</li>
          <li>📊 Interactive dashboards with data insights.</li>
          <li>🔒 Flexible role management and permission settings.</li>
        </ul>
        <h3 style="color: #28a745;">💡 User Panel Updates:</h3>
        <ul>
          <li>📝 Improved note management with tagging and archiving.</li>
          <li>🤝 Real-time collaboration tools for team projects.</li>
          <li>📅 Personalized dashboard views based on role.</li>
        </ul>
        <p>We are constantly working to make <b>Qatip</b> the best productivity tool for your HR needs. Your insights are what drive us forward! 🚀</p>
        <p>If you have any suggestions, contact us at <a href="mailto:support@qatip.app" style="color: #007BFF; text-decoration: underline;">support@qatip.app</a></p>
        <p>Follow us on:</p>
        <p>
          🌐 <a href="https://github.com/Qatip-App" style="color: #007BFF; text-decoration: underline;">GitHub</a><br>
          💼 <a href="https://www.linkedin.com/in/qatip-app/" style="color: #007BFF; text-decoration: underline;">LinkedIn</a>
        </p>
        <p>Best regards,<br><b>Qatip App Developer Team</b></p>
      </div>
    `,
    type: "info",
    category: "admin-update",
    priority: "high",
    icon: "rocket",
    url: "/admin",
    actionText: "Explore",
    role: "admin",
    isHtml: true
  };

  fs.writeFileSync(jsonFilePath, JSON.stringify(notificationData, null, 2));

  // 🌀 Construct the curl command
  const curlCommand = `
    curl -X POST https://us-central1-qatip-note-app.cloudfunctions.net/sendTargetedNotification \
    -H "Content-Type: application/json" \
    -d @${jsonFilePath}
  `;

  // 🚀 Execute the curl command
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

// ✨ Execute the function
sendNotification();

