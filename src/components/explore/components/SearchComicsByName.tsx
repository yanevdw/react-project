import { useQuery } from "@tanstack/react-query";
import { searchComicByName } from "../../../services/api";
import { GiSpiderWeb } from "react-icons/gi";
import SearchResults from "./SearchResults";

function SearchComicsByName({ comicName }: { comicName: string }) {
  const {
    data: searchComicByNameResults,
    error,
    isLoading,
  } = useQuery({
    queryKey: [`searchComicByName`, comicName],
    queryFn: () => searchComicByName(comicName),
  });

  if (error) {
    console.error("An unexpected error occurred: " + error);
  }

  if (isLoading) {
    return (
      <div className="search-comic-container w-full h-3/10 flex flex-col items-center">
        <GiSpiderWeb size={70} className="text-white" />
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
