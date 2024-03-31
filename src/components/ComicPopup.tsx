import { useQuery } from "@tanstack/react-query";
import { fetchComicContent } from "../services/api";
import { IoPerson } from "react-icons/io5";
import { Link } from "@tanstack/react-router";

function ComicPopup({ comicSlug }: { comicSlug: string }) {
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

  const comicGenres = comicContentResults.comic.md_comic_md_genres.slice(0, 3);
  return (
    <div className="popup-container w-full h-full px-3">
      <div className="popup-content-container flex flex-col h-full  bg-plum-500 px-4 py-4 rounded-md">
        <div className="comic-quick-facts-container mb-4 w-full h-1/10 flex justify-start gap-4">
          <h2 className="font-sans font-semibold text-lg">
            {comicContentResults.comic.title}
          </h2>
          {/* Sometimes the follow count is not null but 0, so I am accommodating this by hiding the follow count in the event that this happens */}
          {comicContentResults.comic.follow_count !== 0 ? (
            <label className="bg-plum-300 bg-blur px-4 py-1 rounded-3xl flex gap-2">
              <IoPerson className="mt-1" />
              {comicContentResults.comic.follow_count}
            </label>
          ) : null}
        </div>
        <div className="comic-image-container w-full h-1/2">
          <img
            src={`https://meo3.comick.pictures/${comicContentResults.comic.md_covers[0].b2key}`}
            alt="Manga Cover Image"
            className="h-full w-full object-cover object-top rounded-md"
          />
        </div>
        <div className="comic-genres-container flex flex-row h-2/5 justify-start items-start mt-4 gap-2 flex-wrap md:justify-start md:gap-4 lg:justify-start lg:gap-4 overflow-x-clip">
          {comicGenres.map((genre) => (
            <label
              className="bg-purple-power px-3 py-1 rounded-3xl"
              key={genre.md_genres.slug}
            >
              {genre.md_genres.name}
            </label>
          ))}
        </div>
        <div className="comic-description-container h-11/50">
          <h3 className="text-white font-sans font-semibold font-md mt-2">
            Description
          </h3>
          <p className="text-white overflow-y-scroll h-11/20">
            {comicContentResults.comic.desc}
          </p>
        </div>
        <div className="comic-popup-button-container h-1/10 flex justify-end">
          <Link
            to={`/comic/${comicContentResults.comic.slug}`}
            className="bg-blue-munsell p-2 rounded-lg text-white font-semibold"
          >
            Read Comic
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ComicPopup;
