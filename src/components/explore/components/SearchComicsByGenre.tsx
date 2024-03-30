import { useQuery } from "@tanstack/react-query";
import { searchComicByGenre } from "../../../services/api";
import { GiSpiderWeb } from "react-icons/gi";
import SearchResults from "./SearchResults";

function SearchComicsByGenre({ genre }: { genre: string }) {
  const formattedGenre = genre.replace(/\s+/g, "-").toLowerCase();

  const {
    data: searchComicByGenreResults,
    error,
    isLoading,
  } = useQuery({
    queryKey: [`searchComicByGenre`, formattedGenre],
    queryFn: () => searchComicByGenre(formattedGenre),
  });

  if (error) {
    console.error("An unexpected error occurred: " + error);
  }

  if (isLoading) {
    return (
      <div
        className={`${genre}-container w-full h-3/10 flex flex-col items-center`}
      >
        <GiSpiderWeb size={70} className="text-white" />
        <h2 className="font-semibold text-white text-xl text-center">
          Building the web
        </h2>
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
