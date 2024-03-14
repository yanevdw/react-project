import axios from "axios";
import {
  RankDetails,
  ComicContentApiResponse,
  ChaptersResponse,
  ChapterContent,
} from "../models/state";

// Call the API to get the top/trending manga.
export async function fetchTopManga(): Promise<RankDetails[]> {
  const response = await axios.get(
    "https://api.comick.fun/top?type=trending&comic_types=manga&accept_mature_content=false"
  );
  return response.data.rank;
}

// Call the API to get the top/trending manwha.
export async function fetchTopManwha(): Promise<RankDetails[]> {
  const response = await axios.get(
    "https://api.comick.fun/top?type=trending&comic_types=manwha&accept_mature_content=false"
  );
  return response.data.rank;
}

// Call the API to get the top/trending manhua.
export async function fetchTopManhua(): Promise<RankDetails[]> {
  const response = await axios.get(
    "https://api.comick.fun/top?type=trending&comic_types=manhua&accept_mature_content=false"
  );
  return response.data.rank;
}

// Call the API to get a specified comic's content using the slug assoicated with the comic.
export async function fetchComicContent(
  comicName: string
): Promise<ComicContentApiResponse> {
  const response = await axios.get(`https://api.comick.fun/comic/${comicName}`);
  return response.data;
}

//Call the API to get any images (covers/chapter/etcetera) using the filename of the image.
export async function fetchComicImage(imageName: string): Promise<string> {
  const response = await axios.get(`https://meo3.comick.pictures/${imageName}`);
  return response.data;
}

//Call the API to get a specified comic's chapters based on the comic's hid.
export async function fetchComicChapters(
  comicHid: string
): Promise<ChaptersResponse> {
  const response = await axios.get(
    `https://api.comick.fun/comic/${comicHid}/chapters?lang=en`
  );
  return response.data;
}

//Call the API to get a specified chapter's content based on the chapter's hid.
export async function fetchChapterContent(
  chapterHid: string
): Promise<ChapterContent> {
  const response = await axios.get(
    `https://api.comick.fun/chapter/${chapterHid}`
  );
  return response.data;
}
