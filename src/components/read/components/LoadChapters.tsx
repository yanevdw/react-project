import { useQuery } from "@tanstack/react-query";
import { fetchComicChapters } from "../../../services/api";
import { Chapter } from "../../../models/common-types";
import { Link } from "@tanstack/react-router";

function LoadChapters({
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

  if (!(comicChapters?.chapters || comicChapters?.total)) {
    return (
      <p className="p-2 font-sans text-white text-center self-center">
        No comic content to display.
      </p>
    );
  }

  const comicChapterDetails: Chapter[] = comicChapters.chapters.filter(
    (chapter: Chapter) => chapter.title !== null
  );

  return (
    <div className="w-full h-3/5 flex flex-col gap-2">
      {comicChapterDetails.map((chapter: Chapter) => (
        <Link
          className="w-full h-1/5 px-2 py-4 rounded-lg bg-purple-grey shadow-md hover:-ml-1"
          key={chapter.hid}
          to={`/comic/${comicSlug}/chapter/${chapter.hid}`}
        >
          Chapter {chapter.chap}: {chapter.title}
        </Link>
      ))}
    </div>
  );
}
export default LoadChapters;
