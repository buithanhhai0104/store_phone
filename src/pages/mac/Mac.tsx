import React, { useEffect, useState } from "react";
import { FaApple } from "react-icons/fa6";
import Carousel from "../../components/carousel/Carousel";
import ProductItem from "../../components/ProductItem/ProductItem";
import { useMediaQuery } from "react-responsive";
const Mac: React.FC = () => {
  const [dataCarolsel, setDataCarousel] = useState<any[]>([]);
  const [dataMacbooks, setDataMacbooks] = useState<any[]>([]);
  const [activeVersion, setActiveVersion] = useState<string>("Tất cả");
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/carousel");

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setDataCarousel(result.carousel_macbooks);
      } catch (error) {}
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/products${
            activeVersion !== "Tất cả"
              ? `?version=${activeVersion}`
              : "?category=macbook"
          }`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setDataMacbooks(result);
      } catch (error) {}
    };

    fetchData();
  }, [activeVersion]);

  return (
    <div>
      <div
        className={` ${
          isTabletOrMobile ? "w-[95%]" : "w-[80%]"
        } m-auto rounded-2xl`}
      >
        <div className="flex justify-center items-center text-[40px] text-[#ffff] mt-[30px] mb-[30px]">
          <FaApple />
          <p>Macbook</p>
        </div>
        <div className=" w-full rounded-2xl">
          <Carousel dataImg={dataCarolsel} />
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
                  className={`flex justify-center items-center w-[100px] h-[40px] text-[15px] hover:border-b-[1px] hover:text-white ${
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
          {dataMacbooks.map((item) => {
            return <ProductItem key={item.id} productData={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Mac;
