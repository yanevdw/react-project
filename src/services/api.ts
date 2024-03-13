import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  TopMangaApiResponse,
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
      transformResponse: (response: TopMangaApiResponse) => response.rank ?? [],
    }),
    // Call to get specific comic's information.
    getComicContent: builder.query<ComicContent, string>({
      query: (name) => `comic/${name}`,
      transformResponse: (response: ComicContentApiResponse) => response.data,
    }),
  }),
});

export const { useGetTopMangaQuery, useGetComicContentQuery } = mangaApi;
