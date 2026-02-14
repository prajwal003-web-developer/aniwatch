export const dynamic = "force-dynamic";

'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { api } from '../api';
import LoadingPage from '../Components/LoadingPage';
import Box from '../Components/Box';
import HeroSection from '../Components/HeroSection';

const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const q = searchParams.get('q');

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!q) {
      router.replace('/'); // safer than location.href
      return;
    }

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await api.get(`/search?keyword=${q}`);
        const results = res?.data?.results?.data || [];
        setData(results);
      } catch (error) {
        console.error("Search error:", error);
        setData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [q, router]);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div>
      {data.length === 0 && (
        <div className='h-[90dvh] rounded-2xl text-gray-400 m-3 overflow-clip w-[96vw] mx-auto flex justify-center items-center text-lg bg-[#8080801f]'>
          No Data Found on Query : {q}
        </div>
      )}

      {data.length > 0 && (
        <>
          <HeroSection itm={data[data.length - 1]} />

          <div className='flex flex-row-reverse justify-center flex-wrap items-center gap-2 mt-4'>
            {data.slice(0, data.length - 1).map((itm, idx) => (
              <Box key={idx} data={itm} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
