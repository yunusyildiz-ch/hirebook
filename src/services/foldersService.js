import { db } from "@/services/firebase/config";
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from "firebase/firestore";

// 📂 Klasör koleksiyonu referansı
const foldersRef = collection(db, "folders");

// ➕ Add Folder
export const addFolder = async (folder) => {
    if (!folder.userId) throw new Error("User ID is required");
    return await addDoc(collection(db, "folders"), folder);
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

// 🔄 Subscribe to Folders
export const subscribeToFolders = (userId, callback) => {
  return onSnapshot(foldersRef, (snapshot) => {
    const folders = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    callback(folders);
  });
};