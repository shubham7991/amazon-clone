import React from "react";
import Image from "next/image";
import Ratings from "./Ratings";
import { useAppDispatch } from "../AddToCartContainer";
import { addToCart } from "@/redux/cartSlice";
import { useRouter } from "next/navigation";

const CategoryWiseProduct = ({singleProduct}:{singleProduct:any}) => {
    const dispatch=useAppDispatch();
     const router= useRouter();
  return (
    <div className="border border-gray-300 p-2 bg-white">
        <h1 className="font-bold">{singleProduct.category}</h1>
      <div className="mt-2 h-[250px] overflow-hidden flex items-center justify-center">
        <Image src={singleProduct.image} className="p-6" width={200} height={150} alt={singleProduct.title} />
      </div>
      <div>
        <h1>{singleProduct.title}</h1>
        <Ratings ratings={singleProduct.rating}/>
      </div>
      <div className="my-2">
        <button 
        onClick={()=>{
            dispatch(addToCart(singleProduct));
            router.push("/cart");
        }}
        className="w-full py-2 rounded-md bg-[#FFD814]">Add to Cart</button>
      </div>
    </div>
  );
};

export default CategoryWiseProduct;
