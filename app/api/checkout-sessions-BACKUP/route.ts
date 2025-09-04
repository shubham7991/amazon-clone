// import { NextRequest,NextResponse } from "next/server";

// const stripe= require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY)

// export async function POST(req:NextRequest,res:NextResponse){
//     const body= await req.json();
//     console.log(body);
//     const {items,email} =body;

//     const arrangedItems= items.map((item:any)=>({
//            price_data:{
//             currency:'usd',
//             product_data:{
//                 name:item.title,
//                 images:[item.image]
//             },
//             unit_amount:Math.floor(item.price*88),
//            },
//            quantity:1
//     }))
 
//     const session= await stripe.checkout.sessions.create({
//         payment_method_types:['card'],
//         shipping_address_collection:{
//             allowed_countries:['GB','US','CA']
//         },
//         line_items:arrangedItems,
//         mode:'payment',
//         success_url:`${process.env.HOST}/success`,
//         cancel_url:`${process.env.HOST}/checkout`,
//         metadata:{
//             email,
//             images:JSON.stringify(items.map((item:any)=>item.image)) 
//         }
//     })


//     return NextResponse.json({
//         id:session.id
//     })
// }
// import { NextRequest, NextResponse } from "next/server";
// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();
//     const { items, email } = body;

//     const arrangedItems = items.map((item: any) => ({
//       price_data: {
//         currency: "usd",
//         product_data: {
//           name: item.title,
//           images: [item.image],
//         },
//         unit_amount: Math.floor(item.price * 88), // INR → USD conversion logic
//       },
//       quantity: 1,
//     }));

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       shipping_address_collection: {
//         allowed_countries: ["GB", "US", "CA"],
//       },
//       line_items: arrangedItems,
//       mode: "payment",
//       success_url: `${process.env.HOST}/success`,
//       cancel_url: `${process.env.HOST}/checkout`,
//       metadata: {
//         email,
//         images: JSON.stringify(items.map((item: any) => item.image)),
//       },
//     });

//     return NextResponse.json({ id: session.id });
//   } catch (err: any) {
//     console.error("Stripe checkout error:", err.message);
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }
import { NextRequest, NextResponse } from 'next/server';

// Only import Stripe if the key exists to prevent build errors
let stripe: any = null;
let stripeInitialized = false;

try {
  if (process.env.STRIPE_SECRET_KEY) {
    const Stripe = require('stripe').default;
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-04-10',
    });
    stripeInitialized = true;
  }
} catch (error) {
  console.error('Stripe initialization failed:', error);
}

export async function POST(req: NextRequest) {
  try {
    // Check if Stripe is configured
    if (!stripeInitialized) {
      return NextResponse.json(
        { error: 'Stripe payment system is not configured' },
        { status: 503 }
      );
    }

    const body = await req.json();
    const { items, email } = body;

    const arrangedItems = items.map((item: any) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title,
          images: [item.image],
        },
        unit_amount: Math.floor(item.price * 88),
      },
      quantity: 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_address_collection: {
        allowed_countries: ["GB", "US", "CA"],
      },
      line_items: arrangedItems,
      mode: "payment",
      success_url: `${process.env.HOST}/success`,
      cancel_url: `${process.env.HOST}/checkout`,
      metadata: {
        email,
        images: JSON.stringify(items.map((item: any) => item.image)),
      },
    });

    return NextResponse.json({ id: session.id });

  } catch (err: unknown) {
    console.error("Stripe checkout error:", err);
    
    let errorMessage = 'Internal server error';
    if (err instanceof Error) {
      errorMessage = err.message;
    }

    return NextResponse.json(
      { error: errorMessage }, 
      { status: 500 }
    );
  }
}