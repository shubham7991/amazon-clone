// import { createSlice } from "@reduxjs/toolkit";
// import { RootState } from './index'
// import { act } from "react";
// interface CartState {
//   cart: any[];
// }

// const initialState: CartState = {
//   cart: [],
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     // multiple actions can be added here
//     addToCart: (state, action) => {
//       const isPresent=state.cart.find((item:any)=>{
//         return item.id===action.payload.id;
//       })
//       if(isPresent){
//         state.cart=state.cart.map((item:any)=>{
//             return item.id===action.payload.id ? {...item, quantity: item.quantity+1} :item;
//         })
//       }else{
//          state.cart.push({...action.payload,quantity:1});
//       }
//     },
//     removeFromTheCart:(state,action)=>{
//         state.cart=state.cart.filter((item:any)=>{
//            return item.id !== action.payload;
//         })
//     },
//     incrementQuantity:(state,action)=>{
//         state.cart=state.cart.map((item:any)=>{
//            return item.id===action.payload.id ? {...item, quantity: item.quantity+1} :item;
//         })
//     },
//     decrementQuantity:(state,action)=>{
//         state.cart=state.cart.map((item:any)=>{
//             return item.id===action.payload.id ? {...item, quantity: item.quantity-1} :item;
//         })
//     },
//   },
// });

// export const { addToCart,removeFromTheCart,incrementQuantity,decrementQuantity} = cartSlice.actions;


// export const getCart = (state: RootState) => state.cart.cart

// export default cartSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./index";

interface CartItem {
  id: string | number;
  title: string;
  price: number;
  image?: string;
  quantity: number;
}

interface CartState {
  cart: CartItem[];
}

const initialState: CartState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, "quantity">>) => {
      const item = state.cart.find(p => p.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },

    removeFromTheCart: (state, action: PayloadAction<string | number>) => {
      state.cart = state.cart.filter(item => item.id !== action.payload);
    },

    incrementQuantity: (state, action: PayloadAction<{ id: string | number }>) => {
      const item = state.cart.find(p => p.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      }
    },

    decrementQuantity: (state, action: PayloadAction<{ id: string | number }>) => {
      const item = state.cart.find(p => p.id === action.payload.id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    clearAllCart:(state)=>{
      state.cart=[]
    }
  },
});

export const { addToCart, removeFromTheCart, incrementQuantity, decrementQuantity,clearAllCart} =
  cartSlice.actions;

export const getCart = (state: RootState) => state.cart.cart;

export default cartSlice.reducer;
