import { RankDetails } from "../../../models/top-comics";
import { useQuery } from "@tanstack/react-query";
import { fetchTopComics } from "../../../services/api";
import ComicPopup from "../../ComicPopup";
import ContentLoader from "../../ContentLoader";

function TopComicComponent({ comicType }: { comicType: string }) {
  const {
    data: topComicResults,
    error,
    isLoading,
    isPending,
  } = useQuery({
    queryKey: [`fetchTop${comicType}`],
    queryFn: () => fetchTopComics(comicType.toLowerCase()),
  });

  if (error) {
    console.error(`An unexpected error occurred: ${error.message}`);
  }

  if (isLoading || isPending) {
    return (
      <div
        className={`top-${comicType.toLowerCase()}-container w-full h-3/10 flex flex-col items-center justify-center`}
      >
        <ContentLoader />
      </div>
    );
  }

  if (
    !(
      topComicResults?.rank?.[0]?.md_covers?.[0]?.b2key ||
      topComicResults?.rank?.[0]?.slug ||
      topComicResults?.rank?.[0]?.title
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
  let topComics: RankDetails[] = topComicResults.rank.filter(
    (comic: RankDetails) => comic.md_covers?.[0]?.b2key,
  );
  for (const comic of topComics) {
    for (const comicGenre of comic.genres) {
      if (
        comicGenre === 254 ||
        comicGenre === 287 ||
        comicGenre === 251 ||
        comicGenre === 1 ||
        comicGenre === 320 ||
        comicGenre === 253 ||
        comicGenre === 298 ||
        comicGenre === 3 ||
        comicGenre === 301 ||
        comicGenre === 311 ||
        comicGenre === 313 ||
        comicGenre === 270 ||
        comicGenre === 275 ||
        comicGenre === 276
      ) {
        topComics = topComics.filter(
          (savedComic: RankDetails) => savedComic.title !== comic.title,
        );
      }
    }
  }

  const topTenComics: RankDetails[] = topComics
    .slice(0, 6)
    .concat(topComics.slice(10, 11))
    .concat(topComics.slice(11, 12))
    .concat(topComics.slice(12, 13).concat(topComics.slice(18, 19)));

  return (
    <>
      <div
        className={`top-${comicType.toLowerCase()}-container w-full h-[35%] xl:h-[29%] carousel carousel-center space-x-4 bg-neutral rounded-lg bg-transparent overflow-y-hidden flex align-center py-4 mb-4`}
      >
        {topTenComics.map((comicRec: RankDetails) => (
          <div
            key={comicRec?.slug}
            className="carousel-item w-1/3 h-full p-0 m-0 flex flex-col justify-center relative first:pl-0 hover:cursor-pointer hover:-my-2 md:w-1/5 lg:w-1/6 xl:w-[12%]"
            onClick={() =>
              (
                document.getElementById(
                  `${comicType.toLowerCase()}-comic-popup-${comicRec?.slug}`,
                ) as HTMLDialogElement
              ).showModal()
            }
          >
            <dialog
              id={`${comicType.toLowerCase()}-comic-popup-${comicRec?.slug}`}
              className="comic-popup border-none outline-none h-[73%] sm:h-[71%] xl:h-13/20 rounded-lg bg-transparent xs:w-full sm:w-2/5 py-3 md:w-1/2 lg:w-2/5 xl:w-[26%]"
            >
              <ComicPopup comicSlug={comicRec?.slug} />
            </dialog>
            <img
              src={`https://meo3.comick.pictures/${comicRec?.md_covers?.[0]?.b2key}`}
              alt={`${comicType} Cover Image`}
              className="rounded-lg h-full w-full shadow-md shadow-gray-600 object-fit md:object-fill"
            ></img>
            <div className="image-overlay h-full w-full rounded-lg bg-gradient-to-t from-plum absolute flex items-end justify-center text-center p-0 m-0 md:justify-start">
              <p className="p-2 text-white font-sans font-semibold md:ml-2 md:mb-1.5">
                {comicRec?.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default TopComicComponent;
