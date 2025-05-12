// 📂 notifications/notificationData.js

import { catLogoSvg } from "./cat_logo.js";

export const generalNotificationData = {
  title: "🌟 Stay Tuned for New Features!",
  message: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; text-align: center;">
      ${catLogoSvg}
     <h2>Dear Qatip User,</h2>
        <p>We are constantly working to enhance your experience and make <b>Qatip</b> the most efficient HR productivity assistant tool. 🚀</p>
        <hr style="margin: 10px 0;"/>
        <h3>🔍 What to expect:</h3>
        <ul style="list-style: none; padding: 0;">
          <li>✅ <b>New collaboration features</b> to boost teamwork.</li>
          <li>📊 <b>Advanced analytics</b> for data-driven decision-making.</li>
          <li>⚙️ <b>Customizable dashboards</b> to fit your workflow.</li>
        </ul>
        <p>Stay tuned for our upcoming updates, and thank you for being part of the <b>Qatip community</b>! 💙</p>
        <p>For support or feedback, feel free to reach out at: 
          <a href="mailto:support@qatip.app" style="color: #007BFF; text-decoration: underline;">support@qatip.app</a>
        </p>
        <p>Follow us for the latest updates:</p>
        <p>
          🌐 <a href="https://github.com/Qatip-App" target="_blank" style="color: #007BFF; text-decoration: underline;">GitHub</a><br>
          💼 <a href="https://www.linkedin.com/in/qatip-app/" target="_blank" style="color: #007BFF; text-decoration: underline;">LinkedIn</a>
        </p>
        <p>Best regards,<br><b>Qatip App Developer Team</b></p>
    </div>
  `,
  type: "info",
  category: "update",
  priority: "normal",
  icon: "bell",
  url: "/",
  actionText: "Learn More",
  to: "all",       // Genel bildirim
  isHtml: true,
};

export const adminNotificationData = {
  title: "🚀 Exciting News for Admins!",
  message: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      ${catLogoSvg}
      <h2>Welcome Admin!</h2>
      <p>Your insights help us shape the future of our platform. 🚀</p>
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
          🌐 <a href="https://github.com/Qatip-App" target="_blank" style="color: #007BFF; text-decoration: underline;">GitHub</a><br>
          💼 <a href="https://www.linkedin.com/in/qatip-app/" target="_blank" style="color: #007BFF; text-decoration: underline;">LinkedIn</a>
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
  to: "role:admin", 
  role: "admin",
  isHtml: true,
};

export const createUserNotificationData = (userId) => ({
  title: "👋 Welcome Back!",
  message: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; text-align: center;">
    ${catLogoSvg}
      <h2>Hello, Qatip User!</h2>
      <p>We hope you are enjoying your experience with <b>Qatip</b>. 🚀</p>
      <p>If you need any assistance, feel free to contact us at: 
        <a href="mailto:support@qatip.app" style="color: #007BFF; text-decoration: underline;">support@qatip.app</a>
      </p>
      <p>Best regards,<br><b>Qatip App Developer Team</b></p>
    </div>
  `,
  type: "info",
  category: "user-update",
  priority: "normal",
  icon: "smile",
  url: "/dashboard",
  actionText: "Go to Dashboard",
  to: `user:${userId}`,  // Kullanıcıya özel
  isHtml: true,
});

