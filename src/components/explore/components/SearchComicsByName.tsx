import { useQuery } from "@tanstack/react-query";
import { searchComicByName } from "../../../services/api";
import SearchResults from "./SearchResults";
import ContentLoader from "../../ContentLoader";

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
    console.error(`An unexpected error occurred: ${error.message}`);
  }

  if (isLoading || isPending) {
    return (
      <div className="search-comic-container w-full h-3/10 flex flex-col items-center justify-center">
        <ContentLoader />
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
