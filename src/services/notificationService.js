// import {
//     collection,
//     addDoc,
//     query,
//     where,
//     orderBy,
//     onSnapshot,
//     serverTimestamp,
//   } from "firebase/firestore";
//   import { db } from "@/firebase";
  
//   const notificationsRef = collection(db, "notifications");
  
//   // ✅ Bildirim oluştur
//   export const addNotification = async ({ title, message, userId = null, type = "general" }) => {
//     try {
//       await addDoc(notificationsRef, {
//         title,
//         message,
//         type, // "general" | "user"
//         userId: userId || null,
//         read: false,
//         createdAt: serverTimestamp(),
//       });
//     } catch (error) {
//       console.error("Notification eklenemedi:", error);
//       throw error;
//     }
//   };
  
//   // ✅ Bildirimleri dinle (gerçek zamanlı)
//   export const listenToNotifications = (userId, callback) => {
//     const q = query(
//       notificationsRef,
//       where("userId", "in", [null, userId]),
//       orderBy("createdAt", "desc")
//     );
  
//     return onSnapshot(q, (snapshot) => {
//       const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//       callback(data);
//     });
//   };