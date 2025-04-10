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
  import { db, auth } from "@/services/firebase/config";
  
  const tasksCollection = collection(db, "tasks");
  
  export const addTask = async ({ title, description, status, tags, project }) => {
    const user = auth.currentUser;
    if (!user) throw new Error("You must be logged in to add a task.");
  
    const docRef = await addDoc(tasksCollection, {
      userId: user.uid,
      title,
      description,
      status,
      tags,
      project,
      createdAt: serverTimestamp(),
    });
  
    return docRef;
  };
  
  export const updateTask = async (id, { title, description, status, tags, project }) => {
    const taskRef = doc(db, "tasks", id);
    await updateDoc(taskRef, {
      title,
      description,
      status,
      tags,
      project,
      updatedAt: serverTimestamp(),
    });
  };
  
  export const deleteTask = async (id) => {
    const taskRef = doc(db, "tasks", id);
    await deleteDoc(taskRef);
  };
  
  export const subscribeToTasks = (userId, callback) => {
    if (!userId) return () => {};
  
    const q = query(
      tasksCollection,
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );
  
    return onSnapshot(
      q,
      (snapshot) => {
        const tasks = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate()?.toISOString() || null,
            updatedAt: data.updatedAt?.toDate()?.toISOString() || null,
          };
        });
        callback(tasks);
      },
      (error) => {
        console.error("Realtime sync error:", error.message);
      }
    );
  };