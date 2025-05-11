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

    // Geçersiz verileri kaldır
    const sanitizedUpdates = Object.fromEntries(
      Object.entries(updates).filter(([_, value]) => value !== undefined)
    );

    await updateDoc(folderDoc, {
      ...sanitizedUpdates,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating folder:", error);
    throw new Error("Failed to update folder");
  }
};


// 🗑️ Delete Folder
export const deleteFolder = async (id) => {
  try {
    const folderDoc = doc(db, "folders", id);
    await deleteDoc(folderDoc);
  } catch (error) {
    throw new Error("Failed to delete folder");
  }
};


// 🔄 Subscribe to Folders (Real-time updates)
export const subscribeToFolders = (userId, callback) => {
  if (!userId) {
    console.warn("User ID is not available for folder subscription");
    return () => {};
  }

  const userFoldersQuery = query(foldersRef, where("userId", "==", userId));

  return onSnapshot(userFoldersQuery, (snapshot) => {
    const folders = snapshot.docs.map((doc) => {
      const data = doc.data();

      // Zaman damgasını güvenli bir şekilde dönüştür
      const safeDate = (timestamp) =>
        timestamp && typeof timestamp.toDate === "function"
          ? timestamp.toDate().toISOString()
          : null;

      return {
        id: doc.id,
        ...data,
        createdAt: safeDate(data.createdAt),
        updatedAt: safeDate(data.updatedAt),
      };
    });
    callback(folders);
  });
};


