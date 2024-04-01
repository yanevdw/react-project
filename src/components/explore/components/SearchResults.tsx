import { SearchComic } from "../../../models/search-comic";
import ComicPopup from "../../ComicPopup";

function SearchResults({ results }: { results: SearchComic[] }) {
  if (
    !(
      results?.[0]?.md_covers?.[0]?.b2key ||
      results?.[0]?.slug ||
      results?.[0]?.title ||
      results?.[0]?.desc
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

  const filteredComics: SearchComic[] = results
    .filter(
      (comic: SearchComic) =>
        comic?.content_rating === "safe" && comic?.desc !== ""
    )
    .slice(0, 10);

  return (
    <>
      <h2 className="font-semibold text-white text-lg">Search Results</h2>
      <div className="search-container w-full h-3/5 rounded-lg gap-4 flex flex-col align-center py-4 mb-4 sm:overflow-y-scroll md:h-35/100 lg:h-2/5 md:flex-wrap">
        {filteredComics.map((searchResult: SearchComic) => (
          <div
            key={searchResult?.slug}
            className="w-full h-2/5 p-0 m-0 flex flex-row justify-start items-center relative first:pl-0 hover:cursor-pointer md:w-3/5  bg-purple-grey rounded-lg"
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
              className="comic-popup border-none outline-none h-13/20 rounded-lg bg-transparent xs:w-full sm:w-3/5 py-3 md:w-1/2 lg:w-2/5 xl:w-3/10"
            >
              <ComicPopup comicSlug={searchResult?.slug} />
            </dialog>

            <img
              src={`https://meo3.comick.pictures/${searchResult?.md_covers?.[0]?.b2key}`}
              alt={`Comic Cover Image`}
              className="rounded-lg h-4/5 w-1/4 object-fit ml-2 md:w-1/5 lg:w-1/10"
            ></img>

            <div className="comic-quick-info-container h-full px-2 py-1 w-4/5">
              <p className="p-2 w-full text-wrap font-sans text-white font-semibold">
                {searchResult?.title}
              </p>
              <p className="p-2 w-full text-wrap font-sans text-white">
                {searchResult.desc
                  ? `${searchResult?.desc.substring(0, 50)}...`
                  : null}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default SearchResults;
