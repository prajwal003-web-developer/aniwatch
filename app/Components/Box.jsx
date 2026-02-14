"use client"
import Link from 'next/link'
import React from 'react'

const Box = ({data}) => {
  
  return (
    <div className='HeroSection min-w-64 w-64  flex justify-end items-end  py-3 bg-[#f8f3f304] backdrop-blur-sm min-h-64 p-3 rounded h-full relative'>
      <img src={data?.poster} alt="Error" className='fixed shadow h-full w-full inset-0 z-0 object-cover object-center'/>
      <div className='shadow z-20 backdrop-blur-xs overflow-clip shadow-gray-400 p-2 rounded h-24 bg-[#08080844] text-center w-full'>
          <h2 className='font-semibold  text-shadow-2xl text-nowrap mb-2'>
            {data?.title.slice(0,80)}
          </h2>
          <Link 
          href = {`/details/${data?.id}`}
          className="p-3  w-full bg-[#80808048] cursor-pointer shadow shadow-gray-300 rounded text-sm">
            View Details
           </Link>
      </div>
    </div>
  )
}

export default Box