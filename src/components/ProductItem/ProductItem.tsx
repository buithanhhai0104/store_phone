import React from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { IProduct } from "../../../type/product";

interface IProductDataProps {
  product: IProduct;
}

const ProductItem: React.FC<IProductDataProps> = ({ product }) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });
  return (
    <Link
      to={`/:${product.id}`}
      key={product.id}
      className={`flex items-center flex-col w-full flex-shrink-0  bg-[#2b2a2a] dark:bg-white text-white dark:text-black py-[30px] ${
        isTabletOrMobile ? "text-[13px]" : ""
      } rounded-3xl hover:shadow-product m-[4px] `}
    >
      <img
        className={
          !isTabletOrMobile ? "w-[250px] h-[250px]" : "w-[150px] h-[150px]"
        }
        src={product.image}
        alt={product.model}
      />
      <h3 className=" my-[20px]">{product.model}</h3>
      <span>{product.price_vnd}</span>
      <span className="text-[#ff9f00]">{"Online giá rẻ quá"}</span>
    </Link>
  );
};

export default ProductItem;
