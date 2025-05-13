import { deleteUser, reauthenticateWithPopup, reauthenticateWithCredential } from "firebase/auth";
import { deleteDoc, doc, collection, getDocs, query, where } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { auth, db, storage } from "@/services/firebase/config";
import { GoogleAuthProvider, EmailAuthProvider } from "firebase/auth";
import { toast } from "react-hot-toast";

// 🔐 Reauthenticate User
export const reauthenticateUser = async (user, password) => {
  try {
    if (user.providerData[0]?.providerId === "google.com") {
      const provider = new GoogleAuthProvider();
      await reauthenticateWithPopup(user, provider);
      toast.success("Reauthenticated successfully.");
    } else {
      const credential = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(user, credential);
      toast.success("Reauthenticated successfully.");
    }
  } catch (error) {
    console.error("❌ Reauthentication failed:", error);
    throw new Error("Reauthentication failed. Please try again.");
  }
};

// 🔥 Delete all user-related data
export const deleteUserData = async (uid) => {
  try {
    const avatarRef = ref(storage, `avatars/${uid}`);
    try {
      await deleteObject(avatarRef);
    } catch (err) {
      if (err.code !== "storage/object-not-found") {
        console.error("❌ Failed to delete avatar:", err);
      }
    }

    const collections = ["notes", "candidates", "tasks", "notifications", "folders"];
    const deletePromises = collections.map(async (col) => {
      const snap = await getDocs(query(collection(db, col), where("userId", "==", uid)));
      return Promise.all(snap.docs.map((doc) => deleteDoc(doc.ref)));
    });

    const cookieRef = doc(db, "cookiePreferences", uid);
    const userRef = doc(db, "users", uid);

    await Promise.all([...deletePromises, deleteDoc(cookieRef), deleteDoc(userRef)]);
  } catch (error) {
    console.error("❌ Error deleting user data:", error);
    throw error;
  }
};

// 🚨 Delete Account
export const deleteAccountCompletely = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("No authenticated user");

  try {
    await deleteUserData(user.uid);
    await deleteUser(user);
    await auth.signOut();
  } catch (error) {
    if (error.code === "auth/requires-recent-login") {
      console.error("❌ Reauthentication required.");
      throw new Error("Reauthentication required. Please sign in again.");
    }
    console.error("❌ Error in deleteAccountCompletely:", error);
    throw error;
  }
};
