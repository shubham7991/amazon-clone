// import React from "react";
// import Image from "next/image";
// import Ratings from "./shared/Ratings";
// import { useRouter } from "next/navigation";

// const ProductCard = ({ product }: { product: any }) => {
//     const router = useRouter();
//   return (
//     <div>
//     <div className="cursor-pointer" onClick={()=>{
//         router.push(`/product/${product.id}`);
//     }}>
//         <div className="flex items-center justify-center bg-gray-100 h-[250px] rounded-md overflow-hidden"> 
//         <Image className="mix-blend-multiply p-8" src={product.image} alt={product.title || "Product"}  width={200} height={200}unoptimized/>
//         </div>
//       <h2 className="font-bold" >{product.title}</h2>
//       <p>{`${product.description.substring(0,50)}...`}</p>
//       <Ratings ratings={product.rating} />
//       <p className="font-bold text-2xl" >{`$${product.price}`}</p>
//     </div>
//     </div>
//   );
// };

// export default ProductCard;

import React from "react";
import Image from "next/image";
import Ratings from "./shared/Ratings";
import { useRouter } from "next/navigation";

export interface Product {   // 👈 now exported
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  rating: number;
}

const ProductCard = ({ product }: { product: Product }) => {
  const router = useRouter();
  return (
    <div>
      <div
        className="cursor-pointer"
        onClick={() => {
          router.push(`/product/${product.id}`);
        }}
      >
        <div className="flex items-center justify-center bg-gray-100 h-[250px] rounded-md overflow-hidden">
          <Image
            className="mix-blend-multiply p-8"
            src={product.image}
            alt={product.title || "Product"}
            width={200}
            height={200}
            unoptimized
          />
        </div>
        <h2 className="font-bold">{product.title}</h2>
        <p>{`${product.description.substring(0, 50)}...`}</p>
        <Ratings ratings={product.rating} />
        <p className="font-bold text-2xl">{`$${product.price}`}</p>
      </div>
    </div>
  );
};

export default ProductCard;
