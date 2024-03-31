import { useQuery } from "@tanstack/react-query";
import { searchComicByGenre } from "../../../services/api";
import SearchResults from "./SearchResults";
import ContentLoader from "../../ContentLoader";

function SearchComicsByGenre({ genre }: { genre: string }) {
  const formattedGenre = genre.replace(/\s+/g, "-").toLowerCase();

  const {
    data: searchComicByGenreResults,
    error,
    isLoading,
    isPending,
  } = useQuery({
    queryKey: [`searchComicByGenre`, formattedGenre],
    queryFn: () => searchComicByGenre(formattedGenre),
  });

  if (error) {
    console.error(`An unexpected error occurred: ${error.message}`);
  }

  if (isLoading || isPending) {
    return (
      <div
        className={`${genre}-container w-full h-3/10 flex flex-col items-center justify-center`}
      >
        <ContentLoader />
      </div>
    );
  }

  if (
    !(
      searchComicByGenreResults?.[0]?.md_covers?.[0]?.b2key ||
      searchComicByGenreResults?.[0]?.slug ||
      searchComicByGenreResults?.[0]?.title
    )
  ) {
    return (
      <div className="w-full h-3/10 text-center">
        <p className="p-2 font-sans text-white">
          There is no {genre} comics to display.
        </p>
      </div>
    );
  }

  return <SearchResults results={searchComicByGenreResults} />;
}

export default SearchComicsByGenre;
