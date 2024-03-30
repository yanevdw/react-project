import { useQuery } from "@tanstack/react-query";
import { searchComicByName } from "../../../services/api";
import SearchResults from "./SearchResults";

function SearchComicsByName({ comicName }: { comicName: string }) {
  const formattedComicName = comicName.replace(/\s+/g, "-").toLowerCase();

  const {
    data: searchComicByNameResults,
    error,
    isLoading,
    isPending,
  } = useQuery({
    queryKey: [`searchComicByName`, formattedComicName],
    queryFn: () => searchComicByName(formattedComicName),
  });

  if (error) {
    console.error("An unexpected error occurred: " + error);
  }

  if (isLoading || isPending) {
    return (
      <div className="search-comic-container w-full h-3/10 flex flex-col items-center justify-center">
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
      searchComicByNameResults?.[0]?.md_covers?.[0]?.b2key ||
      searchComicByNameResults?.[0]?.slug ||
      searchComicByNameResults?.[0]?.title
    )
  ) {
    return (
      <div className="w-full h-3/10 text-center">
        <p className="p-2 font-sans text-white">
          There is no comics related to {comicName} to display.
        </p>
      </div>
    );
  }

  return <SearchResults results={searchComicByNameResults} />;
}

export default SearchComicsByName;
