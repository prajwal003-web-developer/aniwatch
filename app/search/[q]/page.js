"use client"
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { api } from '../../api'
import LoadingPage from '../../Components/LoadingPage'
import Box from '../../Components/Box'
import HeroSection from '../../Components/HeroSection'


const Page = () => {

  const params = useParams();
    const q = params.q;
  const [IsLoading, setIsLoading] = useState(true)

  const [Data, setData] = useState([])

  useEffect(() => {
    if (q) {
      setIsLoading(true)
      api.get(`/search?keyword=${q}`)
        .then((res) => {
          const data = res.data.results.data
          setData(data)
          console.log(data)
        })
        .finally(() => {
          setIsLoading(false)
        })
    } else {
      location.href = '/'
    }
  }, [q])

  if (IsLoading) {
    return <LoadingPage />
  }

  return (
    <div>
      {
        Data.length <= 0 &&
        <div className='h-[90dvh] rounded-2xl text-gray-400 m-3 overflow-clip w-[96vw] mx-auto flex justify-center items-center text-lg bg-[#8080801f]'>
          No Data Found on Query : {q}
        </div>
      }
      {  Data.length > 0 &&
        <>
         <HeroSection itm={Data[Data.length-1]}/>
                  
          <div className='flex flex-row-reverse justify-center flex-wrap items-center gap-2 mt-4'>
                {
                  Data.slice(0,Data.length-1)?.map((itm,idx)=>{
                    return <Box key={idx} data={itm}/>
                  })
                }
          </div>
        </>
      }
    </div>
  )
}

export default Page
