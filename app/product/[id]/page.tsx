import { supabase } from "@/lib/supabase/products";
import SingleProduct from "@/components/SingleProduct";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params; // ✅ no async here

  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !product) {
    console.error("Supabase error:", error?.message);
    return <p>Product not found</p>;
  }

  return (
    <div>
      <SingleProduct singleProduct={product} />
    </div>
  );
}
