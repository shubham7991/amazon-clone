// import React from "react";
// import { useAppSelector } from "@/lib/supabase/hooks/redux";
// import { getCart } from "@/redux/cartSlice";
// import Image from "next/image";


// const DeliveryAddress =()=>{
//     const cart = useAppSelector(getCart);
//     return(
//         <div>
//       <div className=" border-b border-gray-300 py-2 ">
//         <div className="flex justify-between ">
//           <h1 className="font-bold text-lg">1.Delivery Address</h1>
//           <p className="text-sm ml-20 ">
//             Shubham Shukla <br></br>
//             MV-Phase-3 <br></br>
//             Delhi-110096 <br></br>
//             Add Delivery Instructions <br></br>
//           </p>
//         </div>
//       </div>
//       <div className=" border-b border-gray-300 py-2">
//         <div className="flex justify-between w-[50%]">
//           <h1 className="font-bold text-lg">2.Items and delivery </h1>
//         </div>
//         {cart.map((SingleProduct: any,index:number) => {
//           return (
//             <div key={index} className="m-4">
//               <div className="flex">
//                 <Image
//                   src={SingleProduct.image}
//                   alt={SingleProduct.title}
//                   width={100}
//                   height={100}
//                 />
//                 <div className="ml-4">
//                       <h1 className="font-bold">{SingleProduct.title}</h1>
//                 <p className="text-2xl font-bold py-2">{`$${SingleProduct.price}`}</p>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//         </div>
//     )
// }

// export default DeliveryAddress;
import React from "react";
import { useAppSelector } from "@/lib/supabase/hooks/redux";
import { getCart } from "@/redux/cartSlice";
import Image from "next/image";

// ✅ Define CartItem type locally
type CartItem = {
  id: string | number;
  title: string;
  price: number;
  quantity: number;
  image: string;
};

const DeliveryAddress = () => {
  const cart = useAppSelector(getCart) as CartItem[]; // ✅ cast to CartItem[]

  return (
    <div>
      <div className="border-b border-gray-300 py-2">
        <div className="flex justify-between">
          <h1 className="font-bold text-lg">1. Delivery Address</h1>
          <p className="text-sm ml-20">
            Shubham Shukla <br />
            MV-Phase-3 <br />
            Delhi-110096 <br />
            Add Delivery Instructions <br />
          </p>
        </div>
      </div>

      <div className="border-b border-gray-300 py-2">
        <div className="flex justify-between w-[50%]">
          <h1 className="font-bold text-lg">2. Items and delivery</h1>
        </div>

        {/* ✅ no any, using CartItem */}
        {cart.map((item: CartItem, index: number) => (
          <div key={index} className="m-4">
            <div className="flex">
              <Image
                src={item.image}
                alt={item.title}
                width={100}
                height={100}
              />
              <div className="ml-4">
                <h1 className="font-bold">{item.title}</h1>
                <p className="text-2xl font-bold py-2">{`$${item.price}`}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeliveryAddress;
