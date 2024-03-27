import { SearchComicContent } from "../../../models/state";
import ComicPopup from "../../ComicPopup";

function SearchResults({ results }: { results: SearchComicContent[] }) {
  if (
    !(
      results?.[0]?.md_covers?.[0]?.b2key ||
      results?.[0]?.slug ||
      results?.[0]?.title
    )
  ) {
    return (
      <div className="w-full h-3/10 text-center">
        <p className="p-2 font-sans text-white">
          There is no comics to display.
        </p>
      </div>
    );
  }

  const filteredComics: SearchComicContent[] = results
    .filter((comic: SearchComicContent) => comic?.content_rating === "safe")
    .slice(0, 10);
  return (
    <>
      <h2 className="font-semibold text-white text-lg">Search Results</h2>
      <div className="search-container w-full h-3/10 carousel carousel-center space-x-4 bg-neutral rounded-lg bg-transparent overflow-y-hidden flex align-center py-4 mb-4">
        {filteredComics.map((searchResult: SearchComicContent) => (
          <div
            key={searchResult?.slug}
            className="carousel-item w-2/6 h-full p-0 m-0 flex flex-col justify-center relative first:pl-0 hover:cursor-pointer md:w-1/10 lg:w-1/10"
            onClick={() =>
              (
                document.getElementById(
                  `search-comic-popup-${searchResult?.slug}`
                ) as HTMLDialogElement
              ).showModal()
            }
          >
            <dialog
              id={`search-comic-popup-${searchResult?.slug}`}
              className="comic-popup border-none outline-none w-90/100 h-3/5 rounded-lg bg-frost backdrop-blur  md:w-3/5 lg:w-3/5"
            >
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-7 top-7  p-0 m-0 flex items-center justify-center outline-none">
                  ✕
                </button>
              </form>
              <ComicPopup comicSlug={searchResult?.slug} />
            </dialog>

            <img
              src={`https://meo3.comick.pictures/${searchResult?.md_covers?.[0]?.b2key}`}
              alt={`Comic Cover Image`}
              className="rounded-lg h-full w-full shadow-custom"
            ></img>
            <div className="image-overlay h-full w-full rounded-lg bg-gradient-to-t from-plum absolute flex items-end justify-center text-center p-0 m-0">
              <p className="p-2 font-sans text-white">{searchResult?.title}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default SearchResults;
