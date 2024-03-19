import { useQuery } from "@tanstack/react-query";
import { fetchComicContent } from "../services/api";
import { IoPerson } from "react-icons/io5";

function ComicPopup({ comicSlug }: { comicSlug: string }) {
  const { data: comicContentResults, error } = useQuery({
    queryKey: [`fetchComicContent`],
    queryFn: () => fetchComicContent(comicSlug),
  });

  console.log(comicSlug);
  if (error) {
    console.error("An unexpected error occurred: " + error);
  }

  if (!comicContentResults?.comic) {
    return (
      <p className="p-2 font-sans text-white text-center self-center">
        There is no information to display
      </p>
    );
  }
  const comicGenres = comicContentResults.comic.md_comic_md_genres.slice(0, 4);

  return (
    <div className="popup-container h-full w-full px-3 py-3">
      <div className="popup-content-container flex flex-col h-full  bg-blue-purple px-4 py-4 rounded-md">
        <div className="comic-quick-facts-container mb-2 w-full h-1/10 flex justify-start gap-4">
          <h2 className="font-sans font-semibold text-lg">
            {comicContentResults.comic.title}
          </h2>
          <label className="bg-purple-1000 px-4 py-1 rounded-3xl flex gap-2">
            <IoPerson className="mt-1" />
            {comicContentResults.comic.follow_count}
          </label>
        </div>
        <div className="comic-image-container w-full h-1/2">
          <img
            src={`https://meo3.comick.pictures/${comicContentResults.comic.md_covers[0].b2key}`}
            alt="Manga Cover Image"
            className="h-full w-full object-cover object-top"
          />
        </div>
        <div className="comic-genres-container flex flex-row w-full h-1/5 justify-between mt-4 items-center md:justify-start md:gap-4 lg:justify-start lg:gap-4">
          {comicGenres.map((genre) => (
            <label
              className="bg-purple-1000 px-2 py-1 rounded-3xl"
              key={genre.md_genres.slug}
            >
              {genre.md_genres.name}
            </label>
          ))}
        </div>
        <div className="comic-description-container h-[22%]">
          <h3 className="text-white font-sans font-semibold font-md mt-2">
            Description
          </h3>
          <p className="text-white overflow-y-scroll h-[55%]">
            {comicContentResults.comic.desc}
          </p>
        </div>
        <div className="comic-popup-button-container h-1/10 flex justify-end">
          <button className="bg-purple-1000 p-2 rounded-lg">Read Comic</button>
        </div>
      </div>
    </div>
  );
}

export default ComicPopup;
