import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: string;
  quantity: number;
  color: string;
  img: string;
  version: string;
  price?: string;
  model?: string;
}

interface CartState {
  items: CartItem[];
  totalPrice: string;
}

const initialState: CartState = {
  items: JSON.parse(localStorage.getItem("cartItems") || "[]"),
  totalPrice: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const secondItem: CartItem = {
        id: action.payload.id,
        quantity: 1,
        color: action.payload.color,
        img: action.payload.img,
        version: action.payload.version,
        price: action.payload.price,
        model: action.payload.model,
      };

      const existingSecondItem = state.items.find(
        (item) =>
          item.model === secondItem.model &&
          item.color === secondItem.color &&
          item.version === secondItem.version
      );

      if (existingSecondItem) {
        existingSecondItem.quantity += secondItem.quantity;
      } else if (!existingSecondItem) {
        // Thêm sản phẩm mới
        state.items.push({
          ...action.payload,
          quantity: 1,
        });

        // Tính tổng giá trị giỏ hàng
        const totalprice = (state.totalPrice = state.items
          .reduce((total, item) => {
            const itemPrice = parseFloat(item.price || "0");
            return total + itemPrice * item.quantity;
          }, 0)
          .toFixed(3));

        const [integerPart, decimalPart] = totalprice.split(".");

        let formattedDecimal = decimalPart.slice(0, 3);
        let formattedNumber = `${integerPart}.${formattedDecimal}.000đ`;
        state.totalPrice = formattedNumber;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    removeFromCart: (state, action: PayloadAction<{ id: string }>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);

      // Tính tổng giá trị giỏ hàng
      const totalprice = (state.totalPrice = state.items
        .reduce((total, item) => {
          const itemPrice = parseFloat(item.price || "0");
          return total + itemPrice * item.quantity;
        }, 0)
        .toFixed(3));

      const [integerPart, decimalPart] = totalprice.split(".");

      let formattedDecimal = decimalPart.slice(0, 3);
      let formattedNumber = `${integerPart}.${formattedDecimal}.000đ`;
      state.totalPrice = formattedNumber;

      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    addQuantity: (state, action: PayloadAction<{ id: string }>) => {
      const addProductItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (addProductItem) {
        addProductItem.quantity += 1;

        // Tính tổng giá trị giỏ hàng
        const totalprice = (state.totalPrice = state.items
          .reduce((total, item) => {
            const itemPrice = parseFloat(item.price || "0");
            return total + itemPrice * item.quantity;
          }, 0)
          .toFixed(3));

        const [integerPart, decimalPart] = totalprice.split(".");

        let formattedDecimal = decimalPart.slice(0, 3);
        let formattedNumber = `${integerPart}.${formattedDecimal}.000đ`;
        state.totalPrice = formattedNumber;
      }
    },
    reduceQuantity: (state, action: PayloadAction<{ id: string }>) => {
      const reduceProductItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (reduceProductItem && reduceProductItem.quantity > 1) {
        reduceProductItem.quantity -= 1;

        // Tính tổng giá trị giỏ hàng
        const totalprice = (state.totalPrice = state.items
          .reduce((total, item) => {
            const itemPrice = parseFloat(item.price || "0");
            return total + itemPrice * item.quantity;
          }, 0)
          .toFixed(3));

        const [integerPart, decimalPart] = totalprice.split(".");

        let formattedDecimal = decimalPart.slice(0, 3);
        let formattedNumber = `${integerPart}.${formattedDecimal}.000đ`;
        state.totalPrice = formattedNumber;
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  addQuantity,
  reduceQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
