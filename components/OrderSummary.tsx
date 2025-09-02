import { useAppSelector } from "@/lib/supabase/hooks/redux";
import { supabase } from "@/lib/supabase/products";
import { getCart } from "@/redux/cartSlice";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import React from "react";

console.log(process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY!);

const stripePromise= loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY!);


const OrderSummary=({totalPrice}:{totalPrice:number})=>{

    const cart= useAppSelector(getCart);

    const createStripeSession=async()=>{
        const {data:{user}} =await supabase.auth.getUser();
        const stripe= await stripePromise;

        const checkoutSession= await axios.post("/api/checkout-sessions",{
             items:cart,
             email:user?.email
        })

        const result=await stripe?.redirectToCheckout({
            sessionId:checkoutSession.data.id,
        })

        if(result?.error){
            console.log(result.error.message);
        }
    }


    return(
        <div className="border border-gray-200 p-3 mt-8 h-fit w-[23%]"> 
            <div className="text-xs">
           <h1 className="font-bold text-xl mb-5">Order Summary</h1>
           <div>
            <div className="flex justify-between items-center">
                <p>items</p>
                <p>Rs.895.00</p>
            </div>
             <div className="flex justify-between items-center">
                <p>Delivery:</p>
                <p>Rs.50.00</p>
            </div>
             <div className="flex justify-between items-center">
                <p>Total:</p>
                <p>Rs.945.00</p>
            </div>
             <div className="flex justify-between items-center">
                <p>Promotion Applied:</p>
                <p>-Rs.50.00</p>
            </div>
            <div className="flex font-bold justify-between w-full text-xl text-[#b12704] py-1 border-t border-b border-gray-300 my-1">
                <h1>Order Total:</h1>
                <h1>${totalPrice}</h1>
            </div>
           </div>
           <button onClick={createStripeSession}
            className="bg-[#FFD814] w-full cursor-pointer rounded-md px-4 py-1 my-2">Place Order Now</button>
            </div>
        </div>
    )
}

export default OrderSummary;