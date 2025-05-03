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
import { auth, db, storage } from "@services/firebase/config";

export const deleteUserData = async (uid) => {
  // 1. Delete avatar from Firebase Storage
  const avatarRef = ref(storage, `avatars/${uid}`);
  try {
    await deleteObject(avatarRef);
  } catch (err) {
    if (err.code !== "storage/object-not-found") {
      console.error("❌ Failed to delete avatar:", err);
    }
  }

  // 2. Delete notes
  const notesSnap = await getDocs(
    query(collection(db, "notes"), where("userId", "==", uid))
  );
  const deleteNotes = notesSnap.docs.map((doc) => deleteDoc(doc.ref));

  // 3. Delete candidates
  const candidatesSnap = await getDocs(
    query(collection(db, "candidates"), where("userId", "==", uid))
  );
  const deleteCandidates = candidatesSnap.docs.map((doc) => deleteDoc(doc.ref));

  // 4. Delete tasks
  const tasksSnap = await getDocs(
    query(collection(db, "tasks"), where("userId", "==", uid))
  );
  const deleteTasks = tasksSnap.docs.map((doc) => deleteDoc(doc.ref));

  // 5. Delete notifications
  const notificationsSnap = await getDocs(
    query(collection(db, "notifications"), where("userId", "==", uid))
  );
  const deleteNotifications = notificationsSnap.docs.map((doc) =>
    deleteDoc(doc.ref)
  );

  // 6. Delete cookie preferences
  const cookieRef = doc(db, "cookiePreferences", uid);
  const deleteCookiePrefs = deleteDoc(cookieRef);

  // 7. Delete user profile document
  const userRef = doc(db, "users", uid);

  // Execute all deletions concurrently
  await Promise.all([
    ...deleteNotes,
    ...deleteCandidates,
    ...deleteTasks,
    ...deleteNotifications,
    deleteCookiePrefs,
    deleteDoc(userRef),
  ]);
};

export const deleteAccountCompletely = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("No authenticated user");

  await deleteUserData(user.uid);
  await deleteUser(user); // Firebase Auth deletion
};