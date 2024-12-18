import React, { useEffect, useState } from "react";
import Carousel from "../../components/carousel/Carousel";
import { FaApple } from "react-icons/fa6";
import ProductItem from "../../components/ProductItem/ProductItem";
import { useMediaQuery } from "react-responsive";
import { getDocumentByFieldName } from "../../service/product";
import { getCarousel } from "../../service/carousel";
import { IProduct } from "../../../type/product";

const IPhone: React.FC = () => {
  const [carouselData, setCarouselData] = useState<string[]>([]);
  const [dataIphones, setDataIphones] = useState<IProduct[]>([]);
  const [activeVersion, setActiveVersion] = useState<string>("Tất cả");
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [newProducts, setNewProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    const fetchData = async () => {
      const iphoneProducts = await getDocumentByFieldName(
        "products",
        "category",
        "iphone"
      );
      // iphoneProducts.map((product) => {
      //   product.show = true;
      //   return product;
      // });
      setDataIphones(iphoneProducts);
    };
    const fetchDataCarousel = async () => {
      const carouselMacbook = await getCarousel();
      setCarouselData(carouselMacbook.carousel_iphone);
    };
    fetchData();
    fetchDataCarousel();
  }, []);

  const handleOnClick = (value: string) => {
    // const newProducts = dataIphones.map((product) => {
    //   if (product.version === value || value === "Tất cả") {
    //     product.show = true;
    //   } else {
    //     product.show = false;
    //   }
    //   return product;
    // });
    // console.log(newProducts);
    // setDataIphones(newProducts);
  };

  useEffect(() => {
    const filterdata = dataIphones.filter(
      (product) => product.version === activeVersion
    );
    if (activeVersion === "Tất cả") {
      setNewProducts(dataIphones);
    } else {
      setNewProducts(filterdata);
    }
  }, [activeVersion, dataIphones]);

  return (
    <div>
      <div
        className={` ${
          isTabletOrMobile ? "w-[95%]" : "w-[80%]"
        } m-auto rounded-2xl`}
      >
        <div className="flex justify-center items-center text-[40px]  mt-[30px] mb-[30px]">
          <FaApple />
          <p>iPhone</p>
        </div>
        <div className=" w-full rounded-2xl">
          <Carousel carouselData={carouselData} />
        </div>
        <div
          className={`flex gap-[30px] text-[#afb7bd] my-[50px]  ${
            isTabletOrMobile ? "overflow-x-scroll" : ""
          } `}
        >
          <ul className="flex py-[10px] space-x-2 ">
            {["Tất cả", "iPhone 16", "iPhone 15", "iPhone 14"].map(
              (version, index) => {
                return (
                  <li
                    key={index}
                    onClick={() => {
                      handleOnClick(version);
                      setActiveVersion(version);
                    }}
                    className={`flex justify-center dark:text-white text-black items-center w-[100px] h-[40px] text-[15px] hover:border-b-[1px] cursor-pointer ${
                      activeVersion === version
                        ? `${
                            !isTabletOrMobile
                              ? "border-b-[1px] dark:border-white border-black "
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

export default IPhone;
