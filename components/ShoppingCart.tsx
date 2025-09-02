// "use client"
// import React from "react";
// import Image from "next/image";
// import { useAppDispatch, useAppSelector } from "@/lib/supabase/hooks/redux";
// import { getCart, removeFromTheCart } from "@/redux/cartSlice";


// const ShoppingCart = () => {
//   const cart = useAppSelector(getCart)||[];
//   const dispatch= useAppDispatch();

//   return (
//     <div>
//          {cart.length === 0 ? (
//       <h1 className="text-center text-xl">Your cart is empty 🛒</h1>
//     ) : (
//       cart.map((singleProduct: any, index: number) => (
//         <div  key={singleProduct.id || index}
//         className="flex justify-between items-center border-b border-gray-300 py-5"> <h1 className="font-bold text-2xl ">Shopping Cart</h1>
//         <h1 className="font-medium">Price</h1>
//       </div>
     

//       cart.map((singleProduct: any, index: number) => (
//         <div
//           key={singleProduct.id || index} // ✅ Added unique key
//           className="my-4 flex justify-between items-center border-b border-gray-200 pb-4"
//         >
//           {/* Left Section (Image + Details) */}
//           <div className="flex">
//             {/* Product Image */}
//             <Image src={singleProduct.image} width={100}  height={100} alt={singleProduct.title} />
//             {/* Product Info */}
//             <div className="ml-5">
//               <h1 className="font-semibold">{singleProduct.title}</h1>
//               <p className="text-green-600 font-bold my-1 text-xs">In Stock</p>
//              <h1 onClick={() => dispatch(removeFromTheCart(singleProduct.id))}
//              className="font-bold text-red-600 cursor-pointer">REMOVE</h1>
//               <div className="flex text-xl my-4 font-medium justify-between items-center w-fit bg-gray-200 rounded-md px-5 py-1">
//                 <div className="cursor-pointer mr-4" >-</div>
//                 <div>0</div>
//                 <div className="cursor-pointer ml-4" >+</div>
//                 </div>
//             </div>
//           </div>

//           {/* Right Section (Price) */}
//           <div>
//             <h1 className="font-semibold text-xl">${singleProduct.price}</h1>
//             <p className="text-sm py-1">M.R.P.: <span className="line-through">Rs.3,995.00</span></p>
//           </div>
//         </div>
//       ))
//       )}
//     </div>
//     )
// };

// export default ShoppingCart;
// components/ShoppingCart.tsx
"use client";
import React from "react";
import Image from "next/image";
import { useAppDispatch } from "@/lib/supabase/hooks/redux";
import {
  clearAllCart,
  decrementQuantity,
  incrementQuantity,
  removeFromTheCart,
} from "@/redux/cartSlice";
import SubTotal from "./shared/SubTotal";
import { CartItem } from "@/types/cart"; // Import the shared type

interface ShoppingCartProps {
  cart: CartItem[];
  totalPrice: number;
}

const ShoppingCart = ({ cart, totalPrice }: ShoppingCartProps) => {
  const dispatch = useAppDispatch();

  const handleRemoveFromCart = (productId: string | number) => {
    dispatch(removeFromTheCart(productId));
  };

  const handleDecrementQuantity = (product: CartItem) => {
    if (product.quantity > 1) {
      dispatch(decrementQuantity(product));
    }
  };

  const handleIncrementQuantity = (product: CartItem) => {
    dispatch(incrementQuantity(product));
  };

  const handleClearAllCart = () => {
    dispatch(clearAllCart());
  };

  return (
    <div className="w-[70%]">
      <h1 className="font-bold text-2xl">Shopping Cart</h1>
      {cart.length === 0 ? (
        <h1 className="text-center text-xl">Your cart is empty 🛒</h1>
      ) : (
        <>
          {cart.map((singleProduct, index) => (
            <div
              key={`${singleProduct.id}-${index}`}
              className="my-4 flex justify-between items-center border-b border-gray-200 pb-4"
            >
              {/* Left Section (Image + Details) */}
              <div className="flex">
                {/* Product Image */}
                <Image
                  src={singleProduct.image || "/placeholder.png"}
                  width={100}
                  height={100}
                  alt={singleProduct.title || "Product image"}
                  className="object-contain"
                />

                {/* Product Info */}
                <div className="ml-5">
                  <h1 className="font-semibold">{singleProduct.title}</h1>
                  <p className="text-green-600 font-bold my-1 text-xs">
                    In Stock
                  </p>
                  <button
                    onClick={() => handleRemoveFromCart(singleProduct.id)}
                    className="font-bold text-red-600 w-fit cursor-pointer hover:text-red-800"
                    type="button"
                  >
                    REMOVE
                  </button>
                  <div className="flex text-xl my-4 font-medium justify-between items-center w-fit bg-gray-200 rounded-md px-5 py-1">
                    <button
                      onClick={() => handleDecrementQuantity(singleProduct)}
                      className="cursor-pointer mr-4 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={singleProduct.quantity <= 1}
                      type="button"
                    >
                      -
                    </button>
                    <div>{singleProduct.quantity}</div>
                    <button
                      onClick={() => handleIncrementQuantity(singleProduct)}
                      className="cursor-pointer ml-4"
                      type="button"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Section (Price) */}
              <div>
                <h1 className="font-semibold text-xl">
                  ${singleProduct.price.toFixed(2)}
                </h1>
                <p className="text-sm py-1">
                  M.R.P.:{" "}
                  <span className="line-through">Rs.3,995.00</span>
                </p>
              </div>
            </div>
          ))}
          <button
            onClick={handleClearAllCart}
            className="text-red-600 font-bold cursor-pointer py-2 hover:text-red-800"
            type="button"
          >
            CLEAR ALL
          </button>
          <SubTotal left={false} length={cart.length} totalPrice={totalPrice} />
        </>
      )}
    </div>
  );
};

export default ShoppingCart;