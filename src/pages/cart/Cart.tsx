import React, { useEffect } from "react";
import CartItems from "../../layout/components/cartItems/CartItems";

const Cart: React.FC = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
  return (
    <div className="">
      <CartItems />
    </div>
  );
};

export default Cart;
