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

export interface MdComicMdGenre {
  md_genres: MdGenre;
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
  year: number;
  bayesian_rating: string;
  rating_count: number;
  translation_completed: boolean;
  chapter_numbers_reset_on_new_volume_manual: boolean;
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
  matureContent: boolean;
  checkVol2Chap1: boolean;
}
