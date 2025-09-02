// import React from "react";
// import Image from "next/image";

// const SingleProduct=({singleProduct}:{singleProduct:any})=>{
//     return(
//         <div className="w-[80%] mx-auto">
//         <div>
//             {
//                 singleProduct.map((product:any)=>{
//                 return(
//                  <Image src={product.image} width={300} height={450} alt={product.title}/>
//                 )
//             })
//             }
     
//         </div>
//         </div>

//     )
// }

// export default SingleProduct;
// import React from "react";
// import Image from "next/image";

// const SingleProduct = ({ singleProduct }: { singleProduct: any }) => {
//   if (!singleProduct) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className="w-[80%] mx-auto">
//       <div>
//     {singleProduct.map((product: any) => (
//   product.image && (
//     <Image
//       key={product.id}
//       src={product.image}
//       width={300}
//       height={450}
//       alt={product.title || "Product image"}
//     />
//   )
// ))}

//         <h1 className="text-xl font-bold mt-4">{singleProduct.title}</h1>
//         <p className="text-gray-600">{singleProduct.description}</p>
//         <p className="text-lg font-semibold mt-2">${singleProduct.price}</p>
//       </div>
//     </div>
//   );
// };

// export default SingleProduct;
// import React from "react";
// import Image from "next/image";

// const SingleProduct = ({ singleProduct }: { singleProduct: any[] }) => {
//   if (!singleProduct || singleProduct.length === 0) {
//     return <p>Loading...</p>;
//   }

//   // since your hook returns an array, take the first product
//   const product = singleProduct[0];

//   return (
//     <div className="w-[80%] mx-auto">
//       <div>
//         {product.image && (
//           <Image
//             src={product.image}
//             width={300}
//             height={450}
//             alt={product.title || "Product image"}
//           />
//         )}
//         <h1 className="text-xl font-bold mt-4">{product.title}</h1>
//         <p className="text-gray-600">{product.description}</p>
//         <p className="text-lg font-semibold mt-2">${product.price}</p>
//       </div>
//     </div>
//   );
// };

// export default SingleProduct;
"use client";
import Image from "next/image";
import Ratings from "./shared/Ratings";
import ProductCard from "./ProductCard";
import AddToCartContainer from "./AddToCartContainer";

export default function SingleProduct({ singleProduct }: { singleProduct: any }) {
  if (!singleProduct) {
    return <p>Loading product...</p>; // or return null;
  }
return (
  <div className="flex relative">
    <div className="w-[80%] mx-auto mt-10">
      <div className="relative flex z-0">
        {singleProduct.image ? (
          <Image
            className="flex bg-gray-100 p-4 z-0"
            src={singleProduct.image}
            alt={singleProduct.title}
            width={250}
            height={250}
          />
        ) : (
          <p>No image available</p>
        )}
      </div>

      <h1 className="text-2xl font-bold mt-4">{singleProduct.title}</h1>
      <p className="text-lg flex-1 w-[70%]">{singleProduct.description}</p>
      <p className="text-xl font-semibold">₹{singleProduct.price}</p>
      <Ratings ratings={singleProduct.rating} />

      {/* ✅ Cart Box with higher z-index */}
      <div className="absolute top-30 right-10 w-[300px] bg-white z-50 pointer-events-auto shadow-lg rounded-md p-4">
        <AddToCartContainer singleProduct={singleProduct} />
      </div>
    </div>
  </div>
);

}

