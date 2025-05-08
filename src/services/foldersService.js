import { db } from "@/services/firebase/config";
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, where } from "firebase/firestore";

// 📂 Klasör koleksiyonu referansı
const foldersRef = collection(db, "folders");

// ➕ Add Folder
export const addFolder = async (folder) => {
  if (!folder.userId) throw new Error("User ID is required");
  return await addDoc(foldersRef, folder);
};

// ✏️ Update Folder
export const updateFolder = async (id, updates) => {
  const folderDoc = doc(foldersRef, id);
  return await updateDoc(folderDoc, updates);
};

// 🗑️ Delete Folder
export const deleteFolder = async (id) => {
  const folderDoc = doc(foldersRef, id);
  return await deleteDoc(folderDoc);
};

// 🔄 Subscribe to Folders (filtered by userId)
export const subscribeToFolders = (userId, callback) => {
  if (!userId) {
    console.warn("User ID is not available for folder subscription");
    return () => {};
  }

  // 🔥 Kullanıcıya ait klasörleri almak için query oluşturma
  const userFoldersQuery = query(foldersRef, where("userId", "==", userId));

  return onSnapshot(
    userFoldersQuery,
    (snapshot) => {
      const folders = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(folders);
    },
    (error) => {
      console.error("Error loading folders:", error);
    }
  );
};