"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import LoadingPage from "@/app/Components/LoadingPage";
import { api } from "@/app/api";
import HeroSection from "@/app/Components/HeroSection";
import { Star, Tv, Clock, Calendar, Film, Layers } from "lucide-react";
import PageSwiper from "@/app/Components/PageSwiper";
import Link from "next/link";

const Page = () => {
  const params = useParams();
  const id = params.id;

  const [IsLoading, setIsLoading] = useState(true);
  const [Data, setData] = useState({});
  const [ServerData, setServerData] = useState({});

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      api
        .get(`/info?id=${id}`)
        .then((res) => {
          const data = res.data.results.data;
          setData(data);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      location.href = "/";
    }
  }, [id]);

  useEffect(() => {
    api.get(`/episodes/${id}`).then((res) => {
      const data = res.data.results
      setServerData(data);
      console.log(data);
    });
  }, [id]);

  if (IsLoading) return <LoadingPage />;

  return (
    <div className="bg-black text-white min-h-screen">
      {/* 🔥 HERO SECTION */}
      <HeroSection
        itm={{
          description: Data?.animeInfo?.Overview || Data?.description,
          poster: Data?.poster,
          title: Data?.title,
        }}
      />

      {/* 🧩 Leave space for your future section */}
     { ServerData?.episodes?.length>0 &&
        <div className="overflow-clip p-2 flex flex-wrap gap-2 m-3 bg-[#ffffff10] shadow shadow-gray-600 rounded backdrop-blur-xs">
            {
                ServerData.episodes.map((itm,idx)=>{
                    return (
                        <Link href={`/watch/${itm.id.replaceAll("?","~")}`} className=" h-fit p-2 text-nowrap flex-1 px-6 rounded text-center shadow shadow-gray-600 backdrop-blur-xs bg-[#ffffff21] cursor-pointer" key={idx}>
                            ep: {itm.episode_no + "-> "}  {itm.title}
                        </Link>
                    )
                })
            }
      </div>
     }

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Side */}
          <div className="space-y-4">
            <InfoRow
              icon={<Star size={18} />}
              label="Rating"
              value={Data?.tvInfo?.rating}
            />
            <InfoRow
              icon={<Tv size={18} />}
              label="Type"
              value={Data?.showType}
            />
            <InfoRow
              icon={<Clock size={18} />}
              label="Duration"
              value={Data?.animeInfo?.Duration}
            />
            <InfoRow
              icon={<Calendar size={18} />}
              label="Aired"
              value={Data?.animeInfo?.Aired}
            />
            <InfoRow
              icon={<Layers size={18} />}
              label="Status"
              value={Data?.animeInfo?.Status}
            />
            <InfoRow
              icon={<Film size={18} />}
              label="Episodes"
              value={Data?.tvInfo?.eps}
            />
          </div>

          {/* Right Side */}
          <div className="space-y-4">
            {/* Genres */}
            <div>
              <p className="text-gray-400 mb-2">Genres</p>
              <div className="flex flex-wrap gap-2">
                {Data?.animeInfo?.Genres?.map((g, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm bg-white/10 rounded-full"
                  >
                    {g}
                  </span>
                ))}
              </div>
            </div>

            {/* Studios */}
            <div>
              <p className="text-gray-400 mb-1">Studio</p>
              <p>{Data?.animeInfo?.Studios}</p>
            </div>

            {/* Producers */}
            <div>
              <p className="text-gray-400 mb-1">Producers</p>
              <p>{Data?.animeInfo?.Producers?.join(", ")}</p>
            </div>
          </div>
        </div>
      </div>

      {Data.popular_data && (
        <PageSwiper name="Popular" itm={Data.popular_data} />
      )}

      {Data.related_data && (
        <PageSwiper name="Related" itm={Data.related_data} />
      )}
      {Data.recommended_data && (
        <PageSwiper name="recommended_data" itm={Data.recommended_data} />
      )}
    </div>
  );
};

export default Page;

/* 🔥 Reusable Info Row Component */
const InfoRow = ({ icon, label, value }) => {
  if (!value) return null;

  return (
    <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg backdrop-blur-sm">
      <div className="text-orange-400">{icon}</div>
      <div>
        <p className="text-gray-400 text-sm">{label}</p>
        <p className="text-white font-medium">{value}</p>
      </div>
    </div>
  );
};
