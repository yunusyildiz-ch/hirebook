import {
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
  doc,
  updateDoc,
  deleteDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase/config";
import { auth } from "./firebase/config";

const notesCollection = collection(db, "notes");

export const addNote = async (text) => {
  const user = auth.currentUser;
  if (!user) throw new Error("You must be logged in to add a note.");

  const docRef = await addDoc(notesCollection, {
    text,
    userId: user.uid,
    createdAt: serverTimestamp(),
  });

  return docRef;
};

export const updateNote = async (id, newText) => {
  const noteRef = doc(db, "notes", id);
  await updateDoc(noteRef, {
    text: newText,
    updatedAt: serverTimestamp(),
  });
};

export const deleteNote = async (id) => {
  const noteRef = doc(db, "notes", id);
  await deleteDoc(noteRef);
};

export const subscribeToNotes = (userId, callback) => {
  if (!userId) return () => {};

  const q = query(
    notesCollection,
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const notes = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate?.().toISOString() || null,
          updatedAt: data.updatedAt?.toDate?.().toISOString() || null,
        };
      });
      callback(notes);
    },
    (error) => {
      console.error("Realtime Sync Error:", error.message);
    }
  );
};
