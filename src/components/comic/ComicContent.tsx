import { useQuery } from "@tanstack/react-query";
import { fetchComicChapters, fetchComicContent } from "../../services/api";
import ChapterList from "./components/ChapterList";
import ContentLoader from "../ContentLoader";
import { FaFlag, FaHeart, FaHome, FaSearch, FaStar } from "react-icons/fa";
import { Link } from "@tanstack/react-router";
import { FaCirclePause, FaCirclePlay, FaCircleStop } from "react-icons/fa6";

function ComicContent({ comic }: { comic: string }) {
  const {
    data: comicData,

    error,
    isLoading,
    isPending,
  } = useQuery({
    queryKey: ["fetchComicContent", comic],
    queryFn: () => fetchComicContent(comic),
  });

  const { data: comicChapters } = useQuery({
    queryKey: ["fetchComicChapters", comicData?.comic?.hid],
    queryFn: () =>
      fetchComicChapters(
        comicData?.comic?.hid ?? "",
        comicData?.comic?.chapter_count ?? 0,
      ),
    enabled: !!comicData,
  });

  if (error) {
    console.error(`An unexpected error occurred: ${error.message}`);
  }

  if (isLoading || isPending) {
    return (
      <div className="comic-card-container w-full h-full">
        <ContentLoader />
      </div>
    );
  }

  if (
    !(
      comicData?.comic ||
      comicData?.comic?.title ||
      comicData?.comic?.hid ||
      comicData?.comic?.md_covers?.[0]?.b2key ||
      comicData?.comic?.last_chapter
    )
  ) {
    return (
      <p className="p-2 font-sans text-white text-center self-center">
        No comic content to display.
      </p>
    );
  }

  function convertStatus(numericalStatus: number) {
    switch (numericalStatus) {
      case 1:
        return (
          <label className="ongoing-status-container text-white flex flex-row gap-2 items-center font-sans text-sm my-2">
            <FaCirclePlay className="text-green-500 text-lg" />
            Ongoing
          </label>
        );
      case 2:
        return (
          <label className="completed-status-container text-white flex flex-row gap-2 items-center font-sans text-sm my-2">
            <FaFlag className="text-green-500 text-lg" />
            Completed
          </label>
        );
      case 3:
        return (
          <label className="cancelled-status-container text-white flex flex-row gap-2 items-center font-sans text-sm my-2">
            <FaCircleStop className="text-red-600-500 text-lg" />
            Cancelled
          </label>
        );
      case 4:
        return (
          <label className="hiatus-status-container text-white flex flex-row gap-2 items-center font-sans text-sm my-2">
            <FaCirclePause className="text-orange-500 text-lg" />
            Hiatus
          </label>
        );
    }
  }

  return (
    <div
      className="comic-card-container w-full h-full flex flex-col rounded-lg justify-start"
      id="comic-card-container"
    >
      <div className="comic-image-container h-2/5 w-full rounded-md relative flex shadow-inner shadow-gray-800">
        <img
          src={`https://meo3.comick.pictures/${comicData?.comic?.md_covers?.[0]?.b2key}`}
          alt="Comic Cover Image"
          className="h-full w-full object-cover object-top"
        />
        <div className="image-overlay w-full h-full bg-gradient-to-t from-plum to-gray-900/50 absolute flex justify-center items-center gap-6 md:justify-start md:pl-6">
          <div className="h-[70%] w-1/3 flex items-center justify-center">
            <img
              src={`https://meo3.comick.pictures/${comicData?.comic?.md_covers?.[0]?.b2key}`}
              alt="Comic Cover Image"
              className="h-full w-full rounded-md object-cover object-top"
            />
          </div>

          <div className="comic-details-container h-[70%] w-1/2 md:w-3/5 xl:w-[62%] flex flex-col justify-between items-start">
            <div className="w-full h-fit">
              <div className="w-full h-fit flex flex-row items-center justify-between">
                <p className="text-white font-semibold text-2xl w-fit md:text-nowrap">
                  {comicData?.comic?.title}
                </p>
                <div className="h-full w-fit hidden flex-row justify-center gap-2 md:flex">
                  <Link
                    to={`/`}
                    className="w-fit g-fit bg-gray-600/85 px-2 py-2 rounded-3xl flex justify-center"
                  >
                    <FaHome className="text-white" />
                  </Link>
                  <Link
                    to={`/explore`}
                    className="w-fit g-fit bg-gray-600/85 px-2 py-2 rounded-3xl flex justify-center"
                  >
                    <FaSearch className="text-white" />
                  </Link>
                </div>
              </div>

              <p className="text-white text-sm w-fit mt-2">
                By {comicData?.authors?.[0]?.name}
              </p>
              {convertStatus(comicData.comic?.status)}
              <div className="comic-stats-container h-fit w-full rounded-md pt-2 flex items-center justify-start gap-4">
                <label className="bayesian-rating-container w-fit h-fit  flex flex-row justify-center items-center font-light gap-2 text-white">
                  <FaStar />
                  {comicData?.comic?.bayesian_rating}
                </label>
                <label className="rating-container w-fit h-fit flex flex-row justify-center items-center font-light gap-2 text-white">
                  <FaHeart />
                  {comicData?.comic?.rating_count}
                </label>
              </div>
            </div>
            {comicChapters ? (
              <Link
                className="w-full md:w-1/3  xl:w-1/4 h-fit bg-blue-munsell text-white px-2 py-1 rounded-lg shadow-sm shadow-purple-grey mt-4 font-semibold text-center"
                key={
                  comicChapters?.chapters[comicChapters?.chapters.length - 1]
                    .hid
                }
                to={`/comic/${comicData.comic?.slug}/chapter/${comicChapters?.chapters[comicChapters?.chapters.length - 1].hid}`}
              >
                Start Reading
              </Link>
            ) : null}
          </div>
        </div>
      </div>
      <div className="w-full px-6" id="chapter-list-container">
        <h3 className="text-white font-semibold text-lg my-4">Chapters</h3>

        <ChapterList
          comicHid={comicData?.comic?.hid}
          comicSlug={comicData?.comic.slug}
          chapterCount={comicData?.comic?.last_chapter}
        />
      </div>
    </div>
  );
}

export default ComicContent;
