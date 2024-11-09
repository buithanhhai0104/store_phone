import React from "react";
import { Link } from "react-router-dom";
type Configuration = {
  screen: string;
  chip: string;
  ram: string;
  storage: string;
  camera: string;
  battery: string;
};

interface IProductDataProps {
  productData: {
    id: number;
    model: string;
    price_usd: number;
    price_vnd: string;
    image: string;
    configuration: Configuration;
    promotion_online: boolean;
  };
}

const ProductItem: React.FC<IProductDataProps> = ({ productData }) => {
  return (
    <Link
      to={`/:${productData.model}`}
      key={productData.id}
      className="flex items-center flex-col w-full flex-shrink-0 bg-[#2b2a2a] py-[30px]  rounded-3xl hover:shadow-product m-[4px]"
    >
      <img
        className="w-[250px] h-[250px]"
        src={productData.image}
        alt={productData.model}
      />
      <h3 className="text-[#ffff] my-[20px]">{productData.model}</h3>
      <span className="text-[#ffff]">{productData.price_vnd}</span>
      <span className="text-[#ff9f00]">
        {productData.promotion_online ? "Online giá rẻ quá" : ""}
      </span>
    </Link>
  );
};

export default ProductItem;
