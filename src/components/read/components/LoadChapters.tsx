import { useQuery } from "@tanstack/react-query";
import { fetchComicChapters } from "../../../services/api";
import { Chapter } from "../../../models/state";

function LoadChapters({
  comicHid,
  chapterCount,
}: {
  comicHid: string;
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

  const comicChapterDetails: Chapter[] = comicChapters.chapters
    .filter((chapter: Chapter) => chapter.title !== null)
    .slice()
    .reverse();

  return (
    <div className="w-full h-3/5 flex flex-col ">
      {comicChapterDetails.map((chapter: Chapter) => (
        <label className="w-full h-1/10" key={chapter.hid}>
          Chapter {chapter.chap}: {chapter.title}
        </label>
      ))}
    </div>
  );
}
export default LoadChapters;
