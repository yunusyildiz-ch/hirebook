import {
    collection,
    addDoc,
    onSnapshot,
    serverTimestamp,
    query,
    orderBy,
    where,
  } from "firebase/firestore";
  import { db } from "../firebase/config";
  import { auth } from "../firebase/config"; // ✅ eklendi
  
  export const addNote = async (text) => {
    const user = auth.currentUser;
    if (!user) throw new Error("Not authenticated");
  
    await addDoc(collection(db, "notes"), {
      text,
      userId: user.uid,
      createdAt: serverTimestamp(),
    });
  };
  
  export const subscribeToNotes = (callback) => {
    const user = auth.currentUser;
    if (!user) return;
  
    const q = query(
      collection(db, "notes"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );
  
    return onSnapshot(q, (snapshot) => {
      const notes = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(notes);
    });
  };