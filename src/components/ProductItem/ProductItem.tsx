import React from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
type Configuration = {
  screen: string;
  chip: string;
  ram: string;
  storage: string[];
  camera: string;
  battery: string;
};

interface IProductDataProps {
  productData: {
    postProduct: {
      id: number;
      model: string;
      price_usd: number;
      price_vnd: string;
      image: string;
      configuration: Configuration;
      promotion_online: boolean;
      version: string;
    };
  };
}

const ProductItem: React.FC<IProductDataProps> = ({ productData }) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });
  return (
    <Link
      to={`/:${productData.postProduct.id}`}
      key={productData.postProduct.id}
      className={`flex items-center flex-col w-full flex-shrink-0 bg-[#2b2a2a] py-[30px] ${
        isTabletOrMobile ? "text-[13px]" : ""
      } rounded-3xl hover:shadow-product m-[4px] `}
    >
      <img
        className={
          !isTabletOrMobile ? "w-[250px] h-[250px]" : "w-[150px] h-[150px]"
        }
        src={productData.postProduct.image}
        alt={productData.postProduct.model}
      />
      <h3 className="text-[#ffff] my-[20px]">
        {productData.postProduct.model}
      </h3>
      <span className="text-[#ffff]">{productData.postProduct.price_vnd}</span>
      <span className="text-[#ff9f00]">
        {productData.postProduct.promotion_online ? "Online giá rẻ quá" : ""}
      </span>
    </Link>
  );
};

export default ProductItem;
