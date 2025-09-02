// "use client"
// import SearchResult from "@/components/SearchResult";
// import { useSupabase } from "@/lib/supabase/hooks/useSupabase";
// import { useParams } from "next/navigation";
// import React, { useEffect } from "react";

// const Searchpage=()=>{
//     const{query}=useParams();
//     const{filterData,
//     getFilteredData}=useSupabase();

//     // useEffect(()=>{
//     //     getFilteredData(query.toString());
//     // },[query])
//     useEffect(() => {
//   if (query) {
//     const fetchData = async () => {
//       const data = await getFilteredData(query.toString());
//       console.log("Fetched data:", data);
//     };
//     fetchData();
//   }
// }, [query,getFilteredData]);
    
//     return(
//         <div><SearchResult filterData={filterData}/> </div>
//     )
// }

// export default Searchpage;
// components/ProductCard.tsx
"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product"; // Import shared type

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link href={`/product/${product.id}`}>
      <div className="border border-gray-300 p-2 bg-white hover:shadow-lg transition-shadow">
        <div className="h-[250px] overflow-hidden flex items-center justify-center">
          <Image
            src={product.image || "/placeholder.png"}
            width={200}
            height={150}
            alt={product.title}
            className="object-contain"
          />
        </div>
        <div className="mt-2">
          <h1 className="font-semibold text-sm line-clamp-2">{product.title}</h1>
          <p className="font-bold text-lg">${product.price}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;