"use client";
import React from "react";
import ShoppingCart from "./ShoppingCart";
import ProceedToBuy from "./ProceedToBuy";
import { useAppSelector } from "@/lib/supabase/hooks/redux";
import { getCart } from "@/redux/cartSlice";
import { CartItem } from "@/types/cart";

const Cart = () => {
  const cart = useAppSelector(getCart) || [];
  let totalPrice = 0;

  cart.forEach((item: CartItem) => { // Use CartItem instead of any
    totalPrice += item.price * item.quantity;
  });

  return (
    <div className="w-[80%] mx-auto mt-10">
      <div className="flex w-full justify-between">
        <ShoppingCart cart={cart} totalPrice={totalPrice} />
        <ProceedToBuy length={cart.length} totalPrice={totalPrice} />
      </div>
    </div>
  );
};

export default Cart;
// app/cart/page.tsx
// "use client";
// import React from "react";
// import ShoppingCart from "@/components/ShoppingCart";
// import ProceedToBuy from "@/components/ProceedToBuy";
// import { useAppSelector } from "@/lib/supabase/hooks/redux";
// import { getCart } from "@/redux/cartSlice";
// import { CartItem } from "@/types/cart";

// const Cart = () => {
//   const cart = useAppSelector(getCart) ?? [];
//   const totalPrice = cart.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0);

//   return (
//     <div className="w-[80%] mx-auto mt-10">
//       <div className="flex w-full justify-between">
//         <ShoppingCart cart={cart} totalPrice={totalPrice} />
//         <ProceedToBuy length={cart.length} totalPrice={totalPrice} />
//       </div>
//     </div>
//   );
// };

// export default Cart;
