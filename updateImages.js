import fetch from "node-fetch";
import { createClient } from "@supabase/supabase-js";

// ⬅️ Replace with your real project values
const supabase = createClient(
  "https://bgbilywdwlmmmjhkscsk.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnYmlseXdkd2xtbW1qaGtzY3NrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NjExNzA0NSwiZXhwIjoyMDcxNjkzMDQ1fQ.5YMTLadR2GJXh_5swyYNp7aG_PmY9UUOIgDa3mJ-cw0"
);

async function updateImages() {
  // Get fresh products from FakeStore API
  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();

  for (const p of products) {
    const { error } = await supabase
      .from("products")
      .update({ image: p.image })
      .eq("id", p.id);

    if (error) {
      console.error("❌ Failed:", p.id, error);
    } else {
      console.log("✅ Updated:", p.id);
    }
  }
}

updateImages();
