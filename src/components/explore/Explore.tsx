import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";

import {
  comicGenres,
  colourCodeGenreLabels,
  comicGenreIcons,
} from "./ExploreDefaults";
import SearchComicsByName from "./components/SearchComicsByName";
import SearchComicsByGenre from "./components/SearchComicsByGenre";

function Explore() {
  const [selectedGenre, setSelectedGenre] = useState("");
  const [searchedComicName, setSearchedComicName] = useState("");
  const [searchType, setSearchType] = useState("");

  // Validation for input string
  const comicSearchSchema = Yup.object().shape({
    searchString: Yup.string()
      .min(2, "The input is too short.")
      .max(150, "The input is too long.")
      .required("Required."),
  });

  // Controls what happens when one of the genres are selected.
  function handleGenreClick(genre: string) {
    setSelectedGenre(genre.toLowerCase());
    setSearchType("genre");
  }

  function handleSearch(comicName: string) {
    setSearchedComicName(comicName);
    setSearchType("comic");
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
          <Form className="w-full flex flex-row flex-wrap justify-between mb-8 md:justify-end md:gap-4">
            <Field
              className="w-4/5 pl-4 py-2 rounded-2xl h-8 outline-none border-none bg-purple-grey md:w-3/10"
              name="searchString"
              placeholder="Search for comics"
            />
            <button
              className="bg-blue-munsell text-white px-4 rounded-lg font-semibold"
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

      <h2 className="text-white text-lg font-semibold mt-10">Quick filters</h2>
      <h3 className="text-white text-md mt-3 mb-3">Genres</h3>
      <div className="genres-container flex flex-row gap-3 flex-wrap mb-12">
        {comicGenres.map((comicGenre, index) => (
          <label
            key={comicGenre.toLowerCase()}
            className={`text-white text-sm rounded-2xl flex flex-row items-center gap-2 ${colourCodeGenreLabels[index]} px-3 py-2 hover:cursor-pointer`}
            onClick={() => handleGenreClick(comicGenre)}
          >
            {comicGenreIcons[index]}
            {comicGenre}
          </label>
        ))}
      </div>
      <div className="search-results h-[70%] overflow-y-scroll flex flex-row relative">
        {searchType === "comic" ? (
          <div className="absolute w-full h-full">
            <SearchComicsByName comicName={searchedComicName} />
          </div>
        ) : null}
        {searchType === "genre" ? (
          <div className="absolute w-full h-full">
            <SearchComicsByGenre genre={selectedGenre} />
          </div>
        ) : null}
        {/*{selectedGenre ? (*/}
        {/*  <div>*/}
        {/*    */}
        {/*  </div>*/}
        {/*) : null}*/}
        {/*{searchedComicName ? (*/}
        {/* */}
        {/*) : null}*/}
      </div>
    </>
  );
}

export default Explore;
