// import React from "react";
// import Image from "next/image";

// const Ratings = ({ ratings }: { ratings: any }) => {
//     ratings=JSON.parse(ratings);
//   return (
//     <div className="flex items-center">
//       {Array(4).fill(1).map((_,index) => (
//           <Image key={index}src="/star-icon.png" width={20} height={20}alt="rating"/>
//         ))}
//       <h1 className="text-[#007185] ml-2 font-medium">{ratings.count} ratings</h1>
//     </div>
//   );
// };

// export default Ratings;
// components/shared/Ratings.tsx
// components/shared/Ratings.tsx
// components/shared/Ratings.tsx
// components/shared/Ratings.tsx
// components/shared/Ratings.tsx
import React from "react";
import Image from "next/image";

interface RatingData {
  rate?: number;
  count?: number;
}

interface RatingsProps {
  ratings: number | string | RatingData | undefined | null;
}

const Ratings = ({ ratings }: RatingsProps) => {
  // Handle different rating formats
  let ratingValue = 0;
  let ratingCount = 0;

  if (typeof ratings === 'string') {
    try {
      // Parse JSON string like "{\"rate\": 3.9, \"count\": 120}"
      const parsed = JSON.parse(ratings);
      if (parsed && typeof parsed === 'object') {
        ratingValue = Number(parsed.rate) || 0;
        ratingCount = Number(parsed.count) || 0;
      }
    } catch (error) {
      console.error("Failed to parse rating:", error);
      // If JSON parsing fails, try to extract numbers from string
      const rateMatch = ratings.match(/"rate":\s*([0-9.]+)/);
      const countMatch = ratings.match(/"count":\s*([0-9.]+)/);
      ratingValue = rateMatch ? Number(rateMatch[1]) : 0;
      ratingCount = countMatch ? Number(countMatch[1]) : 0;
    }
  } else if (typeof ratings === 'object' && ratings !== null) {
    // Handle rating object {rate: number, count: number}
    ratingValue = Number(ratings.rate) || 0;
    ratingCount = Number(ratings.count) || 0;
  } else if (typeof ratings === 'number') {
    // Handle number rating
    ratingValue = ratings;
  }

  // Don't show anything if no valid rating exists
  if (ratingValue === 0 || isNaN(ratingValue)) {
    return null;
  }

  return (
    <div className="flex items-center">
      {Array(5).fill(1).map((_, index) => (
        <Image 
          key={index} 
          src="/star-icon.png" 
          width={20} 
          height={20} 
          alt="rating"
          className={index < Math.floor(ratingValue) ? "opacity-100" : "opacity-30"}
        />
      ))}
      <h1 className="text-[#087185] ml-2 font-medium">
        {ratingValue.toFixed(1)} {ratingCount > 0 && `(${ratingCount} ratings)`}
      </h1>
    </div>
  );
};

export default Ratings;