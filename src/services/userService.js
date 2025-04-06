import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase/config";

// Create user document in Firestore
export const createUserProfile = async (user) => {
  try {
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error creating user profile:", error);
    throw error;
  }
};
