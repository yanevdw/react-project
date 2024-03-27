import axios from "axios";
import {
  RankDetails,
  ChapterContent,
  ComicContent,
  ChapterResult,
} from "../models/state";

const baseURL = "https://api.comick.fun/";
// Call the API to get the top/trending comics.
export async function fetchTopComics(
  comicType: string
): Promise<RankDetails[]> {
  const response = await axios.get(
    `${baseURL}top?type=trending&comic_types=${comicType}&accept_mature_content=false`
  );
  return response.data.rank;
}

// Call the API to get a specified comic's content using the slug assoicated with the comic.
export async function fetchComicContent(
  comicName: string
): Promise<ComicContent> {
  const response = await axios.get(`${baseURL}comic/${comicName}`);
  return response.data;
}

//Call the API to get a specified comic's chapters based on the comic's hid.
export async function fetchComicChapters(
  comicHid: string,
  chapterCount: number
): Promise<ChapterResult> {
  const response = await axios.get(
    `${baseURL}comic/${comicHid}/chapters?lang=en&limit=${chapterCount * 6}`
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
