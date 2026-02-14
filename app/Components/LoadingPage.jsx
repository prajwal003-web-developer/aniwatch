'use client'
import { LoaderIcon } from 'lucide-react'
import React from 'react'

const LoadingPage = () => {
  return (
    <div className='h-[100dvh] flex justify-center items-center '>
        <div className='animate-spin  duration-1000'>
            <LoaderIcon size={50}/>
        </div>
    </div>
  )
}

export default LoadingPage