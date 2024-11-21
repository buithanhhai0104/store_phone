import React from "react";
import ProductItem from "../ProductItem/ProductItem";
import SlideProduct from "../slide/SlideProduct";
import { Link } from "react-router-dom";
import { GrNext } from "react-icons/gr";
import { FaApple } from "react-icons/fa6";
import { useMediaQuery } from "react-responsive";
import { ICategory } from "../../type";

interface IProductSectionProps {
  title: string;
  dataSection: ICategory[];
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
        } bg-white dark:bg-gray-900 text-black dark:text-white mt-[30px] mb-[30px]`}
      >
        <FaApple />

        <p>{title}</p>
      </div>
      {!isTabletOrMobile ? (
        <SlideProduct products={dataSection} />
      ) : (
        <div className="grid grid-cols-2 gap-3 w-[90%] m-auto ">
          {dataSection.slice(0, 4).map((item) => {
            return <ProductItem product={item} />;
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
