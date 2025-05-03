// 📁 src/services/accountService.js
import { deleteUser } from "firebase/auth";
import {
  deleteDoc,
  doc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { auth, db, storage } from "@/services/firebase/config";

// 🔥 Delete all user-related data
export const deleteUserData = async (uid) => {
  try {
    // 1. Avatar
    const avatarRef = ref(storage, `avatars/${uid}`);
    try {
      await deleteObject(avatarRef);
    } catch (err) {
      if (err.code !== "storage/object-not-found") {
        console.error("❌ Failed to delete avatar:", err);
      }
    }

    // 2. Notes
    const notesSnap = await getDocs(
      query(collection(db, "notes"), where("userId", "==", uid))
    );
    const deleteNotes = notesSnap.docs.map((doc) => deleteDoc(doc.ref));

    // 3. Candidates
    const candidatesSnap = await getDocs(
      query(collection(db, "candidates"), where("userId", "==", uid))
    );
    const deleteCandidates = candidatesSnap.docs.map((doc) =>
      deleteDoc(doc.ref)
    );

    // 4. Tasks
    const tasksSnap = await getDocs(
      query(collection(db, "tasks"), where("userId", "==", uid))
    );
    const deleteTasks = tasksSnap.docs.map((doc) => deleteDoc(doc.ref));

    // 5. Notifications
    const notificationsSnap = await getDocs(
      query(collection(db, "notifications"), where("userId", "==", uid))
    );
    const deleteNotifications = notificationsSnap.docs.map((doc) =>
      deleteDoc(doc.ref)
    );

    // 6. Cookie Preferences
    const cookieRef = doc(db, "cookiePreferences", uid);
    const deleteCookiePrefs = deleteDoc(cookieRef);

    // 7. User Profile
    const userRef = doc(db, "users", uid);

    // 🧹 Execute all deletions
    await Promise.all([
      ...deleteNotes,
      ...deleteCandidates,
      ...deleteTasks,
      ...deleteNotifications,
      deleteCookiePrefs,
      deleteDoc(userRef),
    ]);
  } catch (error) {
    console.error("❌ Error deleting user data:", error);
    throw error;
  }
};

export const deleteAccountCompletely = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("No authenticated user");

  try {
    await deleteUserData(user.uid);
    await deleteUser(user); // Firebase Auth'dan kaldır
    await auth.signOut();   // ⬅️ kesin çıkış
  } catch (error) {
    console.error("❌ Error in deleteAccountCompletely:", error);
    throw error;
  }
};