import { useQuery } from "@tanstack/react-query";
import { fetchComicChapters } from "../../../services/api";
import { Chapter } from "../../../models/common-types";
import { Link } from "@tanstack/react-router";

function ChapterList({
  comicHid,
  comicSlug,
  chapterCount,
}: {
  comicHid: string;
  comicSlug: string;
  chapterCount: number;
}) {
  const { data: comicChapters, error } = useQuery({
    queryKey: ["fetchComicChapters"],
    queryFn: () => fetchComicChapters(comicHid, chapterCount),
  });

  if (error) {
    console.error("An unexpected error occurred: " + error);
  }

  if (!comicChapters?.chapters) {
    return (
      <p className="p-2 font-sans text-white text-center self-center">
        No comic content to display.
      </p>
    );
  }

  // This will be used in the future
  // const comicChapterDetails: Chapter[] = comicChapters.chapters.filter(
  //   (chapter: Chapter) => chapter.title !== null
  // );

  return (
    <div className="w-full h-2/5 flex flex-col gap-2">
      {comicChapters.chapters.map((chapter: Chapter) => (
        <Link
          className="w-full h-1/5 pl-4 py-4 rounded-lg bg-purple-grey shadow-md hover:-ml-1 text-white"
          key={chapter.hid}
          to={`/comic/${comicSlug}/chapter/${chapter.hid}`}
        >
          {chapter.title ? `${chapter.title}` : `Chapter ${chapter.chap}`}
        </Link>
      ))}
    </div>
  );
}
export default ChapterList;
