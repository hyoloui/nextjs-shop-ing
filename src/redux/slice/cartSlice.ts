import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import type { TCartItems } from "@/types";
import type { RootState } from "@/redux/store";

interface ICartState {
  cartItems: TCartItems[];
  cartTotalQuantity: number;
  cartTotalAmount: number;
  previousUrl: string;
}

const initialState: ICartState = {
  // 아이템들
  cartItems:
    typeof window !== "undefined"
      ? localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems")!)
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

    CALCULATE_TOTAL_QUANTITY: (state) => {
      const array: number[] = [];
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

    CALCULATE_SUBTOTAL: (state) => {
      const array: number[] = [];

      state.cartItems.map((item) => {
        const { cartQuantity, price } = item;

        const cartItemAmount = cartQuantity * price;
        return array.push(cartItemAmount);
      });

      const totalAmount = array.reduce((a, b) => {
        return a + b;
      }, 0);

      state.cartTotalAmount = totalAmount;
    },

    SAVE_URL: (state, action) => {
      state.previousUrl = action.payload;
    },

    DECREASE_CART: (state, action) => {
      const productIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (productIndex > 1) {
        state.cartItems[productIndex].cartQuantity -= 1;
        toast.success(`${action.payload.name} 상품의 수량이 1 감소하였습니다.`);
      }
      if (productIndex === 1) {
        const newCartItems = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );
        state.cartItems = newCartItems;
        toast.success(
          `${action.payload.name} 상품이 장바구니에서 삭제되었습니다.`
        );
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    REMOVE_FROM_CART: (state, action) => {
      const newCartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      state.cartItems = newCartItems;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      toast.success(
        `${action.payload.name} 상품이 장바구니에서 삭제되었습니다.`
      );
    },

    CLEAR_CART: (state) => {
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      toast.success("장바구니가 비워졌습니다.");
    },
  },
});

export const {
  ADD_TO_CART,
  CALCULATE_TOTAL_QUANTITY,
  CALCULATE_SUBTOTAL,
  SAVE_URL,
  DECREASE_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
} = cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart.cartItems;
export const selectCartTotalQuantity = (state: RootState) =>
  state.cart.cartTotalQuantity;
export const selectCartTotalAmount = (state: RootState) =>
  state.cart.cartTotalAmount;

export default cartSlice.reducer;
