import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import config from "../../../../config";
import { IoIosArrowBack } from "react-icons/io";
import ProductItem from "./CartItem/ProductItem";
import { RootState } from "../../../../redux/store";
import { BsFillCartXFill } from "react-icons/bs";

const CartItems: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);
  return cartItems.length >= 1 ? (
    <section className="max-w-[1000px] m-auto   ">
      <div className="flex flex-col bg-custom-gradient mt-[50px] p-[10px] rounded-2xl ">
        <div className="flex justify-between mb-[20px]  mt-[20px] text-[#ffff] font-semibold ">
          <Link className="flex items-center" to={config.routes.home}>
            <IoIosArrowBack />
            <span>Trở về trang chủ</span>
          </Link>
          <span className="text-[18px]">Giỏ hàng của bạn</span>
        </div>
        <div className="rounded-t-xl p-[10px] shadow-product mt-[5px] bg-[#ffff]">
          <ul className="flex flex-col gap-[20px] ">
            {cartItems.map((item) => {
              return (
                <li key={item.id}>
                  <ProductItem productData={item} />
                </li>
              );
            })}
          </ul>
          <div className="flex justify-between p-[5px] mt-[10px]">
            <b>Tạm Tính :</b>
            <b>{totalPrice}</b>
          </div>
        </div>
        <div className="flex flex-col gap-[10px] bg-[#ffff]  p-[10px]  shadow-product mt-[5px]">
          <b>Thông tin khách hàng</b>
          <div className="flex gap-[20px]">
            <span className="flex justify-center items-center gap-[5px]">
              <input type="checkbox" />
              <p className="pb-[2px]">Anh</p>
            </span>
            <span className="flex justify-center items-center gap-[5px]">
              <input type="checkbox" />
              <p className="pb-[2px]">Chị</p>
            </span>
          </div>
          <div className="w-[72%] flex gap-[20px] ">
            <input
              className="w-[49%] h-[40px] border-[1px] border-[#b6b5b5] rounded-xl pl-[10px]"
              type="text"
              placeholder="Họ và Tên"
            ></input>
            <input
              className="w-[49%] h-[40px] border-[1px] border-[#b6b5b5] rounded-xl pl-[10px]"
              type="text"
              placeholder="Số điện thoại"
            ></input>
          </div>
        </div>
        <div className="flex flex-col gap-[10px] bg-[#ffff]  p-[10px]  shadow-product mt-[5px]">
          <b>Chọn hình thức nhận hàng</b>
          <div className="  flex gap-[20px]">
            <span className="flex justify-center items-center gap-[5px]">
              <input type="checkbox" />
              <p className="pb-[2px]">Giao tận nơi</p>
            </span>
            <span className="flex justify-center items-center gap-[5px]">
              <input type="checkbox" />
              <p className="pb-[2px]">Nhận tại cửa hàng</p>
            </span>
          </div>
          <div className="w-[80%] grid grid-cols-2 content-center gap-[20px] ">
            <div className="flex ">
              <input
                className="w-[80%] h-[40px] border-[1px] border-[#b6b5b5] rounded-xl pl-[10px]"
                type="text"
                placeholder="Thành Phố / Tỉnh"
              ></input>
            </div>
            <div className="flex ">
              <input
                className="w-[80%] h-[40px] border-[1px] border-[#b6b5b5] rounded-xl pl-[10px]"
                type="text"
                placeholder="Quận / Huyện"
              ></input>
            </div>
            <div className="flex ">
              <input
                className="w-[80%] h-[40px] border-[1px] border-[#b6b5b5] rounded-xl pl-[10px]"
                type="text"
                placeholder="Phường / Xã"
              ></input>
            </div>
            <div className="flex ">
              <input
                className="w-[80%] h-[40px] border-[1px] border-[#b6b5b5] rounded-xl pl-[10px]"
                type="text"
                placeholder="Địa chỉ cụ thể"
              ></input>
            </div>
          </div>
          <b>Ghi chú</b>
          <div>
            <input
              className="w-[72%] h-[40px] border-[1px] border-[#b6b5b5] rounded-xl pl-[10px]"
              type="text"
              placeholder="Nhập ghi chú nếu có"
            />
          </div>
        </div>
        <div className="flex flex-col gap-[10px] bg-[#ffff]  p-[10px]  shadow-product mt-[5px]">
          <div>
            <b>Tổng tiền: {totalPrice}</b>
          </div>
          <span className="flex  gap-[5px]">
            <input type="checkbox" />
            <p className="pb-[2px]">
              Tôi đồng ý với{" "}
              <b className="text-[#288ad6]">Chính sách xử lý dữ liệu cá nhân</b>{" "}
              của TopZone
            </p>
          </span>
          <button className="flex w-[80%] justify-center items-center text-[#ffff] bg-[#288ad6] p-[20px] rounded-xl m-auto">
            <b>Đặt hàng</b>
          </button>
          <p className="text-center">
            Bạn có thể lựa chọn các hình thức thanh toán ở bước sau
          </p>
        </div>
      </div>
    </section>
  ) : (
    <div className="w-full h-[100vh] flex flex-col gap-[30px]  items-center mt-[50px]">
      <BsFillCartXFill className="text-[200px] text-red-500" />
      <b className="text-[30px] text-red-500">
        Giỏ hàng của bạn chưa có sản phẩm nào!
      </b>
    </div>
  );
};

export default CartItems;
