import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase/config";

export const saveCookiePreferences = async (uid, preferences) => {
  try {
    const ref = doc(db, "cookiePreferences", uid);
    await setDoc(ref, {
      uid,
      updatedAt: serverTimestamp(),
      preferences,
    });
  } catch (error) {
    console.error("Error saving cookie preferences:", error);
  }
};

export const getCookiePreferences = async (uid) => {
  try {
    const ref = doc(db, "cookiePreferences", uid);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      return snap.data().preferences;
    }
    return null;
  } catch (error) {
    console.error("Error fetching cookie preferences:", error);
    return null;
  }
};