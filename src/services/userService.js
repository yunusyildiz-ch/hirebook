import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase/config";

// Create user document in Firestore if it doesn't exist
export const createUserProfile = async (user) => {
  try {
    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || "",
        photoURL: user.photoURL || "",
        createdAt: serverTimestamp(),
      });
    }
  } catch (error) {
    console.error("Error creating user profile:", error);
    throw error;
  }
};