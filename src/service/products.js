import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const fetchproductdata = async (id) => {
  try {
    const q = query(collection(db, "products"), where("id", "==", id));
    const querySnapshot = await getDocs(q);
    let data = [];

    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
    return data;
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu:", error);
    return [];
  }
};
