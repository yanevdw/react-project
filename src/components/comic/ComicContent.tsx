import { useQuery } from "@tanstack/react-query";
import { fetchComicContent } from "../../services/api";
import ChapterList from "./components/ChapterList";

function ComicContent({ comic }: { comic: string }) {
  const { data: comicData, error } = useQuery({
    queryKey: ["fetchComicContent", comic],
    queryFn: () => fetchComicContent(comic),
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
    <div className="comic-card-container w-full h-full flex flex-col rounded-lg justify-start">
      <div className="comic-image-container h-1/5 w-full rounded-md relative flex shadow-inner shadow-gray-800">
        <img
          src={`https://meo3.comick.pictures/${comicData?.comic?.md_covers?.[0]?.b2key}`}
          alt="Comic Cover Image"
          className="h-full w-full rounded-md object-cover object-top"
        />
        <div className="image-overlay w-full h-full bg-gray-900/50 from-plum absolute rounded-md flex justify-center items-center">
          <h2 className="text-white font-semibold text-3xl uppercase ">
            {comicData?.comic?.title}
          </h2>
        </div>
      </div>
      <h3 className="text-white font-semibold text-md my-4">Chapters</h3>

      <ChapterList
        comicHid={comicData?.comic?.hid}
        comicSlug={comicData?.comic.slug}
        chapterCount={comicData?.comic?.last_chapter}
      />
    </div>
  );
}

export default ComicContent;