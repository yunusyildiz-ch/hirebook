// functions/index.js
import functions from "firebase-functions";
import { initializeApp } from "firebase-admin/app";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import cors from "cors";

// Initialize Firebase Admin SDK
initializeApp();
const db = getFirestore();
const corsHandler = cors({ origin: true });

/**
 * 📣 HTTP POST - General Notification Sender
 * Endpoint: https://<your-domain>.cloudfunctions.net/sendGeneralNotification
 */
export const sendGeneralNotification = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    if (req.method !== "POST") {
      res.status(405).send("Method Not Allowed");
      return;
    }

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

      console.log(`📣 Notification sent: ${title}`);
      res.status(200).send("Notification sent.");
    } catch (error) {
      console.error("❌ Failed to send notification", error);
      res.status(500).send("Internal Server Error");
    }
  });
});

/**
 * 🎉 Auth Trigger - Welcome Notification on User Signup
 */
export const sendWelcomeNotification = functions.auth.user().onCreate(async (user) => {
  try {
    const { uid, email } = user;

    // 👤 Firestore'dan firstname'i çek
    const userDoc = await db.collection("users").doc(uid).get();
    const userData = userDoc.exists ? userDoc.data() : null;

    const firstname = userData?.firstname || null;
    const displayName = firstname || user.displayName || "Qatip User";

    await db.collection("notifications").add({
      title: "🎉 Welcome to Qatip!",
      message: `Hi ${displayName}, glad to have you on board.`,
      type: "info",
      category: "welcome",
      priority: "normal",
      icon: "user-plus",
      url: "/dashboard",
      actionText: "Get Started",
      userId: uid,
      readBy: [],
      dismissedBy: [],
      createdAt: Timestamp.now(),
    });

    console.log(`✅ Welcome notification sent to: ${email || uid}`);
  } catch (error) {
    console.error("❌ Error sending welcome notification:", error);
  }
});
