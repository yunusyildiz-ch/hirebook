import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/services/firebase/config";
import { auth } from "@/services/firebase/config";

const foldersRef = collection(db, "folders");

// ➕ Add Folder
export const addFolder = async ({ title, color }) => {
  const user = auth.currentUser;
  if (!user) throw new Error("You must be logged in to add a folder.");

  const docRef = await addDoc(foldersRef, {
    userId: user.uid,
    title,
    color,
    createdAt: serverTimestamp(),
  });

  return docRef;
};

// ✏️ Update Folder
export const updateFolder = async (id, updates) => {
  try {
    const folderDoc = doc(db, "folders", id);

    // Doğru veri yapısını kontrol et
    if (!updates || typeof updates !== "object") {
      throw new Error("Invalid update data");
    }

    // Firestore güncelleme işlemi
    await updateDoc(folderDoc, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error in Firestore update:", error); 
    throw new Error("Failed to update folder");
  }
};

// 🗑️ Delete Folder
export const deleteFolder = async (id) => {
  try {
    const folderDoc = doc(db, "folders", id);
    await deleteDoc(folderDoc);
  } catch (error) {
    console.error("Error deleting folder:", error);
    throw new Error("Failed to delete folder");
  }
};

// 🔄 Subscribe to Folders
export const subscribeToFolders = (userId, callback) => {
  if (!userId) {
    console.warn("User ID is not available for folder subscription");
    return () => {};
  }

  const userFoldersQuery = query(foldersRef, where("userId", "==", userId));

  return onSnapshot(
    userFoldersQuery,
    (snapshot) => {
      const folders = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate?.().toISOString() || null,
          updatedAt: data.updatedAt?.toDate?.().toISOString() || null,
        };
      });
      callback(folders);
    },
    (error) => {
      console.error("Realtime Sync Error:", error.message); 
    }
  );
};