import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "./config";

const testWrite = async () => {
  try {
    await addDoc(collection(db, "test-notes"), {
      title: "Test Note",
      createdAt: new Date(),
    });
    console.log("Document successfully written!");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const testRead = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "test-notes"));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  } catch (e) {
    console.error("Error reading documents: ", e);
  }
};

export { testWrite, testRead };