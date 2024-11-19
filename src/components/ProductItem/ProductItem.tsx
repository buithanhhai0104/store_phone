import React from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { ICategory } from "../../type";

interface IProductDataProps {
  product: ICategory;
}

const ProductItem: React.FC<IProductDataProps> = ({ product }) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });
  return (
    <Link
      to={`/:${product.id}`}
      key={product.id}
      className={`flex items-center flex-col w-full flex-shrink-0 bg-[#2b2a2a] py-[30px] ${
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
      <h3 className="text-[#ffff] my-[20px]">{product.model}</h3>
      <span className="text-[#ffff]">{product.price_vnd}</span>
      <span className="text-[#ff9f00]">
        {product.promotion_online ? "Online giá rẻ quá" : ""}
      </span>
    </Link>
  );
};

export default ProductItem;
