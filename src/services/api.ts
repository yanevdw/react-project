import axios from "axios";
import {
  RankDetails,
  ComicContentApiResponse,
  ChaptersResponse,
  ChapterContent,
} from "../models/state";

const baseURL = "https://api.comick.fun/";
// Call the API to get the top/trending manga.
export async function fetchTopManga(): Promise<RankDetails[]> {
  const response = await axios.get(
    `${baseURL}top?type=trending&comic_types=manga&accept_mature_content=false`
  );
  return response.data.rank;
}

// Call the API to get the top/trending manhwa.
export async function fetchTopManhwa(): Promise<RankDetails[]> {
  const response = await axios.get(
    `${baseURL}top?type=trending&comic_types=manhwa&accept_mature_content=false`
  );
  return response.data.rank;
}

// Call the API to get the top/trending manhua.
export async function fetchTopManhua(): Promise<RankDetails[]> {
  const response = await axios.get(
    `${baseURL}top?type=trending&comic_types=manhua&accept_mature_content=false`
  );
  return response.data.rank;
}

// Call the API to get a specified comic's content using the slug assoicated with the comic.
export async function fetchComicContent(
  comicName: string
): Promise<ComicContentApiResponse> {
  const response = await axios.get(`${baseURL}comic/${comicName}`);
  return response.data;
}

//Call the API to get a specified comic's chapters based on the comic's hid.
export async function fetchComicChapters(
  comicHid: string
): Promise<ChaptersResponse> {
  const response = await axios.get(
    `${baseURL}comic/${comicHid}/chapters?lang=en`
  );
  return response.data;
}

//Call the API to get a specified chapter's content based on the chapter's hid.
export async function fetchChapterContent(
  chapterHid: string
): Promise<ChapterContent> {
  const response = await axios.get(`${baseURL}chapter/${chapterHid}`);
  return response.data;
}
