import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
export const addEvalute = async (newEvaluate: any) => {
  try {
    await addDoc(collection(db, "evaluate"), {
      ...newEvaluate,
    });
  } catch (error) {
    console.log(`lỗi rồi : ${error}`);
  }
};

export const getEvalute = async (id: string) => {
  try {
    if (id) {
      const q = query(collection(db, "evaluate"), where("productId", "==", id));
      const querySnapshot = await getDocs(q);
      let data: any[] = [];

      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data() });
      });
      return data;
    }
  } catch (error) {
    console.error("Error fetching evaluate data:", error);
    return null;
  }
};
