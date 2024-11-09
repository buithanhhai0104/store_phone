import React, { useEffect, useState } from "react";
import { FaApple } from "react-icons/fa6";
import Carousel from "../../components/carousel/Carousel";
import ProductItem from "../../components/ProductItem/ProductItem";
const Mac: React.FC = () => {
  const [dataCarolsel, setDataCarousel] = useState<any[]>([]);
  const [dataMacbooks, setDataMacbooks] = useState<any[]>([]);
  const [activeVersion, setActiveVersion] = useState<string>("Tất cả");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/carousel_macbooks");

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setDataCarousel(result);
      } catch (error) {}
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/macbooks${
            activeVersion !== "Tất cả" ? `?version=${activeVersion}` : ""
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
      <div className="w-[80%] m-auto rounded-2xl">
        <div className="flex justify-center items-center text-[40px] text-[#ffff] mt-[30px] mb-[30px]">
          <FaApple />
          <p>Macbook</p>
        </div>
        <div className=" w-full rounded-2xl">
          <Carousel dataImg={dataCarolsel} />
        </div>
        <ul className="flex gap-[30px] text-[#afb7bd] my-[50px] ">
          {["Tất cả", "Macbook Pro", "Macbook Air"].map((version, index) => {
            return (
              <li
                key={index}
                onClick={() => setActiveVersion(version)}
                className={` flex justify-center items-center py-[20px] px-[30px] text-[15px] cursor-pointer   hover:border-b-[1px] transition duration-500  hover:text-white hover:opacity-75 ${
                  activeVersion === version
                    ? "border-b-[1px] border-white text-white"
                    : null
                }`}
              >
                {version}
              </li>
            );
          })}
        </ul>
        <div className="grid grid-cols-3 gap-[20px] ">
          {dataMacbooks.map((item) => {
            return <ProductItem key={item.id} productData={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Mac;
