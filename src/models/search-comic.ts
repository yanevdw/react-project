import { MdCover, MdTitle, MuComics } from "./common-types";

export interface SearchComic {
  id: number;
  hid: string;
  slug: string;
  title: string;
  rating?: string;
  bayesian_rating?: string;
  rating_count: number;
  follow_count: number;
  desc: string;
  status: number;
  last_chapter: number;
  translation_completed?: boolean;
  view_count: number;
  content_rating: string;
  demographic?: number;
  uploaded_at: string;
  genres: number[];
  created_at: string;
  user_follow_count: number;
  year: number;
  country: string;
  md_titles: MdTitle[];
  md_covers: MdCover[];
  mu_comics?: MuComics;
}
