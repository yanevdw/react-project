import { RankDetails } from "../../../models/top-comics";
import { useQuery } from "@tanstack/react-query";
import { fetchTopComics } from "../../../services/api";
import ComicPopup from "../../ComicPopup";
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
    console.error("An unexpected error occurred: " + error);
  }

  if (isLoading || isPending) {
    return (
      <div
        className={`top-${comicType.toLowerCase()}-container w-full h-3/10 flex flex-col items-center justify-center`}
      >
        <div className="loader-container w-full flex flex-row justify-center py-4">
          <span className="loading loading-spinner text-primary"></span>
          <span className="loading loading-spinner text-secondary"></span>
          <span className="loading loading-spinner text-accent"></span>
          <span className="loading loading-spinner text-neutral"></span>
          <span className="loading loading-spinner text-info"></span>
          <span className="loading loading-spinner text-success"></span>
          <span className="loading loading-spinner text-warning"></span>
          <span className="loading loading-spinner text-error"></span>
        </div>
        <h2 className="font-semibold text-white text-xl text-center">
          Building the web
        </h2>
      </div>
    );
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
            className="carousel-item w-30/100 h-full p-0 m-0 flex flex-col justify-center relative first:pl-0 hover:cursor-pointer md:w-1/6 lg:w-1/10"
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
              className="comic-popup border-none outline-none  h-3/5 rounded-lg bg-frost backdrop-blur xs:w-full sm:w-3/5 py-3 md:w-1/2 lg:w-2/5 xl:w-3/10"
            >
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-7 top-7 p-0 m-0 flex items-center justify-center outline-none">
                  ✕
                </button>
              </form>
              <ComicPopup comicSlug={comicRec?.slug} />
            </dialog>
            <img
              src={`https://meo3.comick.pictures/${comicRec?.md_covers?.[0]?.b2key}`}
              alt={`${comicType} Cover Image`}
              className="rounded-lg h-full w-full shadow-md shadow-gray-600"
            ></img>
            <div className="image-overlay h-full w-full rounded-lg bg-gradient-to-t from-plum absolute flex items-end justify-center text-center p-0 m-0">
              <p className="p-2 text-white font-sans font-semibold">
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
