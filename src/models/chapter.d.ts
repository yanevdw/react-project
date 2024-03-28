import { MdGroups, Chapter } from "./common-types";

export interface ChapterContent {
  chapter: Chapter;
  next: Next;
  prev: Prev;
  matureContent: boolean;
  chapters: Chapter[];
  dupGroupChapters: DupGroupChapter[];
  chapterLangList: ChapterLangList[];
  canonical: string;
  seoTitle: string;
  seoDescription: string;
  chapTitle: string;
  checkVol2Chap1: boolean;
}

export interface Prev {
  chap: string;
  vol?: string;
  title?: string;
  hid: string;
  lang: string;
  id: number;
  href: string;
}
export interface Next {
  chap: string;
  vol?: string;
  title?: string;
  hid: string;
  lang: string;
  id: number;
  href: string;
}

export interface DupGroupChapter {
  id: number;
  hid: string;
  chap: string;
  group_name: string[];
  md_chapters_groups: MdGroups[];
}

export interface ChapterLangList {
  lang: string;
  hid: string;
}
