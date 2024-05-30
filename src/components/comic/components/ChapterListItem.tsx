import { fetchChapterContent } from "../../../services/api.ts";
import { useQuery } from "@tanstack/react-query";
import { FaHeart } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { format } from "date-fns";

function ChapterListItem({ chapterHid }: { chapterHid: string }) {
  const {
    data: chapterData,
    error,
    isLoading,
    isPending,
  } = useQuery({
    queryKey: ["fetchChapter", chapterHid],
    queryFn: () => fetchChapterContent(chapterHid),
  });

  if (error) {
    console.error(`An unexpected error occurred: ${error.message}`);
  }

  if (isLoading || isPending) {
    return (
      <div className="skeleton w-full h-[5rem] rounded-lg bg-purple-grey shadow-md"></div>
    );
  }

  if (
    !(
      chapterData?.chapter ||
      chapterData?.chapter?.md_images ||
      chapterData?.chapter.title ||
      chapterData?.chapter.up_count
    )
  ) {
    return (
      <p className="p-2 font-sans text-white text-center self-center">
        This chapter does not contain any content.
      </p>
    );
  }

  function convertDate(date: string) {
    date = format(
      new Date(
        Number(date.substring(0, 4)),
        Number(date.substring(5, 7)) - 1,
        Number(date.substring(8, 10)),
      ),
      "PP",
    );
    return date;
  }

  return (
    <div className="chapter-item-container w-full h-full flex flex-row px-2 py-2 gap-4">
      <div className="chapter-cover-image-container w-1/5 h-[5rem] md:w-[15%] xl:w-[9%] rounded-lg sm:w-1/">
        <LazyLoadImage
          className="w-full h-full object-fit xl:object-cover xl:object-top rounded-lg"
          src={`https://meo3.comick.pictures/${chapterData.chapter.md_images[0].b2key}`}
          alt="Chapter Cover Image"
        />
      </div>
      <div className="chapter-details-container flex flex-col gap-2 justify-start items-left w-2/3">
        <p className="text-white text-lg font-semibold">
          Chapter {chapterData.chapter.chap}
        </p>
        <div className="sub-details-container flex flex-row w-full h-fit gap-5 mt-1">
          <p className="justify-start items-center text-white text-sm gap-1 flex flex-row">
            <FaHeart className="text-red-700 shadow-white text-lg" />
            {chapterData.chapter.up_count} likes
          </p>
          <label className="text-gray-500 text-sm">
            {convertDate(
              chapterData.chapter.created_at.substring(
                0,
                chapterData.chapter.created_at.indexOf("T"),
              ),
            )}
          </label>
        </div>
      </div>
    </div>
  );
}

export default ChapterListItem;
