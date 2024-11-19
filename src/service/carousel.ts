import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { ICarousel } from "../type";

export const getCarousel = async (): Promise<ICarousel> => {
  try {
    const q = collection(db, "carousel_image"); // Truy xuất collection
    const querySnapshot = await getDocs(q); // Lấy tất cả tài liệu từ collection

    // Lấy mảng các đối tượng từ querySnapshot và sử dụng map để thu thập các giá trị
    const carouselData = querySnapshot.docs.map((doc) => doc.data());

    // Tạo mảng carousel_home và carousel_iphone từ dữ liệu thu thập được
    const carousel_home = carouselData.flatMap(
      (data) => data.carousel_home || []
    );
    const carousel_iphone = carouselData.flatMap(
      (data) => data.carousel_iphone || []
    );
    const carousel_ipad = carouselData.flatMap(
      (data) => data.carousel_ipad || []
    );
    const carousel_macbook = carouselData.flatMap(
      (data) => data.carousel_macbook || []
    );
    const carousel_watch = carouselData.flatMap(
      (data) => data.carousel_watch || []
    );

    return {
      carousel_home,
      carousel_iphone,
      carousel_ipad,
      carousel_macbook,
      carousel_watch,
    }; // Trả về dữ liệu đã thu thập được
  } catch (error) {
    console.log("Không lấy được dữ liệu", error);
    return {
      carousel_home: [],
      carousel_iphone: [],
      carousel_ipad: [],
      carousel_macbook: [],
      carousel_watch: [],
    };
  }
};
