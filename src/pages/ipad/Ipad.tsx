import React, { useEffect, useState } from "react";
import Carousel from "../../components/carousel/Carousel";
import { FaApple } from "react-icons/fa6";
import ProductItem from "../../components/ProductItem/ProductItem";
import { useMediaQuery } from "react-responsive";
import { IProduct } from "../../../type/product";
import { getDocumentByFieldName } from "../../service/product";
import { getCarousel } from "../../service/carousel";

const Ipad: React.FC = () => {
  const [carouselData, setCarouselData] = useState<string[]>([]);
  const [dataIpads, setDataIpads] = useState<IProduct[]>([]);
  const [newProducts, setNewProducts] = useState<IProduct[]>([]);
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
        "ipad"
      );
      if (ipadProducts) {
        setDataIpads(ipadProducts);
      }
    };

    const fetchCarouselData = async () => {
      const carouselIpad = await getCarousel();
      if (carouselIpad) {
        setCarouselData(carouselIpad.carousel_ipad);
      }
    };
    fetchData();
    fetchCarouselData();
  }, []);

  useEffect(() => {
    const filterData = dataIpads.filter(
      (product) => product.version === activeVersion
    );
    if (activeVersion === "Tất cả") {
      setNewProducts(dataIpads);
    } else {
      setNewProducts(filterData);
    }
  }, [activeVersion, dataIpads]);

  return (
    <div>
      <div
        className={` ${
          isTabletOrMobile ? "w-[95%]" : "w-[80%]"
        } m-auto rounded-2xl`}
      >
        <div className="flex justify-center items-center text-[40px] mt-[30px] mb-[30px]">
          <FaApple />
          <p>iPad</p>
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
            {["Tất cả", "iPad Pro", "iPad Air", "iPad Mini"].map(
              (version, index) => {
                return (
                  <li
                    key={index}
                    onClick={() => setActiveVersion(version)}
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

export default Ipad;
