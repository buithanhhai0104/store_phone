import React from "react";
import ProductItem from "../ProductItem/ProductItem";
import SlideProduct from "../slide/SlideProduct";
import { Link } from "react-router-dom";
import { GrNext } from "react-icons/gr";
import { FaApple } from "react-icons/fa6";
import { useMediaQuery } from "react-responsive";

type Configuration = {
  screen: string;
  chip: string;
  ram: string;
  storage: string[];
  camera: string;
  battery: string;
};

interface IProductData {
  postProduct: {
    id: number;
    model: string;
    price_usd: number;
    price_vnd: string;
    image: string;
    promotion_online: boolean;
    version: string;
    configuration: Configuration;
  };
}

interface IProductSectionProps {
  title: string;
  dataSection: IProductData[];
  link: string;
}

const ProductSection: React.FC<IProductSectionProps> = ({
  title,
  dataSection,
  link,
}) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });
  return (
    <div>
      <div
        className={`flex justify-center items-center  ${
          isTabletOrMobile ? "text-[25px]" : "text-[40px]"
        } text-[#ffff] mt-[30px] mb-[30px]`}
      >
        <FaApple />

        <p>{title}</p>
      </div>
      {!isTabletOrMobile ? (
        <SlideProduct dataPhone={dataSection} />
      ) : (
        <div className="grid grid-cols-2 gap-3 w-[90%] m-auto ">
          {dataSection.slice(0, 4).map((item) => {
            return <ProductItem productData={item} />;
          })}
          <Link
            className="col-span-2 text-center text-[#2997ff] flex justify-center items-center gap-2"
            to={link}
          >
            Xem Tất Cả {title}
            <GrNext />
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProductSection;
