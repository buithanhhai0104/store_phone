import React, { useEffect, useState } from "react";
import Carousel from "../../components/carousel/Carousel";
import ProductSection from "../../components/ProductSection/ProductSection";
import config from "../../config";
import { fetchProductsByCategory } from "../../service/getProducts";

interface ICaterory {
  postProduct: {
    id: number;
    model: string;
    version: string;
    price_usd: number;
    price_vnd: string;
    image: string;
    configuration: {
      screen: string;
      chip: string;
      ram: string;
      storage: string[];
      camera: string;
      battery: string;
    };
    promotion_online: boolean;
    colors: {
      color_id: string;
      color_name: string;
      color_img: string;
    };
  };
}

interface Icarousel {
  carouselhome: {
    id: number;
    carousel_img: string;
  }[];
}

const Home: React.FC = () => {
  const [dataCarousel, setDataCarousel] = useState<Icarousel>();
  const [dataIphones, setDataIphones] = useState<ICaterory[]>([]);
  const [dataMacbooks, setDataMacbooks] = useState<ICaterory[]>([]);
  const [dataIpads, setDataIpads] = useState<ICaterory[]>([]);
  const [dataWatches, setDataWatches] = useState<ICaterory[]>([]);

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

  //   fetchCategoryData("http://localhost:3001/carousel", setDataCarousel);
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
    const fetchData = async () => {
      const productsDataIphone = await fetchProductsByCategory("iphone");
      const productsDataMacbook = await fetchProductsByCategory("macbook");
      setDataIphones(productsDataIphone);
      setDataMacbooks(productsDataMacbook);
    };

    fetchData();
  }, []);

  return (
    <div>
      {dataCarousel && <Carousel dataImg={dataCarousel.carouselhome} />}
      <>
        <ProductSection
          dataSection={dataIphones}
          title={"iPhone"}
          link={config.routes.iphone}
        />
        <ProductSection
          dataSection={dataMacbooks}
          title={"Macbook"}
          link={config.routes.mac}
        />
        <ProductSection
          dataSection={dataIpads}
          title={"iPad"}
          link={config.routes.ipad}
        />
        <ProductSection
          dataSection={dataWatches}
          title={"Watch"}
          link={config.routes.watch}
        />
      </>
    </div>
  );
};

export default Home;
