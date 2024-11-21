import React, { useEffect, useState } from "react";
import Carousel from "../../components/carousel/Carousel";
import ProductSection from "../../components/ProductSection/ProductSection";
import config from "../../config";
import { getProducts } from "../../service/product";
import { ICategory } from "../../type";
import { getCarousel } from "../../service/carousel";

const Home: React.FC = () => {
  const [carouselData, setCarouselData] = useState<string[]>([]);
  const [productsData, setproductsData] = useState<ICategory[]>([]);
  // useEffect(() => {
  //   const fetchCategoryData = async (
  //     url: string,
  //     setData: React.Dispatch<React.SetStateAction<any>>
  //   ) => {
  //     try {
  //       const response = await fetch(url);
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       const result = await response.json();
  //       setData(result);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchCategoryData("http://localhost:3001/carousel", setcarouselData);
  //   fetchCategoryData(
  //     "http://localhost:3001/products?category=iphone",
  //     setDataIphones
  //   );
  //   fetchCategoryData(
  //     "http://localhost:3001/products?category=macbook",
  //     setDataMacbooks
  //   );
  //   fetchCategoryData(
  //     "http://localhost:3001/products?category=watch",
  //     setDataWatches
  //   );
  //   fetchCategoryData(
  //     "http://localhost:3001/products?category=ipad",
  //     setDataIpads
  //   );

  // }, []);

  useEffect(() => {
    const fetchProductData = async () => {
      const productsData = await getProducts();
      if (productsData.length) {
        setproductsData(productsData);
      }
    };
    const fetchCarouselData = async () => {
      const carouselDatas = await getCarousel();
      if (carouselDatas) {
        setCarouselData(carouselDatas.carousel_home);
      }
    };
    fetchCarouselData();
    fetchProductData();
  }, []);

  return (
    <div>
      {carouselData && <Carousel carouselData={carouselData} />}
      {productsData.length > 0 && (
        <>
          <ProductSection
            dataSection={productsData.filter(
              (product) => product.category === "iphone"
            )}
            title={"iPhone"}
            link={config.routes.iphone}
          />
          <ProductSection
            dataSection={productsData.filter(
              (product) => product.category === "macbook"
            )}
            title={"Macbook"}
            link={config.routes.macbook}
          />
          <ProductSection
            dataSection={productsData.filter(
              (product) => product.category === "ipad"
            )}
            title={"iPad"}
            link={config.routes.ipad}
          />
          <ProductSection
            dataSection={productsData.filter(
              (product) => product.category === "watch"
            )}
            title={"Watch"}
            link={config.routes.watch}
          />
        </>
      )}
    </div>
  );
};

export default Home;
