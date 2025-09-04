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
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Stripe instance
let stripe: Stripe | null = null;
let stripeInitialized = false;

if (process.env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  });
  stripeInitialized = true;
}

type Item = {
  title: string;
  image: string;
  price: number;
};

export async function POST(req: NextRequest) {
  try {
    if (!stripeInitialized || !stripe) {
      return NextResponse.json(
        { error: "Stripe payment system is not configured" },
        { status: 503 }
      );
    }

    const body = await req.json();
    const { items, email } = body;

    const arrangedItems = (items as Item[]).map((item) => ({
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
        images: JSON.stringify(items.map((item: Item) => item.image)),
      },
    });

    return NextResponse.json({ id: session.id });
  } catch (err: unknown) {
    console.error("Stripe checkout error:", err);

    let errorMessage = "Internal server error";
    if (err instanceof Error) {
      errorMessage = err.message;
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
