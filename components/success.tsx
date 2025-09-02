// "use client"
// import { useAppSelector } from "@/lib/supabase/hooks/redux";
// import { getCart } from "@/redux/cartSlice";
// import React from "react";
// import SingleProduct from "./SingleProduct";
// import Image from "next/image";
// import Link from "next/link";

// const success=()=>{
//     const cart=useAppSelector(getCart)
//     return(
//         <div className="absolute top-0 w-full  bg-white py-12">
//             <div className="mx-auto w-[70%]">
//                 <h1>Thank you for ordering with Amazon.in </h1>
//                 <div>
//                 <h1 className="font-bold py-3 underline">Order Details</h1>
//                 {
//                     cart.map((SingleProduct:any)=>{
//                         return(
//                             <div>
//                                 <div className="flex">
//                                    <Image src={SingleProduct.image} alt={SingleProduct.title} width={100} height={100} />
//                                 <div className="ml-5 font-bold"> 
//                                 <h1>{SingleProduct.title}</h1>
//                                 <h1>{SingleProduct.price}</h1>
//                                 </div> 
//                                 </div>
//                             </div>
//                         )
//                     })
//                 }
//                 </div>
//                 <div className="my-5">
//                      <Link href={'/'} className="bg-[#FFD814] px-4 py-1  rounded-md">Buy more products</Link>
//                 </div>
               
//             </div>
//         </div>
//     )
// }

// export default success;
"use client";
import { useAppSelector } from "@/lib/supabase/hooks/redux";
import { getCart } from "@/redux/cartSlice";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CartItem } from "@/types/cart"; // Import your shared type

const Success = () => { // Changed from 'success' to 'Success' (capital S)
  const cart = useAppSelector(getCart);
  
  return (
    <div className="absolute top-0 w-full bg-white py-12">
      <div className="mx-auto w-[70%]">
        <h1>Thank you for ordering with Amazon.in </h1>
        <div>
          <h1 className="font-bold py-3 underline">Order Details</h1>
          {cart.map((singleProduct: CartItem, index: number) => { // Use CartItem type
            return (
              <div key={`${singleProduct.id}-${index}`}> {/* Added key prop */}
                <div className="flex">
                  <Image 
                    src={singleProduct.image || "/placeholder.png"} 
                    alt={singleProduct.title} 
                    width={100} 
                    height={100} 
                  />
                  <div className="ml-5 font-bold">
                    <h1>{singleProduct.title}</h1>
                    <h1>${singleProduct.price}</h1>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="my-5">
          <Link href={'/'} className="bg-[#FFD814] px-4 py-1 rounded-md">
            Buy more products
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Success; // Fixed export name