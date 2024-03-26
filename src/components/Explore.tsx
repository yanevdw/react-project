import { PiLightningFill, PiSwordFill, PiAlienFill } from "react-icons/pi";
import { FaLaugh } from "react-icons/fa";
import { FaHourglassHalf, FaWandMagicSparkles } from "react-icons/fa6";
import { GiMagnifyingGlass, GiSpiderWeb } from "react-icons/gi";
import { IoSunnySharp } from "react-icons/io5";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { searchComicByGenre, searchComicByName } from "../services/api";
import { useQuery } from "@tanstack/react-query";
import { SearchComicContent } from "../models/state";
import ComicPopup from "./ComicPopup";

function Explore() {
  const [selectedGenre, setSelectedGenre] = useState("");
  const [searchedComicName, setSearchedComicName] = useState("");

  // Validation for input string
  const comicSearchSchema = Yup.object().shape({
    searchString: Yup.string()
      .min(2, "The input is too short.")
      .max(150, "The input is too long.")
      .required("Required."),
  });

  // Some popular genres to search for
  const comicGenres = [
    "Action",
    "Adventure",
    "Comedy",
    "Historical",
    "Magic",
    "Mystery",
    "Sci-Fi",
    "Slice of Life",
  ];

  // Used to set the background of the respective pills associated with each genre.
  const colourCodeGenreLabels = [
    "bg-red-600/20",
    "bg-orange-500/20",
    "bg-yellow-500/20",
    "bg-lime-500/20",
    "bg-cyan-500/20",
    "bg-purple-400/20",
    "bg-green-700/20",
    "bg-pink-500/20",
  ];

  // Icons assoicated with each genre.
  const comicGenreIcons = [
    <PiLightningFill className="text-red-600 text-lg" />,
    <PiSwordFill className="text-orange-500 text-lg" />,
    <FaLaugh className="text-yellow-500 text-lg" />,
    <FaHourglassHalf className="text-lime-500 text-lg" />,
    <FaWandMagicSparkles className="text-cyan-500 text-lg" />,
    <GiMagnifyingGlass className="text-purple-400 text-lg" />,
    <PiAlienFill className="text-green-700 text-lg" />,
    <IoSunnySharp className="text-pink-500 text-lg" />,
  ];

  // Controls what happens when one of the genres are selected.
  function handleGenreClick(genre: string) {
    setSelectedGenre(genre.toLowerCase());
  }

  function handleSearch(comicName: string) {
    setSearchedComicName(comicName);
  }

  return (
    <>
      <Formik
        initialValues={{
          searchString: "",
        }}
        validationSchema={comicSearchSchema}
        onSubmit={(values, { setSubmitting }) => {
          handleSearch(values.searchString);
          setSubmitting(false);
        }}
      >
        {({ errors, touched }) => (
          <Form className="w-full flex flex-row flex-wrap justify-between mb-8">
            <Field
              className="w-4/5 pl-4 py-2 rounded-2xl h-8 outline-none border-none bg-purple-grey"
              name="searchString"
              placeholder="Search for comics"
            />
            <button
              className="bg-blue-munsell text-white px-4 rounded-lg"
              type="submit"
            >
              Go
            </button>
            {errors.searchString && touched.searchString ? (
              <p className="text-white text-sm mt-2 pl-2">
                {errors.searchString}
              </p>
            ) : null}
          </Form>
        )}
      </Formik>
      {searchedComicName && (
        <SearchComicsByNameComponent comicName={searchedComicName} />
      )}
      <h2 className="text-white text-lg font-semibold">Quick filters</h2>
      <h3 className="text-white text-md mt-3 mb-3">Genres</h3>
      <div className="genres-container flex flex-row gap-3 flex-wrap mb-12">
        {comicGenres.map((comicGenre, index) => (
          <label
            key={comicGenre.toLowerCase()}
            className={`text-white text-sm rounded-2xl flex flex-row items-center gap-2 ${colourCodeGenreLabels[index]} px-3 py-2`}
            onClick={() => handleGenreClick(comicGenre)}
          >
            {comicGenreIcons[index]}
            {comicGenre}
          </label>
        ))}
      </div>
      {selectedGenre && <SearchComicsByGenreComponent genre={selectedGenre} />}
    </>
  );
}

export default Explore;

function SearchComicsByNameComponent({ comicName }: { comicName: string }) {
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
function SearchComicsByGenreComponent({ genre }: { genre: string }) {
  const {
    data: searchComicByGenreResults,
    error,
    isLoading,
  } = useQuery({
    queryKey: [`searchComicByGenre`, genre],
    queryFn: () => searchComicByGenre(genre),
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

function SearchResults({ results }: { results: SearchComicContent[] }) {
  const filteredComics: SearchComicContent[] = results
    .filter((comic: SearchComicContent) => comic.content_rating === "safe")
    .slice(0, 10);

  return (
    <>
      <h2 className="font-semibold text-white text-lg">Search Results</h2>
      <div className="search-container w-full h-3/10 carousel carousel-center space-x-4 bg-neutral rounded-lg bg-transparent overflow-y-hidden flex align-center py-4 mb-4">
        {filteredComics?.map((searchResult: SearchComicContent) => (
          <div
            key={searchResult.slug}
            className="carousel-item w-2/6 h-full p-0 m-0 flex flex-col justify-center relative first:pl-0 hover:cursor-pointer md:w-1/10 lg:w-1/10"
            onClick={() =>
              (
                document.getElementById(
                  `search-comic-popup-${searchResult.slug}`
                ) as HTMLDialogElement
              ).showModal()
            }
          >
            <dialog
              id={`$search-comic-popup-${searchResult.slug}`}
              className="comic-popup border-none outline-none w-90/100 h-3/5 rounded-lg bg-frost backdrop-blur  md:w-3/5 lg:w-3/5"
            >
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-7 top-7  p-0 m-0 flex items-center justify-center outline-none">
                  ✕
                </button>
              </form>
              <ComicPopup comicSlug={searchResult.slug} />
            </dialog>

            <img
              src={`https://meo3.comick.pictures/${searchResult.md_covers[0].b2key}`}
              alt={`Comic Cover Image`}
              className="rounded-lg h-full w-full shadow-custom"
            ></img>
            <div className="image-overlay h-full w-full rounded-lg bg-gradient-to-t from-plum absolute flex items-end justify-center text-center p-0 m-0">
              <p className="p-2 font-sans text-white">{searchResult.title}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
