"use client"
import SearchResult from "@/components/SearchResult";
import { useSupabase } from "@/lib/supabase/hooks/useSupabase";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

const page=()=>{
    const{query}=useParams();
    const{filterData,
    getFilteredData}=useSupabase();

    // useEffect(()=>{
    //     getFilteredData(query.toString());
    // },[query])
    useEffect(() => {
  if (query) {
    const fetchData = async () => {
      const data = await getFilteredData(query.toString());
      console.log("Fetched data:", data);
    };
    fetchData();
  }
}, [query]);
    
    return(
        <div><SearchResult filterData={filterData}/> </div>
    )
}

export default page;