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
  const {
    data: comicChapters,
    error,
    isLoading,
    isPending,
  } = useQuery({
    queryKey: ["fetchComicChapters"],
    queryFn: () => fetchComicChapters(comicHid, chapterCount),
  });

  if (isLoading || isPending) {
    return (
      <div className="w-full h-2/5">
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
