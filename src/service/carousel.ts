import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
interface ICarousel {
  carousel_home: string[];
  carousel_iphone: string[];
  carousel_ipad: string[];
  carousel_macbook: string[];
  carousel_watch: string[];
}

export const getCarousel = async (): Promise<ICarousel> => {
  try {
    const q = collection(db, "carousel_image");
    const querySnapshot = await getDocs(q);

    const carouselData = querySnapshot.docs.map((doc) => doc.data());

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
    };
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
