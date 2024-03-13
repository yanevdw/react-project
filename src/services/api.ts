import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  MangaApiResponse,
  RankDetails,
  ComicContentApiResponse,
  ComicContent,
} from "../models/state";

export const mangaApi = createApi({
  reducerPath: "mangaApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.comick.fun/" }),
  endpoints: (builder) => ({
    // Call to get the top/trending manga.
    getTopManga: builder.query<RankDetails[], void>({
      query: () =>
        "top?type=trending&comic_types=manga&accept_mature_content=false",
      transformResponse: (response: MangaApiResponse) => response.rank ?? [],
    }),
    // Call to get specific comic's information.
    getComicContent: builder.query<ComicContent, string>({
      query: (name) => `comic/${name}`,
      transformResponse: (response: ComicContentApiResponse) => response.data,
    }),
    getTopManwha: builder.query<RankDetails[], void>({
      query: () =>
        "top?type=trending&comic_types=manwha&accept_mature_content=false",
      transformResponse: (response: MangaApiResponse) => response.rank ?? [],
    }),
    getTopManhua: builder.query<RankDetails[], void>({
      query: () =>
        "top?type=trending&comic_types=manhua&accept_mature_content=false",
      transformResponse: (response: MangaApiResponse) => response.rank ?? [],
    }),
  }),
});

export const {
  useGetTopMangaQuery,
  useGetComicContentQuery,
  useGetTopManwhaQuery,
} = mangaApi;
