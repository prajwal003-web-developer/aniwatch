"use client";
import React, { useRef } from "react";
import Box from "./Box";
import { MoveLeft, MoveRight } from "lucide-react";

const PageSwiper = ({ itm, name = "Trending Now" }) => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -500, // adjust scroll distance
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 500,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <h3 className="p-1 font-semibold flex justify-between items-center my-1">
        <span>{name}:</span>
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={scrollLeft}
            className="p-2 bg-[#ffffff2c] rounded cursor-pointer"
          >
            <MoveLeft />
          </button>
          <button
            onClick={scrollRight}
            className="p-2 bg-[#ffffff1c] rounded cursor-pointer"
          >
            <MoveRight />
          </button>
        </div>
      </h3>

      <div
        ref={scrollRef}
        className="overflow-x-scroll p-1 noScrollBar flex gap-2 h-64 overflow-clip max-h-64 bg-[#1a181815] shadow shadow-gray-700 m-1 rounded backdrop-blur-sm max-w-[99dvw]"
      >
        {itm.map((itm, idx) => {
          return <Box key={itm.id + Math.random()} data= {itm}/>;
        })}
      </div>
    </>
  );
};

export default PageSwiper;
