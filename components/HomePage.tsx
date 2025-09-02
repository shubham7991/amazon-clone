// "use client"
// import React, { useEffect } from "react";
// import Image from "next/image";
// import { useSupabase } from "@/lib/supabase/hooks/useSupabase";
// import SingleProduct from "./SingleProduct";
// import CategoryWiseProduct from "./shared/CategoryWiseProduct";
// import Link from "next/link";

// const HomePage=()=>{
//     const {
//         mensProduct,
//     getMensClothing,
//     womensProduct,
//     getWomensClothing
//     } = useSupabase();

//     useEffect(()=>{
//         getMensClothing();
//         getWomensClothing();
//     },[])
    
    
//     return(
//         <div>
//             <Image 
//             style={{
//                 maskImage:'linear-gradient(to bottom , rgba(0,0,0,1),rgba(0,0,0,0))'
//             }}
//              src={"https://images-eu.ssl-images-amazon.com/images/G/31/IMG25/Sports/August/NSD/GW/Hero/Unrec_-_PC_-_NSD_Theme._CB801257529_.jpg"} width={10000} height={1000} alt="banner"/>
//               <div  className="w-[80%] mx-auto grid grid-cols-4 gap-2 relative -top-60 ">
//                  {
//              mensProduct.map((singleProduct:any)=>{
//                     return(
//                         <Link key={singleProduct.id} 
//                          href={`/product/${singleProduct.id}`}>
//                         <CategoryWiseProduct singleProduct={singleProduct}/>
//                         </Link>
//                     )
//              })
//             }
//              {
//              womensProduct.map((singleProduct:any)=>{
//                     return(
//                         <Link key={singleProduct.id} 
//                          href={`/product/${singleProduct.id}`}>
//                         <CategoryWiseProduct singleProduct={singleProduct}/>
//                         </Link>
//                     )
//              })
//             }
//               </div>
//         </div>
//     )
// }

// export default HomePage;
"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useSupabase } from "@/lib/supabase/hooks/useSupabase";
import CategoryWiseProduct from "./shared/CategoryWiseProduct";
import Link from "next/link";
import { Product } from "@/types/product";

const HomePage = () => {
  const {
    mensProduct,
    getMensClothing,
    womensProduct,
    getWomensClothing,
  } = useSupabase();

  useEffect(() => {
    getMensClothing();
    getWomensClothing();
  }, [getMensClothing, getWomensClothing]);

  // Add default quantity to products
  const productsWithQuantity = (products: Product[]) => {
    return products.map(product => ({
      ...product,
      quantity: 1 // Default quantity
    }));
  };

  return (
    <div>
      <Image
        style={{
          maskImage: "linear-gradient(to bottom , rgba(0,0,0,1),rgba(0,0,0,0))",
        }}
        src={
          "https://images-eu.ssl-images-amazon.com/images/G/31/IMG25/Sports/August/NSD/GW/Hero/Unrec_-_PC_-_NSD_Theme._CB801257529_.jpg"
        }
        width={10000}
        height={1000}
        alt="banner"
      />
      <div className="w-[80%] mx-auto grid grid-cols-4 gap-2 relative -top-60">
        {productsWithQuantity(mensProduct).map((singleProduct: Product) => (
          <Link key={singleProduct.id} href={`/product/${singleProduct.id}`}>
            <CategoryWiseProduct singleProduct={singleProduct} />
          </Link>
        ))}
        {productsWithQuantity(womensProduct).map((singleProduct: Product) => (
          <Link key={singleProduct.id} href={`/product/${singleProduct.id}`}>
            <CategoryWiseProduct singleProduct={singleProduct} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;