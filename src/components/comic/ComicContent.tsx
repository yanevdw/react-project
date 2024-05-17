import { useQuery } from "@tanstack/react-query";
import {fetchComicChapters, fetchComicContent} from "../../services/api";
import ChapterList from "./components/ChapterList";
import ContentLoader from "../ContentLoader";
import {FaHeart, FaStar} from "react-icons/fa";
import {Link} from "@tanstack/react-router";

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


       const {
           data: comicChapters
       } = useQuery({
           queryKey: ["fetchComicChapters", comicData?.comic?.hid],
           queryFn: () => fetchComicChapters(comicData?.comic?.hid ?? "", comicData?.comic?.chapter_count ?? 0),
       });




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

  return (
    <div className="comic-card-container w-full h-full flex flex-col rounded-lg justify-start">
      <div className="comic-image-container h-2/5 w-full rounded-md relative flex shadow-inner shadow-gray-800">
        <img
          src={`https://meo3.comick.pictures/${comicData?.comic?.md_covers?.[0]?.b2key}`}
          alt="Comic Cover Image"
          className="h-full w-full object-cover object-top"
        />
          <div
              className="image-overlay w-full h-full bg-gradient-to-t from-plum to-gray-900/50 absolute flex justify-center items-center gap-6">
              <div className="h-[70%] w-1/3 flex items-center justify-center">
                  <img
                      src={`https://meo3.comick.pictures/${comicData?.comic?.md_covers?.[0]?.b2key}`}
                      alt="Comic Cover Image"
                      className="h-full w-full rounded-md object-cover object-top"
                  />
              </div>
              <div className="comic-details-container h-[70%] w-1/2 flex flex-col justify-between items-start">
                  <div className="w-full h-fit">
                      <p className="text-white font-semibold text-2xl w-fit">
                          {comicData?.comic?.title}
                      </p>
                      <p className="text-white text-sm w-fit mt-2">
                          By {comicData?.authors?.[0]?.name}
                      </p>
                      <div
                          className="comic-stats-container h-fit w-full rounded-md pt-2 flex items-center justify-start gap-2 ">
                          <label
                              className="bayesian-rating-container w-fit h-fit py-1 px-2 bg-plum-300 rounded-2xl flex flex-row justify-center shadow-sm shadow-purple-grey items-center gap-2 text-white">
                              <FaStar/>
                              {comicData?.comic?.bayesian_rating}
                          </label>
                          <label
                              className="rating-container w-fit h-fit py-1 px-2 bg-plum-300 rounded-2xl flex flex-row justify-center items-center shadow-sm shadow-purple-grey gap-2 text-white">
                              <FaHeart/>
                              {comicData?.comic?.rating_count}
                          </label>
                      </div>
                  </div>
                  { comicChapters ? ( <Link
                      className="w-full h-fit bg-blue-munsell text-white px-2 py-1 rounded-lg shadow-sm shadow-purple-grey mt-4 font-semibold text-center"
                      key={comicChapters?.chapters[comicChapters?.chapters.length - 1].hid}
                      to={`/comic/${comicData.comic?.slug}/chapter/${comicChapters?.chapters[comicChapters?.chapters.length - 1].hid}`}
                  >
                      Start Reading
                  </Link>) : null}


              </div>
          </div>
      </div>
        <div className="w-full px-6">
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
