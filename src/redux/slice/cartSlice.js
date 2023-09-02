import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  // 아이템들
  cartItems:
    typeof window !== "undefined"
      ? localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : []
      : [],
  // 장바구니 총  갯수
  cartTotalQuantity: 0,
  // 장바구니 총  가격
  cartTotalAmount: 0,
  // 이전 url
  previousUrl: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_TO_CART: (state, action) => {
      const productIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      const increaseCount = action.payload.quantity
        ? action.payload.quantity
        : 1;

      if (productIndex >= 0) {
        state.cartItems[productIndex].cartQuantity += increaseCount;

        toast.success(
          `${action.payload.name} 상품이 장바구니에 추가되었습니다.`
        );
      } else {
        state.cartItems.push({
          ...action.payload,
          cartQuantity: increaseCount,
        });

        toast.success(
          `${action.payload.name} 상품이 장바구니에 추가되었습니다.`
        );
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    CALCULATE_TOTAL_QUANTITY: (state, action) => {
      const array = [];
      state.cartItems.map((item) => {
        const { cartQuantity } = item;
        const quantity = cartQuantity;
        return array.push(quantity);
      });

      const totalQuantity = array.reduce((a, b) => {
        return a + b;
      }, 0);

      state.cartTotalQuantity = totalQuantity;
    },
  },
});

export const { ADD_TO_CART, CALCULATE_TOTAL_QUANTITY } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity;
export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount;

export default cartSlice.reducer;
