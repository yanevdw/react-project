import { useQuery } from "@tanstack/react-query";
import { fetchComicContent } from "../../../services/api";
import LoadChapters from "./LoadChapters";

function ComicCard({ comicSlug }: { comicSlug: string }) {
  const { data: comicData, error } = useQuery({
    queryKey: ["fetchComicContent", comicSlug],
    queryFn: () => fetchComicContent(comicSlug),
  });

  if (error) {
    console.error("An unexpected error occurred: " + error);
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

  return (
    <div className="comic-card-container w-full h-full flex flex-col rounded-lg items-center justify-start">
      <img
        src={`https://meo3.comick.pictures/${comicData?.comic?.md_covers?.[0]?.b2key}`}
        alt="Comic Cover Image"
        className="h-35/100 w-full rounded-md object-cover object-top"
      />
      <h2 className="text-white font-semibold text-lg mt-2">
        {comicData?.comic?.title}
      </h2>

      <LoadChapters
        comicHid={comicData?.comic?.hid}
        chapterCount={comicData?.comic?.last_chapter}
      />
    </div>
  );
}

export default ComicCard;
