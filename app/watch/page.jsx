"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { api } from "../api";
import LoadingPage from "../Components/LoadingPage";


const Page = () => {
  const searchParams = useSearchParams();
  const q = searchParams.get("q");
  const [IsLoading, setIsLoading] = useState(true);
  const [IsPlayerReady, setIsPlayerReady] = useState(false);
  const [Server, setServer] = useState({});

  const [Data, setData] = useState([]);

  const GetServer = (itm) => {
    setIsPlayerReady(false);
    api
      .get(`/stream?id=${q}&server=${itm.serverName}&type=${itm.type}`)
      .then((res) => {
        const data = res.data.results;
        setServer(data);
      })
      .finally(() => {
        setIsPlayerReady(true);
      });
  };

  useEffect(() => {
    if (q) {
      setIsLoading(true);
      api
        .get(`/servers/${q}`)
        .then((res) => {
          const data = res.data.results;
          setData(data);
          console.log(data)
          GetServer(data[0]);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      location.href = "/";
    }
  }, [q]);

  if (IsLoading) {
    return <LoadingPage />;
  }

  return (
    <div>
        { !IsPlayerReady &&
            <div className="h-64 flex justify-center items-center">
                Player is Being Ready wait
            </div>
        }
      {IsPlayerReady && (
        <div>
          {Server.streamingLink == null ? (
            <div className="h-[80dvh] flex justify-center items-center text-3xl">
              Could't Play This <button className="p-3 bg-white text-black rounded m-3 cursor-pointer" onClick={()=>{
                window.location.reload()
              }}>Retry</button>
            </div>
          ) : (
            <div className="py-6">
              <iframe
                src={Server?.streamingLink?.iframe}
                className="w-full h-[80dvh] bg-gray-950"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
              />
            </div>
          )}
          <div className="flex flex-wrap gap-3 p-2">
            {
               Data.map((itm,idx)=>{
                return (
                    <button onClick={()=>{
                        GetServer(itm)
                    }} className="bg-[#ffffff2c] p-2 flex-1 rounded cursor-pointer backdrop-blur-xs shadow shadow-gray-500" key={idx}>{itm.type + " " + itm.serverName}</button>
                )
               }) 
            }
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
