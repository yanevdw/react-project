import { MdCover } from "./common-types";

export interface RankDetails {
  slug: string;
  title: string;
  demographic: string;
  content_rating: string;
  genres: number[];
  last_chapter: number;
  md_covers: MdCover[];
}

export interface Rank {
  rank: RankDetails[];
}
