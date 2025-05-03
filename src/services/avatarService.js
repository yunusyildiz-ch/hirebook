import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { updateUserProfile } from "@/services/userService";
import { storage, auth } from "@/services/firebase/config";

/**
 * Upload and update user avatar in Firebase Auth, Firestore and Storage
 */
export const uploadAvatar = async (file) => {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error("No authenticated user");

  const storageRef = ref(storage, `avatars/${uid}`);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);

  await updateProfile(auth.currentUser, { photoURL: url });
  await updateUserProfile(uid, { photoURL: url });

  return url;
};

/**
 * Delete user avatar from Firebase Storage and reset photoURL in Firebase Auth and Firestore
 */
export const deleteAvatar = async () => {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error("No authenticated user");

  const storageRef = ref(storage, `avatars/${uid}`);
  await deleteObject(storageRef);
  await updateProfile(auth.currentUser, { photoURL: "" });
  await updateUserProfile(uid, { photoURL: "" });
};
