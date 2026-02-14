"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const HeroSection = ({ itm }) => {
  
   const router = useRouter()

  return (
    <div className="HeroSection  w-full h-[90dvh] relative flex justify-baseline items-end ">
      <img
        src={itm?.poster}
        alt=""
        className="w-full absolute z-0 h-full object-center object-cover"
      />
      <div className="z-20 py-20 md:px-5 p-2 backdrop-blur-xs w-full md:max-w-[30rem]">
        <div className="md:p-6 p-2 rounded bg-[#0c0b0b2d] shadow shadow-gray-400">
          <h3 className="text-xl md:text-2xl scale-y-150 font-semibold md:w-[25rem] w-full overflow-clip">{
            itm?.title.slice(0,59)}...</h3>
           { itm.description &&
             <p className="text-sm mt-3 text-justify">
              {itm?.description.slice(0,250)}..
            </p>
           }
          { itm.id &&
             <button onClick={()=>{
            router.push(`/details/${itm?.id}`)
           }} className="p-3 my-4 w-full bg-[#80808048] cursor-pointer rounded shadow shadow-gray-400 text-lg">
            View Details
           </button>
          }
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
