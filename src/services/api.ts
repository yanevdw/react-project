import axios from "axios";
import { Rank } from "../models/top-comics";
import { ComicContent } from "../models/comic";
import { ComicChapters } from "../models/comic-chapters";
import { ChapterContent } from "../models/chapter";
import { SearchComic } from "../models/search-comic";

const baseURL = "https://api.comick.fun/";
const baseSeachURL = `${baseURL}v1.0/search/`;
// Call the API to get the top/trending comics.
export async function fetchTopComics(comicType: string): Promise<Rank> {
  const response = await axios.get<Rank>(
    `${baseURL}top?type=trending&comic_types=${comicType}&accept_mature_content=false`
  );
  return response.data;
}

// Call the API to get a specified comic's content using the slug assoicated with the comic.
export async function fetchComicContent(
  comicName: string
): Promise<ComicContent> {
  const response = await axios.get<ComicContent>(
    `${baseURL}comic/${comicName}`
  );
  return response.data;
}

// Call the API to get a specified comic's chapters based on the comic's hid.
export async function fetchComicChapters(
  comicHid: string,
  chapterCount: number
): Promise<ComicChapters> {
  const response = await axios.get<ComicChapters>(
    `${baseURL}comic/${comicHid}/chapters?lang=en&limit=${chapterCount * 6}`
  );
  return response.data;
}

// Call the API to get a specified chapter's content based on the chapter's hid.
export async function fetchChapterContent(
  chapterHid: string
): Promise<ChapterContent> {
  const response = await axios.get<ChapterContent>(
    `${baseURL}chapter/${chapterHid}`
  );
  return response.data;
}

// Call the API to search for comics with a specific genre.
export async function searchComicByGenre(
  comicGenre: string
): Promise<SearchComic[]> {
  const response = await axios.get<SearchComic[]>(
    `${baseSeachURL}?genres=${comicGenre}&page=1&limit=15&showall=false&t=false`
  );
  return response.data;
}

export async function searchComicByName(
  comicName: string
): Promise<SearchComic[]> {
  const response = await axios.get<SearchComic[]>(
    `${baseSeachURL}?q=${comicName}&page=1&limit=15&showall=false&t=false`
  );
  return response.data;
}
