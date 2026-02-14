"use client";
import React, { useEffect, useState } from "react";
import { useStoreManual } from "../Stores/AllStore";
import LoadingPage from "../Components/LoadingPage";
import { api } from "../api";
import HeroSection from "../Components/HeroSection";
import PageSwiper from "../Components/PageSwiper";

const Home = () => {
  const { HomeData, setHomeData, IsHomeDataFetched } = useStoreManual();
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    if (!IsHomeDataFetched) {
      setLoading(true);
      const data = api
        .get("/")
        .then((res) => {
          const data = res.data;
          console.log(data.results);
          setHomeData(data?.results);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  if (Loading) return <LoadingPage />;
  return (
    <div>
      <HeroSection itm={HomeData?.spotlights[Math.floor(Math.random() * HomeData?.spotlights.length )]} />
      {/* { HomeData &&
        Object.entries(HomeData).map(([key,value])=>{
            if(key=='genres'){
                return null
            }
            console.log(typeof value)
            return <PageSwiper itm={value} key={key} name={key}/>
        })
       } */}

      {HomeData?.latestCompleted?.length > 0 && (
        <PageSwiper itm={HomeData.latestCompleted} name="latestCompleted" />
      )}

      {HomeData?.latestEpisode?.length > 0 && (
        <PageSwiper itm={HomeData.latestEpisode} name="latestEpisode" />
      )}

      {HomeData?.mostFavorite?.length > 0 && (
        <PageSwiper itm={HomeData.mostFavorite} name="mostFavorite" />
      )}

      {HomeData?.mostPopular?.length > 0 && (
        <PageSwiper itm={HomeData.mostPopular} name="mostPopular" />
      )}

      {HomeData?.spotlights?.length > 0 && (
        <PageSwiper itm={HomeData.spotlights} name="spotlights" />
      )}

      {HomeData?.topAiring?.length > 0 && (
        <PageSwiper itm={HomeData.topAiring} name="topAiring" />
      )}



      {HomeData?.topTen?.today?.length > 0 && (
        <PageSwiper itm={HomeData.topTen.today} name="topTen-today" />
      )}

      {HomeData?.topTen?.week?.length > 0 && (
        <PageSwiper itm={HomeData.topTen.week} name="topTen-Week" />
      )}

      {HomeData?.topTen?.month?.length > 0 && (
        <PageSwiper itm={HomeData.topTen.month} name="topTen-Month" />
      )}

      {HomeData?.trending?.length > 0 && (
        <PageSwiper itm={HomeData.trending} name="trending" />
      )}
    </div>
  );
};

export default Home;
