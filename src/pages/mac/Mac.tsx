import React, { useEffect, useState } from "react";
import { FaApple } from "react-icons/fa6";
import Carousel from "../../components/carousel/Carousel";
import ProductItem from "../../components/ProductItem/ProductItem";
import { useMediaQuery } from "react-responsive";
import { getDocumentByFieldName } from "../../service/product";
import { IProduct } from "../../../type/product";
import { getCarousel } from "../../service/carousel";
const Mac: React.FC = () => {
  const [carouselData, setCarouselData] = useState<string[]>([]);
  const [dataMacbooks, setDataMacbooks] = useState<IProduct[]>([]);
  const [newProducts, setNewProducts] = useState<IProduct[]>([]);
  const [activeVersion, setActiveVersion] = useState<string>("Tất cả");
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    const fetchData = async () => {
      const macbookProducts = await getDocumentByFieldName(
        "products",
        "category",
        "macbook"
      );
      if (macbookProducts) {
        setDataMacbooks(macbookProducts);
      }
    };
    fetchData();
    const fetchCarouselData = async () => {
      const carouselMacbook = await getCarousel();
      if (carouselMacbook) {
        setCarouselData(carouselMacbook.carousel_macbook);
      }
    };
    fetchCarouselData();
  }, []);

  useEffect(() => {
    const filterData = dataMacbooks.filter(
      (product) => product.version === activeVersion
    );

    if (activeVersion === "Tất cả") {
      setNewProducts(dataMacbooks);
    } else {
      setNewProducts(filterData);
    }
  }, [dataMacbooks, activeVersion]);

  return (
    <div>
      <div
        className={` ${
          isTabletOrMobile ? "w-[95%]" : "w-[80%]"
        } m-auto rounded-2xl`}
      >
        <div className="flex justify-center items-center text-[40px]  mt-[30px] mb-[30px]">
          <FaApple />
          <p>Macbook</p>
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
            {["Tất cả", "Macbook Pro", "Macbook Air"].map((version, index) => {
              return (
                <li
                  key={index}
                  onClick={() => setActiveVersion(version)}
                  className={`flex justify-center dark:text-white text-black items-center w-[100px] h-[40px] text-[15px] hover:border-b-[1px] cursor-pointer ${
                    activeVersion === version
                      ? `${
                          !isTabletOrMobile
                            ? "border-b-[1px] dark:border-white text-black border-black  "
                            : "bg-slate-500 rounded-xl"
                        }`
                      : ""
                  }`}
                >
                  {version}
                </li>
              );
            })}
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

export default Mac;
