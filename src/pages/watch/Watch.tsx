import React, { useEffect, useState } from "react";
import Carousel from "../../components/carousel/Carousel";
import { FaApple } from "react-icons/fa6";
import ProductItem from "../../components/ProductItem/ProductItem";
import { useMediaQuery } from "react-responsive";
import { getDocumentByFieldName } from "../../service/product";
import { ICategory } from "../../type";
import { getCarousel } from "../../service/carousel";

const Watch: React.FC = () => {
  const [carouselData, setCarouselData] = useState<string[]>([]);
  const [dataWatches, setDataWatches] = useState<ICategory[]>([]);
  const [newProducts, setNewProducts] = useState<ICategory[]>([]);
  const [activeVersion, setActiveVersion] = useState<string>("Tất cả");
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    const fetchData = async () => {
      const ipadProducts = await getDocumentByFieldName(
        "products",
        "category",
        "watch"
      );
      if (ipadProducts) {
        setDataWatches(ipadProducts);
        console.log(dataWatches);
      }
    };
    fetchData();

    const fetchDataCarousel = async () => {
      const carouselWatch = await getCarousel();
      setCarouselData(carouselWatch.carousel_watch);
    };

    fetchDataCarousel();
  }, []);

  useEffect(() => {
    const filterData = dataWatches.filter(
      (product) => product.version === activeVersion
    );
    if (activeVersion === "Tất cả") {
      setNewProducts(dataWatches);
    } else {
      setNewProducts(filterData);
    }
  }, [activeVersion, dataWatches]);

  return (
    <div>
      <div
        className={` ${
          isTabletOrMobile ? "w-[95%]" : "w-[80%]"
        } m-auto rounded-2xl`}
      >
        <div className="flex justify-center items-center text-[40px] text-[#ffff] mt-[30px] mb-[30px]">
          <FaApple />
          <p>Watch</p>
        </div>
        <div className=" w-full rounded-2xl">
          <Carousel carouselData={carouselData} />
        </div>
        <div
          className={`flex gap-[30px] text-[#afb7bd] my-[50px]  ${
            isTabletOrMobile ? "overflow-x-scroll" : ""
          } `}
        >
          <ul className="flex py-[10px] space-x-2">
            {["Tất cả", "Apple Watch Series 10", "Apple Watch Series 9"].map(
              (version, index) => {
                return (
                  <li
                    key={index}
                    onClick={() => setActiveVersion(version)}
                    className={`flex justify-center items-center ${
                      version === "Tất cả"
                        ? "w-[60px] h-[40px]"
                        : "w-[150px] h-[40px]"
                    } text-[15px] hover:border-b-[1px] hover:text-white ${
                      activeVersion === version
                        ? `${
                            !isTabletOrMobile
                              ? "border-b-[1px] border-white text-white"
                              : "bg-slate-500 rounded-xl"
                          }`
                        : ""
                    }`}
                  >
                    {version}
                  </li>
                );
              }
            )}
          </ul>
        </div>
        <div
          className={`${
            !isTabletOrMobile
              ? "grid grid-cols-3 gap-[20px]"
              : "grid grid-cols-2 gap-[20px]"
          } `}
        >
          {newProducts.map((item) => {
            return <ProductItem key={item.id} product={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Watch;
