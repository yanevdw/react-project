import { useQuery } from "@tanstack/react-query";
import { fetchComicChapters} from "../../../services/api";
import { Chapter } from "../../../models/common-types";
import { Link } from "@tanstack/react-router";
import ContentLoader from "../../ContentLoader";
import ChapterListItem from "./ChapterListItem.tsx";
import {useState} from "react";
import Pagination from "./Pagination.tsx";

function ChapterList({
  comicHid,
  comicSlug,
  chapterCount,
}: {
  comicHid: string;
  comicSlug: string;
  chapterCount: number;
}) {

  const [currentPage, setCurrentPage] = useState(1);
  const [chaptersPerPage] = useState(10);

  const {
    data: comicChapters,
    error,
    isLoading,
    isPending,
  } = useQuery({
    queryKey: ["fetchComicChapters", comicHid],
    queryFn: () => fetchComicChapters(comicHid, chapterCount),
  });

  if (isLoading || isPending) {
    return (
      <div className="w-full h-2/5 flex flex-col justify-center items-center">
        <ContentLoader />
      </div>
    );
  }

  if (error) {
    console.error(`An unexpected error occurred: ${error.message}`);
  }

  if (!comicChapters?.chapters) {
    return (
      <p className="p-2 font-sans text-white text-center self-center">
        No comic content to display.
      </p>
    );
  }


  const filteredChapters = comicChapters?.chapters?.filter((chapter: Chapter) => chapter.title === null);

  for (const chapter of filteredChapters) {


    for (const chap of filteredChapters) {

      if (chapter.chap === chap.chap) {

        if (chapter.up_count > chap.up_count) {
          // console.log(chapter, chapter.up_count);
          // console.log(chap, chap.up_count);
          filteredChapters?.splice(filteredChapters?.indexOf(chap),1);
        } else {
          filteredChapters?.splice(filteredChapters?.indexOf(chapter),1);
        }
      }
    }
  }

  const lastChapterIndex = currentPage * chaptersPerPage;
  const firstChapterIndex = lastChapterIndex - chaptersPerPage;

  const currentChapters = filteredChapters.slice(firstChapterIndex, lastChapterIndex);

  return (
    <div className="w-full h-fit pb-3 flex flex-col gap-3 overflow-x-hidden">
      {currentChapters.map((chapter: Chapter) => (
        <Link
          className="w-full h-4/5 rounded-lg bg-purple-grey shadow-md hover:-ml-1 text-white"
          key={chapter.hid}
          to={`/comic/${comicSlug}/chapter/${chapter.hid}`}
        >
          <ChapterListItem chapterHid={chapter.hid} />
        </Link>
      ))}

      <Pagination totalChapters={filteredChapters?.length} chaptersPerPage={chaptersPerPage} setCurrentPage={setCurrentPage} />
    </div>
  );
}
export default ChapterList;
