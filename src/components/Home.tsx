import { useQuery } from "@tanstack/react-query";
import { RankDetails } from "../models/top-comics";
import { fetchTopComics } from "../services/api";
import ComicPopup from "./ComicPopup";

function Home() {
  return (
    <>
      <h2 className="text-white font-semibold text-xl">Top Manga</h2>
      <TopComicComponent comicType="Manga" />
      <h2 className="text-white font-semibold text-xl">Top Manhwa</h2>
      <TopComicComponent comicType="Manhwa" />
      <h2 className="text-white font-semibold text-xl">Top Manhua</h2>
      <TopComicComponent comicType="Manhua" />
    </>
  );
}

export default Home;

function TopComicComponent({ comicType }: { comicType: string }) {
  const { data: topComicResults, error } = useQuery({
    queryKey: [`fetchTop${comicType}`],
    queryFn: () => fetchTopComics(comicType.toLowerCase()),
  });

  if (error) {
    console.error("An unexpected error occurred: " + error);
  }

  if (
    !(
      topComicResults?.[0]?.md_covers?.[0]?.b2key ||
      topComicResults?.[0]?.slug ||
      topComicResults?.[0]?.title
    )
  ) {
    return (
      <div
        className={`top-${comicType.toLowerCase()}-container w-full h-3/10 text-center`}
      >
        <p className="p-2 font-sans text-white">
          There is no {comicType.toLowerCase()} to display
        </p>
      </div>
    );
  }

  // Filter the results to ensure that there will always be a cover image and narrow it down to the first 10 comics.
  const topTenComics: RankDetails[] = topComicResults
    .filter((comic: RankDetails) => comic.md_covers?.[0]?.b2key)
    .slice(0, 10);

  return (
    <>
      <div
        className={`top-${comicType.toLowerCase()}-container w-full h-3/10 carousel carousel-center space-x-4 bg-neutral rounded-lg bg-transparent overflow-y-hidden flex align-center py-4 mb-4`}
      >
        {topTenComics.map((comicRec: RankDetails) => (
          <div
            key={comicRec?.slug}
            className="carousel-item w-2/6 h-full p-0 m-0 flex flex-col justify-center relative first:pl-0 hover:cursor-pointer md:w-1/10 lg:w-1/10"
            onClick={() =>
              (
                document.getElementById(
                  `${comicType.toLowerCase()}-comic-popup-${comicRec?.slug}`
                ) as HTMLDialogElement
              ).showModal()
            }
          >
            <dialog
              id={`${comicType.toLowerCase()}-comic-popup-${comicRec?.slug}`}
              className="comic-popup border-none outline-none w-90/100 h-3/5 rounded-lg bg-frost backdrop-blur  md:w-3/5 lg:w-3/5"
            >
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-7 top-7  p-0 m-0 flex items-center justify-center outline-none">
                  ✕
                </button>
              </form>
              <ComicPopup comicSlug={comicRec?.slug} />
            </dialog>
            {/* This code may be used in a later stage, if not, I will remove it. */}

            {/* <span className="indicator-item badge badge-secondary px-2.5 py-3.5 border-none bg-purple-1000 text-white font-semibold font-sans">
            {topMangaResults.indexOf(mangaRec) + 1}
          </span> */}
            <img
              src={`https://meo3.comick.pictures/${comicRec?.md_covers?.[0]?.b2key}`}
              alt={`${comicType} Cover Image`}
              className="rounded-lg h-full w-full shadow-custom"
            ></img>
            <div className="image-overlay h-full w-full rounded-lg bg-gradient-to-t from-plum absolute flex items-end justify-center text-center p-0 m-0">
              <p className="p-2 font-sans text-white">{comicRec?.title}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
