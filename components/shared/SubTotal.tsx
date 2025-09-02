// import React from "react";

// const SubTotal=({length,totalPrice}:{length:number, totalPrice:number})=>{
//     return(
//         <div>
//             <h1 className="text-right text-lg">{`Subtotal (${length} items):`}<span className="font-bold">{`$${totalPrice}`}</span> </h1>
//              <SubTotal length={length} totalPrice={totalPrice}  />
//         </div>
//     )
// }

// export default SubTotal;

import React from "react";

const SubTotal = ({ length,left, totalPrice }: { length: number,left:boolean, totalPrice: number }) => {
  return (
    <div>
     <h1 className={`${left ? "text-left text-sm" : "text-right text-lg"}`}>
  {`Subtotal (${length} items): `}
  <span className="font-bold">{`$${totalPrice.toFixed(2)}`}</span>
</h1>
    </div>
  );
};

export default SubTotal;
