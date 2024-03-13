export interface RankDetails {
  slug: string;
  title: string;
  demographic: string;
  content_rating: string;
  genres: number[];
  last_chapter: number;
  md_covers: MdCovers;
}

export interface MdCovers {
  vol?: string;
  w: number;
  h: number;
  b2key: string;
}

type TopMangaApiResponse = { rank: RankDetails[] };

export interface FirstChap {
  chap: string;
  hid: string;
  lang: string;
  group_name: string[];
  vol: string;
}

export interface Links {
  al: string;
  ap: string;
  bw: string;
  kt: string;
  mu: string;
  amz: string;
  cdj: string;
  ebj: string;
  mal: string;
  raw: string;
  engtl: string;
}

export interface Relates {
  title: string;
  slug: string;
  hid: string;
  md_covers: MdCovers;
}

export interface Recommendations {
  up: number;
  down: number;
  total: number;
  relates: Relates;
}

export interface RelateTo {
  slug: string;
  title: string;
}

export interface MdRelates {
  name: string;
}

export interface RelateFrom {
  relate_to: RelateTo;
  md_realtes: MdRelates;
}

export interface MdTitle {
  title: string;
  lang: string;
}

export interface MdGenre {
  name: string;
  type?: string;
  slug: string;
  group: string;
}

export interface MuPublishers {
  title: string;
  slug: string;
}

export interface MuComicPublishers {
  mu_publishers: MuPublishers;
}

export interface MuCategories {
  title: string;
  slug: string;
}

export interface MuComicCategory {
  mu_categories: MuCategories;
  positive_vote: number;
  negative_vote: number;
}

export interface MuComics {
  mu_comic_publishers: MuComicPublishers;
  licensed_in_english: boolean;
  mu_comic_categories: MuComicCategories;
}

export interface Comic {
  id: number;
  hid: string;
  title: string;
  country: string;
  links: Links;
  last_chapter: number;
  chapter_count: number;
  dempgraphic: number;
  hentai: boolean;
  user_follow_count: number;
  follow_rank: number;
  comment_count: number;
  follow_count: number;
  desc: string;
  slug: string;
  mismatch: null;
  year: number;
  bayesian_rating: string;
  rating_count: number;
  translation_completed: boolean;
  chapter_numbers_reset_on_new_volume_manual: boolean;
  final_chapter: null;
  final_volume: null;
  noindex: boolean;
  adsense: boolean;
  recommendations: Recommendations[];
  relate_from: RelateFrom[];
  md_titles: MdTitle[];
  md_comic_md_genres: MdGenre[];
  md_covers: MdCovers[];
  mu_comics: MuComics;
  iso639_1: string;
  lang_name: string;
  lang_native: string;
}

export interface Artist {
  name: string;
  slug: string;
}

export interface Author {
  name: string;
  slug: string;
}

export interface ComicContent {
  firstChap: FirstChap;
  comic: Comic;
  artists: Artist[];
  authors: Author[];
  langList: string[];
  recommendable: boolean;
  demographic: string;
  englishLink?: null;
  matureContent: boolean;
  checkVol2Chap1: boolean;
}

type ComicContentApiResponse = { data: ComicContent };
