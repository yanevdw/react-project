import { SearchComic } from "../../../models/search-comic";
import ComicPopup from "../../ComicPopup";
import { LazyLoadImage } from "react-lazy-load-image-component";

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

  let filteredComics: SearchComic[] = results
    .filter(
      (comic: SearchComic) =>
        comic?.content_rating === "safe" &&
        comic?.desc !== "" &&
        comic?.desc !== null,
    )
    .slice(0, 15);

  // This removes any comics with the specified genre to further hide mature content.
  for (const comic of filteredComics) {
    for (const genre of comic.genres) {
      if (
        genre === 254 ||
        genre === 287 ||
        genre === 251 ||
        genre === 1 ||
        genre === 320 ||
        genre === 253 ||
        genre === 298 ||
        genre === 3 ||
        genre === 301 ||
        genre === 311 ||
        genre === 313 ||
        genre === 270 ||
        genre === 275 ||
        genre === 276
      ) {
        filteredComics = filteredComics.filter(
          (storedComic) => storedComic !== comic,
        );
      }
    }
  }

  return (
    <>
      <h2 className="font-semibold text-white text-lg mb-2">Search Results</h2>
      <div className="search-container w-full h-full rounded-lg gap-4 flex flex-col align-center py-4 mb-4 sm:overflow-y-scroll sm:flex-wrap sm:flex-row">
        {filteredComics.map((searchResult: SearchComic) => (
          <div
            key={searchResult?.slug}
            className="w-full h-1/3 p-0 m-0 flex flex-row justify-start items-center relative first:pl-0 hover:cursor-pointer md:w-[48.5%] md:h-1/4 bg-purple-grey rounded-lg"
            onClick={() =>
              (
                document.getElementById(
                  `search-comic-popup-${searchResult?.slug}`,
                ) as HTMLDialogElement
              ).showModal()
            }
          >
            <dialog
              id={`search-comic-popup-${searchResult?.slug}`}
              className="comic-popup border-none outline-none h-[73%] sm:h-[71%] xl:h-13/20 rounded-lg bg-transparent xs:w-full sm:w-2/5 py-3 md:w-1/2 lg:w-2/5 xl:w-[26%]"
            >
              <ComicPopup comicSlug={searchResult?.slug} />
            </dialog>

            <LazyLoadImage
              src={`https://meo3.comick.pictures/${searchResult?.md_covers?.[0]?.b2key}`}
              alt={`Comic Cover Image`}
              className="rounded-lg h-4/5 w-1/4 object-fit ml-2 md:w-1/5 lg:w-1/10"
            />

            <div className="comic-quick-info-container h-full px-2 py-1 w-4/5">
              <p className="p-2 w-full text-wrap font-sans text-white font-semibold">
                {searchResult.title
                  ? `${searchResult?.title.substring(0, 20)}...`
                  : null}
              </p>
              <p className="p-2 w-full text-wrap font-sans text-white">
                {searchResult.desc
                  ? `${searchResult?.desc.substring(0, 40)}...`
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
