// "use client"
// // import { headers } from "next/headers";
// import React, { use, useEffect, useState } from "react";
// import Image from "next/image";
// import amazonLogo from "../public/amazon-logo-2.webp";
// import { FaShoppingCart } from "react-icons/fa";
// import { FaSearch } from "react-icons/fa";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useAppSelector } from "./AddToCartContainer";
// import { getCart } from "@/redux/cartSlice";
// import { supabase } from "@/lib/supabase/products";


// const itemList=[
//     "All",
//     "Fresh",
//     "Amazon miniTV",
//     "Sell",
//     "Gift Cards",
//     "Baby",
//     "Buy Again",
//     "Browsing History",
//     "Amazon Pay",
//     "Gift Ideas",
//     "Health, Household & Personal Care"
// ];

// const Header =()=>{
//     const[query,setQuery]=useState<string>("");
//     const[user,setUser]=useState<any>(null);
//     const router= useRouter();

//     const cart=useAppSelector(getCart)

//     const searchHandler=()=>{
//          router.push(`/search/${query}`)
//     }
    
//    useEffect(() => {
//   const getUserData = async () => {
//     const { data, error } = await supabase.auth.getUser();
//     if (error) {
//       console.error(error);
//       return;
//     }
//     setUser(data.user); // 👈 set the actual user object
//   };

//   getUserData();
// }, []);


//     console.log(user);

//     return(
//         <>
//           <div className="bg-[#131921] text-white py-1">
//             <div className="flex items-center justify-between w-[90%] mx-auto">
//             <Link href={"/"} className="w-[10%]">
//             <Image src={amazonLogo} alt={"logo"} width={140} height={140}/>
//             </Link>
                 
//            <div className=" flex items-center w-[60%] ">
//             <input value={query} 
//             onChange={(e)=>setQuery(e.target.value)}
//             type="text" placeholder="Search Amazon.in" className="bg-white text-black p-2 outline-none rounded-l-md text-black w-full"></input>
//             <div 
//             onClick={searchHandler}
//             className="bg-[#FEBD69] cursor-pointer hover:bg-[#ffad43] p-2 rounded-r-md">
//                 <FaSearch size={"24px"} className="text-black"/>
//             </div>
//            </div>
//            <div className="flex items-center justify-around w-[20%]">
//             <div onClick={()=>{
//                 router.push("/signin");
//             }}
//             className="cursor-pointer">
//    <h1 className="text-sm hover:underline">
//   {user
//     ? user.user_metadata?.user_name || user.user_metadata?.full_name || user.email
//     : "Sign in"}
// </h1>
//                 <h1 className="font-medium text-sm">Account & Lists</h1>
//             </div>
//             <div>
//                 <p className="text-xs">Returns</p>
//                 <h1 className="font-medium text-sm">&Orders</h1>
//             </div>
//             <Link href={"/cart"} className="cursor-pointer">
//                 <p className="relative top-3 left-5">{cart.length}</p>
//                 <div className="flex">
//                  <div>
//               <FaShoppingCart size={"40px"}/>
//                 </div>
//                 <h1 className="mt-4">cart</h1>
//                  </div>
//             </Link>
//            </div>
//          </div>
//          </div> 
//          <div className="bg-[#232F3E] w-full text-white p-2 flex justify-between items-center ">
//             <div>
//                  {
//             itemList.map((link,idx)=>{
//                 return(
//                      <Link 
//                          key={idx} 
//                      href={`/${link.toLowerCase().replace(/\s+/g, '-')}`} 
//                     className="hover:border border border-transparent hover:border-white mx-2 p-2"
//                     >
//                       {link}
//                      </Link>
//                 )
//             })
//           }
//             </div>
//             <div className="mr-5">
//                  <h1 onClick={async ()=>{
//                     const {error} = await supabase.auth.signOut();
//                     router.push("/signin")
//                  }}
//                  className="text-[#FEBD69] font-bold cursor-pointer hover:underline">Sign out</h1>
//             </div>
//          </div>
//         </>
//     )
// }

// export default Header;
"use client";
// import { headers } from "next/headers";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import amazonLogo from "../public/amazon-logo-2.webp";
import { FaShoppingCart } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppSelector } from "./AddToCartContainer";
import { getCart } from "@/redux/cartSlice";
import { supabase } from "@/lib/supabase/products";
import type { User } from "@supabase/supabase-js"; // ✅ import User type

const itemList = [
  "All",
  "Fresh",
  "Amazon miniTV",
  "Sell",
  "Gift Cards",
  "Baby",
  "Buy Again",
  "Browsing History",
  "Amazon Pay",
  "Gift Ideas",
  "Health, Household & Personal Care",
];

const Header = () => {
  const [query, setQuery] = useState<string>("");
  const [user, setUser] = useState<User | null>(null); // ✅ typed properly
  const router = useRouter();

  const cart = useAppSelector(getCart);

  const searchHandler = () => {
    router.push(`/search/${query}`);
  };

  useEffect(() => {
    const getUserData = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error(error);
        return;
      }
      setUser(data.user); // 👈 correctly typed now
    };

    getUserData();
  }, []);

  console.log(user);

  return (
    <>
      <div className="bg-[#131921] text-white py-1">
        <div className="flex items-center justify-between w-[90%] mx-auto">
          <Link href={"/"} className="w-[10%]">
            <Image src={amazonLogo} alt={"logo"} width={140} height={140} />
          </Link>

          <div className="flex items-center w-[60%] ">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Search Amazon.in"
              className="bg-white text-black p-2 outline-none rounded-l-md w-full"
            />
            <div
              onClick={searchHandler}
              className="bg-[#FEBD69] cursor-pointer hover:bg-[#ffad43] p-2 rounded-r-md"
            >
              <FaSearch size={"24px"} className="text-black" />
            </div>
          </div>

          <div className="flex items-center justify-around w-[20%]">
            <div
              onClick={() => {
                router.push("/signin");
              }}
              className="cursor-pointer"
            >
              <h1 className="text-sm hover:underline">
                {user
                  ? user.user_metadata?.user_name ||
                    user.user_metadata?.full_name ||
                    user.email
                  : "Sign in"}
              </h1>
              <h1 className="font-medium text-sm">Account & Lists</h1>
            </div>
            <div>
              <p className="text-xs">Returns</p>
              <h1 className="font-medium text-sm">&Orders</h1>
            </div>
            <Link href={"/cart"} className="cursor-pointer">
              <p className="relative top-3 left-5">{cart.length}</p>
              <div className="flex">
                <div>
                  <FaShoppingCart size={"40px"} />
                </div>
                <h1 className="mt-4">cart</h1>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-[#232F3E] w-full text-white p-2 flex justify-between items-center ">
        <div>
          {itemList.map((link, idx) => (
            <Link
              key={idx}
              href={`/${link.toLowerCase().replace(/\s+/g, "-")}`}
              className="hover:border border border-transparent hover:border-white mx-2 p-2"
            >
              {link}
            </Link>
          ))}
        </div>
        <div className="mr-5">
          <h1
            onClick={async () => {
              await supabase.auth.signOut(); // ✅ no unused `error`
              router.push("/signin");
            }}
            className="text-[#FEBD69] font-bold cursor-pointer hover:underline"
          >
            Sign out
          </h1>
        </div>
      </div>
    </>
  );
};

export default Header;
