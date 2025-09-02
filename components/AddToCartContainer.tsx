// "use client";

// import Image from "next/image";
// import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
// import { RootState, AppDispatch } from "@/lib/supabase/hooks/redux";
// import { addToCart } from "@/redux/cartSlice";
// import { useRouter } from "next/navigation";

// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// type Product = {
//   id: string;
//   title: string;
//   price: number;
//   image: string;
//   description?: string;
//   category?: string;
//   rating?: number;
// };

// const AddToCartContainer = ({ singleProduct }: { singleProduct: Product }) => {
//   const dispatch = useAppDispatch();
//   const router =useRouter();

//   return (
//     <div className="border border-gray-200 rounded-md w-fit text-sm">
//       {/* Prime Logo */}
//       <div className="p-4">
//   <Image 
//   src="/prime-logo.png" 
//   width={40} 
//   height={20} 
//   alt="prime logo"
//   style={{ width: "auto", height: "auto" }}   // ✅ maintain aspect ratio
// />
//       </div>
//       {/* Delivery Info */}
//       <div className="p-4">
//         <h1>
//           <span className="text-[#147CBF]">FREE delivery</span> Thursday, 21 March.{" "}
//           <span className="text-[#147CBF]">Details</span>
//         </h1>

//         <h1 className="mt-4">
//           Or fastest delivery Tomorrow, 20 March. Order within 15 hrs 53 mins.{" "}
//           <span className="text-[#147CBF]">Details</span>
//         </h1>

//         <p className="text-[#147CBF] my-2">Deliver to Shubham - Noida -201014</p>
//       </div>

//       {/* Buttons */}
//       <div className="p-4 flex flex-col gap-2">
//         <button
//           onClick={() => {
//             console.log("SingleProduct in AddToCart:", singleProduct);
//             dispatch(addToCart(singleProduct));
//             router.push('/cart')
//           }}
//           className="bg-[#FFBD14] hover:bg-yellow-400 w-full rounded-full py-2 font-semibold cursor-pointer"
//         >
//           Add to Cart
//         </button>
//         <button
//           className="bg-[#FFA41C] hover:bg-orange-500 w-full rounded-full py-2 my-2 text-black font-semibold cursor-pointer"
//         >  Buy Now
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AddToCartContainer;
"use client";

import Image from "next/image";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState, AppDispatch } from "@/lib/supabase/hooks/redux";
import { addToCart } from "@/redux/cartSlice";
import { useRouter } from "next/navigation";
import { CartItem } from "@/types/cart"; // Import your shared type

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Use the same CartItem type that matches your Redux store
interface AddToCartContainerProps {
  singleProduct: CartItem;
}

const AddToCartContainer = ({ singleProduct }: AddToCartContainerProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Convert the product to match what addToCart expects (Omit<CartItem, "quantity">)
  const handleAddToCart = () => {
    const productToAdd = {
      id: singleProduct.id,
      title: singleProduct.title,
      price: singleProduct.price,
      image: singleProduct.image || "", // Provide default if undefined
      description: singleProduct.description,
      category: singleProduct.category,
      rating: singleProduct.rating,
    };

    console.log("Adding to cart:", productToAdd);
    dispatch(addToCart(productToAdd));
    router.push('/cart');
  };

  return (
    <div className="border border-gray-200 rounded-md w-fit text-sm">
      {/* Prime Logo */}
      <div className="p-4">
        <Image 
          src="/prime-logo.png" 
          width={40} 
          height={20} 
          alt="prime logo"
          style={{ width: "auto", height: "auto" }}
        />
      </div>
      {/* Delivery Info */}
      <div className="p-4">
        <h1>
          <span className="text-[#147CBF]">FREE delivery</span> Thursday, 21 March.{" "}
          <span className="text-[#147CBF]">Details</span>
        </h1>

        <h1 className="mt-4">
          Or fastest delivery Tomorrow, 20 March. Order within 15 hrs 53 mins.{" "}
          <span className="text-[#147CBF]">Details</span>
        </h1>

        <p className="text-[#147CBF] my-2">Deliver to Shubham - Noida -201014</p>
      </div>

      {/* Buttons */}
      <div className="p-4 flex flex-col gap-2">
        <button
          onClick={handleAddToCart}
          className="bg-[#FFBD14] hover:bg-yellow-400 w-full rounded-full py-2 font-semibold cursor-pointer"
        >
          Add to Cart
        </button>
        <button
          className="bg-[#FFA41C] hover:bg-orange-500 w-full rounded-full py-2 my-2 text-black font-semibold cursor-pointer"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default AddToCartContainer;

