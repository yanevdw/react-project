import { useQuery } from "@tanstack/react-query";
import { fetchComicContent } from "../services/api";
import { IoPerson } from "react-icons/io5";
import { Link } from "@tanstack/react-router";
import ContentLoader from "./ContentLoader";
import { motion } from "framer-motion";
import { useState } from "react";
import { GiClick } from "react-icons/gi";

function ComicPopup({ comicSlug }: { comicSlug: string }) {
  const [cardFlipped, setCardFlipped] = useState(false);

  function handleCardFlip() {
    setCardFlipped(!cardFlipped);
  }

  const {
    data: comicContentResults,
    error,
    isLoading,
    isPending,
  } = useQuery({
    queryKey: ["fetchComicContent", comicSlug],
    queryFn: () => fetchComicContent(comicSlug),
  });

  if (error) {
    console.error(`An unexpected error occurred: ${error.message}`);
  }

  if (isLoading || isPending) {
    return (
      <div className="popup-container w-full h-full px-3 flex flex-col justify-center items-center">
        <ContentLoader />
      </div>
    );
  }

  if (
    !(
      comicContentResults?.comic ||
      comicContentResults?.comic?.title ||
      comicContentResults?.comic?.desc ||
      comicContentResults?.comic?.follow_count ||
      comicContentResults?.comic?.md_comic_md_genres ||
      comicContentResults?.comic?.hid
    )
  ) {
    return (
      <p className="p-2 font-sans text-white text-center self-center">
        There is no information to display.
      </p>
    );
  }

  const comicGenres = comicContentResults.comic.md_comic_md_genres
    .sort((a, b) => b.md_genres.name.length - a.md_genres.name.length)
    .slice(0, 2);
  return (
    <div className="comic-popup h-full w-full flex items-center justify-center hover:cursor-pointer py-4">
      <div
        className="comic-card w-[900px] h-full rounded-m"
        onClick={handleCardFlip}
      >
        <motion.div
          className="comic-popup-content h-full w-full"
          initial={false}
          animate={{ rotateY: cardFlipped ? 180 : 360 }}
          transition={{ duration: 0.6, animationDirection: "normal" }}
        >
          <div className="comic-popup-front absolute w-full h-full bg-frost backdrop-blur rounded-lg p-3">
            <div className="comic-info-container w-full h-full flex flex-col bg-plum-500 p-4 rounded-lg">
              <div className="comic-quick-facts-container mb-4 w-full h-1/10 flex justify-between items-center gap-4">
                <div className="comic-popup-header flex flex-row justify-start items-center gap-4">
                  <h2 className="font-sans font-semibold text-lg">
                    {comicContentResults.comic.title}
                  </h2>
                  {/* Sometimes the follow count is not null but 0, so I am accommodating this by hiding the follow count in the event that this happens */}
                  {comicContentResults.comic.title.length < 15 ? (
                    comicContentResults.comic.follow_count !== 0 ? (
                      <label className="h-fit bg-plum-300 bg-blur px-4 py-1 rounded-3xl flex gap-2 text-center">
                        <IoPerson className="mt-1" />
                        {comicContentResults.comic.follow_count}
                      </label>
                    ) : null
                  ) : null}
                </div>

                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost p-0 m-0 flex items-center justify-center outline-none">
                    ✕
                  </button>
                </form>
              </div>
              <div className="w-full h-2/5 flex flex-col relative">
                <div className="comic-image-container w-full h-full">
                  <img
                    src={`https://meo3.comick.pictures/${comicContentResults.comic.md_covers[0].b2key}`}
                    alt="Manga Cover Image"
                    className="h-full w-full object-cover object-top rounded-md"
                  />
                </div>
                <div className="image-overlay w-full h-full bg-gradient-to-t from-plum/95 to-gray-900/25 rounded-md flex flex-col justify-end absolute">
                  <div className="comic-genres-container mb-3 pl-2 flex flex-row h-fit justify-start items-start mt-4 gap-2 flex-wrap md:justify-start md:gap-4 lg:justify-start lg:gap-4 overflow-x-clip">
                    {comicGenres.map((genre) => (
                      <label
                        className="bg-purple-power px-3 py-1 rounded-3xl"
                        key={genre.md_genres.slug}
                      >
                        {genre.md_genres.name}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="comic-description-container h-[29.5%] w-full mb-5 md:mb-2 sm:h-1/3">
                <h3 className="text-white font-sans font-semibold font-md mt-2">
                  Description
                </h3>
                <p className="comic-description text-white overflow-y-scroll overflow-x-hidden h-[70%] sm:h-[72.5%] xl:h-[68%]">
                  {comicContentResults.comic.desc}
                </p>
              </div>
              <div className="comic-popup-button-container h-1/10 flex justify-between items-center ">
                <GiClick
                  className="bg-magenta w-fit flex items-end p-2 text-4xl rounded-2xl text-white  "
                  // size={40}
                />
                <Link
                  to={`/comic/${comicContentResults.comic.slug}`}
                  className="bg-blue-munsell h-full rounded-lg px-2 text-white flex items-center font-semibold"
                >
                  Read Comic
                </Link>
              </div>
            </div>
          </div>

          <div className="comic-popup-back absolute flex flex-row justify-end w-full h-full bg-frost backdrop-blur rounded-lg p-3">
            <img
              src={`https://meo3.comick.pictures/${comicContentResults.comic.md_covers[0].b2key}`}
              alt="Manga Cover Image"
              className="h-full w-full object-cover object-top rounded-md"
            />
            <div className="controller-container absolute flex flex-row w-2/5 h-fit gap-4 xl:gap-12 justify-end m-4">
              <GiClick
                className="bg-magenta w-fit flex items-end p-2 text-4xl rounded-2xl text-white"
                // size={40}
              />
              <form method="dialog">
                <button className="btn bg-plum-300 btn-sm btn-circle btn-ghost text-lg leading-8 h-fit  m-0 flex items-center justify-center outline-none text-center md:absolute right-1">
                  ✕
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default ComicPopup;
