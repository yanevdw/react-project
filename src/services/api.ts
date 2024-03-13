import axios from "axios";
import {
  // MangaApiResponse,
  RankDetails,
  ComicContentApiResponse,
  // ComicContent,
  // ComicContentApiResponse,
} from "../models/state";

export async function fetchTopManga(): Promise<RankDetails[]> {
  const response = await axios.get(
    "https://api.comick.fun/top?type=trending&comic_types=manga&accept_mature_content=false"
  );
  return response.data.rank;
}
export async function fetchComicContent(
  comicName: string
): Promise<ComicContentApiResponse> {
  const response = await axios.get(`https://api.comick.fun/comic/${comicName}`);
  return response.data;
}

export async function fetchTopManwha(): Promise<RankDetails[]> {
  const response = await axios.get(
    "https://api.comick.fun/top?type=trending&comic_types=manwha&accept_mature_content=false"
  );
  return response.data.rank;
}

export async function fetchTopManhua(): Promise<RankDetails[]> {
  const response = await axios.get(
    "https://api.comick.fun/top?type=trending&comic_types=manwha&accept_mature_content=false"
  );
  return response.data.rank;
}
