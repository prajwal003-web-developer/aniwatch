import { create } from "zustand";

export const useStoreManual = create((set) => ({
  HomeData: {},
  IsHomeDataFetched: false,

  AnimeData: {},
  IsAnimeDataFetched: false,

  MovieData: {},
  IsMovieDataFetched: false,

  TvData: {},
  IsTvDataFetched: false,

  setHomeData: (data) =>
    set({
      HomeData: data,
      IsHomeDataFetched: true,
    }),

  setAnimeData: (data) =>
    set({
      AnimeData: data,
      IsAnimeDataFetched: true,
    }),

  setMovieData: (data) =>
    set({
      MovieData: data,
      IsMovieDataFetched: true,
    }),

  setTvData: (data) =>
    set({
      TvData: data,
      IsTvDataFetched: true,
    }),

  // optional reset (nice to have)
  resetAll: () =>
    set({
      HomeData: {},
      IsHomeDataFetched: false,
      AnimeData: {},
      IsAnimeDataFetched: false,
      MovieData: {},
      IsMovieDataFetched: false,
      TvData: {},
      IsTvDataFetched: false,
    }),
}));
