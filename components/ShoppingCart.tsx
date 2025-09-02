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
"use client"
import React from "react";
import Image from "next/image";
import { useAppDispatch} from "@/lib/supabase/hooks/redux";
import { clearAllCart, decrementQuantity, incrementQuantity, removeFromTheCart } from "@/redux/cartSlice";
import SubTotal from "./shared/SubTotal"

const ShoppingCart = ({cart,totalPrice}:{cart:any,totalPrice:number}) => {
  const dispatch = useAppDispatch();
  

  return (
    <div className="w-[70%]">
        <h1 className="font-bold text-2xl">Shopping Cart</h1>
      {cart.length === 0 ? (
        <h1 className="text-center text-xl">Your cart is empty 🛒</h1>
      ) : (
        cart.map((singleProduct: any, index: number) => (
          <div
           key={`${singleProduct.id}-${index}`} // ✅ Added unique key
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
/>

              {/* Product Info */}
              <div className="ml-5">
                <h1 className="font-semibold">{singleProduct.title}</h1>
                <p className="text-green-600 font-bold my-1 text-xs">In Stock</p>
                <h1
                  onClick={() =>
                    dispatch(removeFromTheCart(singleProduct.id))
                  }
                  className="font-bold text-red-600  w-fit cursor-pointer"
                >
                  REMOVE
                </h1>
                <div className="flex text-xl my-4 font-medium justify-between items-center w-fit bg-gray-200 rounded-md px-5 py-1">
                  <div 
                  onClick={()=>{
                     singleProduct.quantity>1 && dispatch(decrementQuantity(singleProduct))
                  }}
                  className="cursor-pointer mr-4">-</div>
                  <div>{singleProduct.quantity}</div>
                  <div 
                  onClick={()=>{
                    dispatch(incrementQuantity(singleProduct))
                  }}
                  className="cursor-pointer ml-4">+</div>
                </div>
              </div>
            </div>

            {/* Right Section (Price) */}
            <div>
              <h1 className="font-semibold text-xl">
                ${singleProduct.price}
              </h1>
              <p className="text-sm py-1">
                M.R.P.:{" "}
                <span className="line-through">Rs.3,995.00</span>
              </p>
            </div>
          </div>
        ))
      )}
      <h1 onClick={()=>{
        dispatch(clearAllCart())
      }}
      className="text-red-600 font-bold cursor-pointer py-2">CLEAR ALL</h1>
      <SubTotal left={false} length={cart.length} totalPrice={totalPrice}  />
      {/* <h1 className="text-right text-lg">{`Subtotal (${cart.length} items):`}<span className="font-bold">{`$${totalPrice}`}</span> </h1> */}
    </div>
  );
};

export default ShoppingCart;
