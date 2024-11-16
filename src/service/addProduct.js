import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

export const fetchaddproduct = async (postProduct) => {
  try {
    const docRef = await addDoc(collection(db, "products"), {
      postProduct,
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
