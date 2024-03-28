export interface MdCover {
  vol?: string;
  w: number;
  h: number;
  b2key: string;
}

// Comic Information API response

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
  lang?: string;
}

export interface MdGenre {
  name: string;
  type: string | null;
  slug: string;
  group: string;
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
  title?: string;
}

export interface Chapter {
  id: number;
  chap: string;
  vol: any;
  title: any;
  hid: string;
  group_name: string[];
  chapter_id: string;
  created_at: string;
  updated_at: string;
  crawled_at: string;
  mdid: string;
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

export interface MuComics {
  year: number;
}

export interface MdChaptersGroup {
  md_groups: MdGroups;
}

export interface MdChaptersGroup {
  md_groups: MdGroups;
}
