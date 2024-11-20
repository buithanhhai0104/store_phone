import {
  addDoc,
  arrayUnion,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";

export const addComment = async (newComment: any) => {
  try {
    await addDoc(collection(db, "comment"), {
      ...newComment,
    });
  } catch (error) {
    console.log(`Error : ${error}`);
  }
};

export const getComment = async (id: string) => {
  try {
    if (id) {
      const q = query(collection(db, "comment"), where("productId", "==", id));
      const querySnapshot = await getDocs(q);
      let data: any[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ docId: doc.id, ...doc.data() });
      });
      return data;
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

export const updateComment = async (docId: string, newFeedback: any) => {
  try {
    const docRef = doc(db, "comment", docId);
    await updateDoc(docRef, {
      replies: arrayUnion(newFeedback),
    });
  } catch (error) {
    console.log(error);
  }
};
