
// import { useEffect, useState } from "react";
// import{ supabase} from "../products";

// export const useSupabase = () => {
//   const [products, setProducts] = useState<any[]>([]);
//   const [filterData, setFilterData] = useState<any[]>([]);
//   const [singleProduct, setSingleProduct] = useState<any | null>(null);
//   const [mensProduct, setMensProduct] = useState<any[]>([]);
//   const [womensProduct, setWomensProduct] = useState<any[]>([]);

//   const getDataFromSupabase = async () => {
//     const { data, error } = await supabase.from("products").select("*");
//     if (data) setProducts(data);
//     if (error) console.error(error);
//   };

//   const getFilteredData = async (query: string) => {
//     const { data, error } = await supabase
//       .from("products")
//       .select("*")
//       .or(
//         `title.ilike.%${query}%,description.ilike.%${query}%,category.ilike.%${query}%`
//       );

//     if (data) {
//       setFilterData(data); // 👈 use filterData instead of overwriting products
//     }
//     if (error) console.error("Supabase error:", error);
//   };

//   // 👇 Run only once on mount
//   useEffect(() => {
//     getDataFromSupabase();
//   }, []);
// const getSingleProduct = async (id: number) => {
//   const { data, error } = await supabase
//     .from("products")
//     .select("id,title,price,description,image,thumbnail,image_url")
//     .eq("id", id)
//     .single(); // 👈 fetch exactly one row

//   if (error) {
//     console.log(error);
//     setSingleProduct(null);
//     return;
//   }

//   const normalized = {
//     ...data,
//     image: data.image || data.thumbnail || data.image_url || null,
//   };

//   setSingleProduct(normalized);
// };

//   const getMensClothing = async () => {
//   let { data, error } = await supabase
//     .from("products")
//     .select("*")
//     .ilike("category", `men's clothing`);

//   if (data) {
//     setMensProduct(data);
//   }
//   if (error) {
//     console.log(error);
//   }
// };

// const getWomensClothing = async () => {
//   let { data, error } = await supabase
//     .from("products")
//     .select("*")
//     .ilike("category", `women's clothing`);

//   if (data) {
//     setWomensProduct(data);
//   }
//   if (error) {
//     console.log(error);
//   }
// };

//   return {
//     products,
//     filterData,
//     getDataFromSupabase,
//     getFilteredData,
//     singleProduct,
//     getSingleProduct,
//     mensProduct,
//     getMensClothing,
//     womensProduct,
//     getWomensClothing
//   };
// };


import { useEffect, useState } from "react";
import { supabase } from "../products";

// Define proper interfaces for your product data
interface Product {
  id: string | number;
  title: string;
  price: number;
  description?: string;
  image?: string;
  thumbnail?: string;
  image_url?: string;
  category?: string;
  rating?: number;
}

export const useSupabase = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filterData, setFilterData] = useState<Product[]>([]);
  const [singleProduct, setSingleProduct] = useState<Product | null>(null);
  const [mensProduct, setMensProduct] = useState<Product[]>([]);
  const [womensProduct, setWomensProduct] = useState<Product[]>([]);

  const getDataFromSupabase = async () => {
    const { data, error } = await supabase.from("products").select("*");
    if (data) setProducts(data as Product[]);
    if (error) console.error(error);
  };

  const getFilteredData = async (query: string) => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .or(
        `title.ilike.%${query}%,description.ilike.%${query}%,category.ilike.%${query}%`
      );

    if (data) {
      setFilterData(data as Product[]);
    }
    if (error) console.error("Supabase error:", error);
  };

  useEffect(() => {
    getDataFromSupabase();
  }, []);

  const getSingleProduct = async (id: number) => {
    const { data, error } = await supabase
      .from("products")
      .select("id,title,price,description,image,thumbnail,image_url")
      .eq("id", id)
      .single();

    if (error) {
      console.log(error);
      setSingleProduct(null);
      return;
    }

    const normalized: Product = {
      ...data,
      image: data.image || data.thumbnail || data.image_url || "",
    };

    setSingleProduct(normalized);
  };

  const getMensClothing = async () => {
    const { data, error } = await supabase // Changed from 'let' to 'const'
      .from("products")
      .select("*")
      .ilike("category", `men's clothing`);

    if (data) {
      setMensProduct(data as Product[]);
    }
    if (error) {
      console.log(error);
    }
  };

  const getWomensClothing = async () => {
    const { data, error } = await supabase // Changed from 'let' to 'const'
      .from("products")
      .select("*")
      .ilike("category", `women's clothing`);

    if (data) {
      setWomensProduct(data as Product[]);
    }
    if (error) {
      console.log(error);
    }
  };

  return {
    products,
    filterData,
    getDataFromSupabase,
    getFilteredData,
    singleProduct,
    getSingleProduct,
    mensProduct,
    getMensClothing,
    womensProduct,
    getWomensClothing
  };
};
