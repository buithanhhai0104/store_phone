import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const addProduct = async (product: any) => {
  try {
    await addDoc(collection(db, "products"), {
      ...product,
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getProducts = async (): Promise<any[]> => {
  try {
    const q = collection(db, "products");

    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
    return data;
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu:", error);
    return [];
  }
};

export const getDocumentByFieldName = async (
  collectionName: string,
  type: string,
  id: any
) => {
  try {
    const q = query(collection(db, collectionName), where(type, "==", id));

    const querySnapshot = await getDocs(q);
    let data: any[] = [];

    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data() });
    });

    return data;
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu theo category:", error);
    return [];
  }
};
