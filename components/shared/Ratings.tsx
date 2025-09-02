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
import React from "react";
import Image from "next/image";

interface RatingsProps {
  ratings: number | string | undefined; // Add undefined to the type
}

const Ratings = ({ ratings }: RatingsProps) => {
  // Handle undefined rating by providing a default
  const ratingValue = ratings ? (typeof ratings === 'string' ? JSON.parse(ratings) : ratings) : 0;
  
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
        {ratingValue} rating
      </h1>
    </div>
  );
};

export default Ratings;