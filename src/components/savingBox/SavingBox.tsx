import React, { useState, useEffect } from "react";
import config from "../../config";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { v4 as uuidv4 } from "uuid";

type SavingBoxProps = {
  dataDetail:
    | {
        id: number;
        price_vnd: string;
        model: string;
      }
    | undefined;
  productColor: string;
  productImg: string;
  productVersion: string;
};

const SavingBox: React.FC<SavingBoxProps> = ({
  dataDetail,
  productColor,
  productImg,
  productVersion,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [productInspection, setProductInspection] = useState<boolean>(false);

  const handleAddToCart = () => {
    if (productColor === "" || productVersion === "") {
      alert("Vui lòng chọn đầy đủ thông tin sản phẩm");
      setProductInspection(false);
    } else {
      setProductInspection(true);
      dispatch(
        addToCart({
          id: uuidv4(),
          quantity: 1,
          img: productImg,
          version: productVersion,
          color: productColor,
          model: dataDetail?.model,
          price: dataDetail?.price_vnd,
        })
      );
    }
  };

  useEffect(() => {
    if (productInspection) {
      navigate(config.routes.cart);
    }
  }, [productInspection, navigate]);

  return (
    <div className="flex flex-col w-full bg-custom-gradient rounded-2xl mt-[20px] ">
      <div className="flex justify-between bg-promotion rounded-2xl text-[#ffff] py-[15px] px-[10px] ">
        <div className="flex flex-col">
          <b className="text-[17px] font-normal">Online Giá Rẻ Quá</b>
          <strong className="text-[24px]">{dataDetail?.price_vnd}</strong>
        </div>
        <div className="flex flex-col text-[14px] font-semibold">
          <span>Kết thúc vào</span>
          <span>23:59 | 30/11</span>
          <span>Tại Hồ Chí Minh</span>
        </div>
      </div>
      <div className="flex flex-col mx-[5px] mb-[5px] rounded bg-[#2f3033] p-[10px]   ">
        <div className="flex flex-col border-dashed mb-[20px] ">
          <p className="text-[#ffff] mb-[20px] ">
            Giá khuyến mãi có thể kết thúc sớm hơn dự kiến
          </p>
          <div className="flex w-fit  mb-[20px] items-center bg-[#fffbe5] py-[5px] px-[10px] rounded-full">
            <img
              className="w-[24px] h-[24px]"
              src="https://cdnv2.tgdd.vn/webmwg/2024/tz/images/promote_loyalty/logo.png"
              alt="logo"
            />
            <p className="text-[14px] ">
              <b className="mr-1 ml-2">+17.390</b>
              điểm tích lũy Quà tặng VIP
            </p>
          </div>
        </div>
        <ul className="text-[#ffff] list-disc list-inside leading-relaxed  border-b-[1px] pb-[20px] mb-[20px] ">
          <li>Giao hàng nhanh chóng (tuỳ khu vực)</li>
          <li>Mỗi số điện thoại chỉ mua 3 sản phẩm trong 1 tháng</li>
          <li>Giá và khuyến mãi có thể kết thúc sớm</li>
        </ul>
        <div className="flex flex-col gap-[10px]">
          <button
            onClick={handleAddToCart}
            className="flex w-full justify-center items-center text-[#ffff] bg-[#d43232] p-[20px] rounded-xl"
          >
            MUA NGAY VỚI GIÁ {dataDetail?.price_vnd}
          </button>
          <div className="flex gap-[10px] text-[#ffff]">
            <Link
              className=" flex flex-col items-center w-[49%] p-[10px] bg-[#0071e3] rounded-xl"
              to="/"
            >
              <b>Mua trả góp 0%</b>
              <p>qua công ty tài chính</p>
            </Link>
            <Link
              className=" flex flex-col items-center w-[49%] p-[10px] bg-[#0071e3] rounded-xl"
              to="/"
            >
              <b>Mua trả góp 0% qua thẻ </b>
              <p>Visa, Mastercard, JCB, Amex</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavingBox;
