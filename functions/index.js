// ✅ only for v2 functions: onRequest
import { onRequest } from "firebase-functions/v2/https";

// ✅ only for v1 functions: auth trigger
import functions from "firebase-functions";

// ✅ Logger (v1-v2)
import { logger } from "firebase-functions";

// ✅ Admin SDK
import { initializeApp } from "firebase-admin/app";
import { getFirestore, Timestamp } from "firebase-admin/firestore";

// initialize Admin SDK
initializeApp();
const db = getFirestore();

/**
 * 📣 Genel Bildirim Gönderme
 * HTTP POST: /sendGeneralNotification
 * Body: { title, message, type, category, priority, icon, url, actionText }
 */
export const sendGeneralNotification = onRequest(async (req, res) => {
  try {
    const {
      title,
      message,
      type = "info",
      category = "system",
      priority = "normal",
      icon = "bell",
      url = "",
      actionText = "View",
    } = req.body;

    if (!title || !message) {
      res.status(400).send("Missing title or message.");
      return;
    }

    await db.collection("notifications").add({
      title,
      message,
      type,
      category,
      priority,
      icon,
      url,
      actionText,
      to: "all",
      readBy: [],
      dismissedBy: [],
      createdAt: Timestamp.now(),
    });

    logger.info(`📣 General notification sent: ${title}`);
    res.status(200).send("Notification sent.");
  } catch (error) {
    logger.error("❌ Failed to send general notification", error);
    res.status(500).send("Internal Server Error");
  }
});

/**
 * 🎉 Welcome Bildirimi (Yeni Kullanıcı Kaydı)
 */
export const sendWelcomeNotification = functions.auth.user().onCreate(async (user) => {
  try {
    const { uid, displayName = "Qatip User", email } = user;

    await db.collection("notifications").add({
      title: "🎉 Welcome to Qatip!",
      message: `Hi ${displayName}, glad to have you on board.`,
      type: "info",
      category: "welcome",
      priority: "high",
      icon: "user-plus",
      url: "/dashboard",
      actionText: "Get Started",
      userId: uid,
      readBy: [],
      dismissedBy: [],
      createdAt: Timestamp.now(),
    });

    logger.info(`✅ Welcome notification sent to: ${email || uid}`);
  } catch (error) {
    logger.error("❌ Error sending welcome notification", error);
  }
});

