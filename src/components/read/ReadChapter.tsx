import { useQuery } from "@tanstack/react-query";
import { fetchChapterContent } from "../../services/api";

function ReadChapter({ chapterId }: { chapterId: string }) {
  const { data: chapterData, error } = useQuery({
    queryKey: ["fetchChapter"],
    queryFn: () => fetchChapterContent(chapterId),
  });

  if (error) {
    console.error("An unexpected error occurred: " + error);
  }

  if (!chapterData) {
    return (
      <p className="p-2 font-sans text-white text-center self-center">
        This chapter does not contain any content.
      </p>
    );
  }

  return (
    <div className="w-full h-full">
      <p>You have reached the reading page.</p>
    </div>
  );
}

export default ReadChapter;
