import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { db, auth } from "./firebase/config";

const candidatesCollection = collection(db, "candidates");

// ➕ Add Candidate
export const addCandidate = async ({ name, position, status, tags }) => {
  const user = auth.currentUser;
  if (!user) throw new Error("You must be logged in to add a candidate.");

  const newCandidate = {
    userId: user.uid,
    name,
    position,
    status,
    tags,
    createdAt: serverTimestamp(),
  };

  const docRef = await addDoc(candidatesCollection, newCandidate);
  return { id: docRef.id, ...newCandidate };
};

// ✏️ Update Candidate
export const updateCandidate = async (id, { name, position, status, tags }) => {
  const candidateRef = doc(db, "candidates", id);
  await updateDoc(candidateRef, {
    name,
    position,
    status,
    tags,
    updatedAt: serverTimestamp(),
  });
};

// 🗑️ Delete Candidate
export const deleteCandidate = async (id) => {
  const candidateRef = doc(db, "candidates", id);
  await deleteDoc(candidateRef);
};

// 🔄 Subscribe to Realtime Candidates
export const subscribeToCandidates = (userId, callback) => {
  if (!userId) return () => {};

  const q = query(
    candidatesCollection,
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const candidates = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate()?.toISOString() || null,
          updatedAt: data.updatedAt?.toDate()?.toISOString() || null,
        };
      });
      callback(candidates);
    },
    (error) => {
      console.error("🔥 Realtime Sync Error:", error.message);
    }
  );
};
