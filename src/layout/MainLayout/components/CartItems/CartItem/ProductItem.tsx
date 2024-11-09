import React from "react";
import { useDispatch } from "react-redux";
import { HiMiniXMark } from "react-icons/hi2";
import { removeFromCart } from "../../../../../redux/cartSlice";
import { addQuantity } from "../../../../../redux/cartSlice";
import { reduceQuantity } from "../../../../../redux/cartSlice";
interface ProductItemProps {
  productData: {
    id: string;
    quantity: number;
    color: string;
    img: string;
    version: string;
    price?: string;
    model?: string;
  };
}

const ProductItem: React.FC<ProductItemProps> = ({ productData }) => {
  const dispatch = useDispatch();

  const handleRemoveItem = () => {
    dispatch(
      removeFromCart({
        id: productData.id,
      })
    );
  };
  const handleAddQuantity = () => {
    dispatch(
      addQuantity({
        id: productData.id,
      })
    );
  };
  const handleReduceQuantity = () => {
    dispatch(
      reduceQuantity({
        id: productData.id,
      })
    );
  };
  return (
    <div className="flex items-center gap-[20px] border-b-[1px] ">
      <div className="flex flex-col items-center gap-[10px]   ">
        <img
          className="w-[80px] h-[80px]"
          src={productData.img}
          alt={productData.model}
        />
        <button
          onClick={handleRemoveItem}
          className="flex items-center text-[#ffff]   my-[4px] gap-[1px] bg-custom-gradient rounded  px-[8px]"
        >
          <HiMiniXMark className="text-[20px]" />
          XÓA
        </button>
      </div>
      <div className="flex flex-col gap-[10px] w-full">
        <div className="flex justify-between">
          <h3>
            {productData.model} {productData.version}
          </h3>
          <span>{productData.price}</span>
        </div>
        <p className="w-[300px] text-[14px] font-medium">
          Thu cũ Đổi mới: Giảm thêm đến 2,000,000 (Không kèm ưu đãi thanh toán
          qua cổng, mua kèm)
        </p>
        <div className=" flex justify-between mb-[20px]">
          <span className=" w-fit p-[5px] border-[2px] border-[#e5e5e5] rounded ">
            Màu: {productData.color}
          </span>
          <div className="flex items-center gap-[5px]">
            <button
              onClick={handleReduceQuantity}
              className=" flex items-center justify-center w-[24px] h-[24px] border-[2px] border-[#e5e5e5] "
            >
              -
            </button>
            <span className=" flex justify-center items-center bg-[#f5f5f7] w-[24px] h-[24px] ">
              {productData.quantity}
            </span>
            <button
              onClick={handleAddQuantity}
              className=" flex items-center justify-center w-[24px] h-[24px] border-[2px] border-[#e5e5e5] "
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
