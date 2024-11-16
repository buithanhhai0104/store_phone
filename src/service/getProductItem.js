import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const fetchProductItem = async (id) => {
  try {
    const q = query(
      collection(db, "products"),
      where(`postProduct.id`, "==", id)
    );

    const querySnapshot = await getDocs(q);
    let data = [];

    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data() });
    });

    return data;
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu theo category:", error);
    return [];
  }
};