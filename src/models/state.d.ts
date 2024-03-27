export interface RankDetails {
  slug: string;
  title: string;
  demographic: string;
  content_rating: string;
  genres: number[];
  last_chapter: number;
  md_covers: MdCover[];
}

export interface MdCover {
  vol?: string;
  w: number;
  h: number;
  b2key: string;
}

type MangaApiResponse = { rank: RankDetails[] };

export interface FirstChap {
  chap: string;
  hid: string;
  lang: string;
  group_name: string[];
  vol: string | null;
}

export interface Link {
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
  md_covers: MdCover;
}

export interface Recommendation {
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
  md_relates: MdRelates;
}

export interface MdTitle {
  title: string;
  lang: string;
}

export interface MdComicMdGenre {
  md_genres: MdGenre;
}

export interface MdGenre {
  name: string;
  type: string | null;
  slug: string;
  group: string;
}

export interface MuPublisher {
  title: string;
  slug: string;
}

export interface MuComicPublisher {
  mu_publishers: MuPublisher;
}

export interface MuCategory {
  title: string;
  slug: string;
}

export interface MuComicCategory {
  mu_categories: MuCategory;
  positive_vote: number;
  negative_vote: number;
}

export interface MuComic {
  mu_comic_publishers: MuComicPublisher;
  licensed_in_english: boolean;
  mu_comic_categories: MuComicCategory;
}

export interface Comic {
  id: number;
  hid: string;
  title: string;
  country: string;
  links: Link;
  last_chapter: number;
  chapter_count: number;
  demographic: number;
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
  recommendations: Recommendation[];
  relate_from: RelateFrom[];
  md_titles: MdTitle[];
  md_comic_md_genres: MdComicMdGenre[];
  md_covers: MdCover[];
  mu_comics: MuComic;
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

export interface Chapter {
  id: number;
  chap: string;
  title: any;
  vol: any;
  lang: string;
  created_at: string;
  updated_at: string;
  up_count: number;
  down_count: number;
  is_the_last_chapter: boolean;
  group_name: string[];
  hid: string;
  identities: null;
  md_chapters_groups: MdChaptersGroup[];
}

export interface MdChaptersGroup {
  md_groups: MdGroups;
}

export interface MdGroups {
  title: string;
  slug: string;
}

export interface ChapterResult {
  chapters: Chapter[];
  total: number;
  limit: number;
}

export interface MdImage {
  h: number;
  w: number;
  name: string;
  s: number;
  b2key: string;
  optimized?: number;
}

export interface MdChaptersGroup {
  md_group_id: number;
  md_groups: MdGroups;
}

export interface MdGroups {
  slug: string;
  title: string;
}

export interface ChapterContent {
  id: number;
  chap: string;
  vol: any;
  title: any;
  hid: string;
  group_name: string[];
  chapter_id: any;
  created_at: string;
  updated_at: string;
  crawled_at: string;
  mdid: any;
  comment_count: number;
  up_count: number;
  down_count: number;
  status: string;
  adsense: boolean;
  lang: string;
  is_the_last_chapter: boolean;
  md_comics: MdComics;
  md_images: MdImage[];
  md_chapters_groups: MdChaptersGroup[];
}
